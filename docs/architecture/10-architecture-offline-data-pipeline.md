# Architektur – Offline-Datenpipeline

## Inhaltsverzeichnis

1. [Ziel dieser Sicht](#ziel-dieser-sicht)
2. [Datenquellen](#datenquellen)
3. [Betriebs- und Orchestrierungsmodell](#betriebs-und-orchestrierungsmodell)
4. [Verarbeitungsschritte](#verarbeitungsschritte)
5. [DAG-Ablauf (vereinfachte Sicht)](#dag-ablauf-vereinfachte-sicht)
6. [Spezifikation (Pipeline-Vertrag)](#spezifikation-pipeline-vertrag)
7. [Security by Design (Pipeline)](#security-by-design-pipeline)
8. [Manifest-Schema (manifest.json)](#manifest-schema-manifest-json)
9. [Container-Parameter & Validierung](#container-parameter-validierung)
10. [Airflow Task-Beispiel (DockerOperator)](#airflow-task-beispiel-dockeroperator)
11. [Anreicherungs-Container (Spezifikation)](#anreicherungs-container-spezifikation)
12. [Pipeline-Diagramm](#pipeline-diagramm)
13. [Warum keine Datenbankzugriffe zur Laufzeit](#warum-keine-datenbankzugriffe-zur-laufzeit)
14. [Ergebnis](#ergebnis)

<a id="ziel-dieser-sicht"></a>
## Ziel dieser Sicht

Dieses Kapitel beschreibt die **Offline-Datenpipeline**, mit der Geodaten und Potenziale
in einen angereicherten 3D Tiles Datensatz überführt werden. Ziel ist es, alle
statischen Informationen **vorab** zu berechnen und in den Tiles zu persistieren,
damit zur Laufzeit keine Datenbankzugriffe für Potenziale nötig sind.

---

<a id="datenquellen"></a>
## Datenquellen

- **Geothermiepotenziale** (Datensatzabfrage in Reihenfolge Grundwasser, Erdreich, Luft; Quelle noch offen)
- **Solarpotenziale** (3D Tiles mit Attributen + Textur)
- **LOD2-Daten** (CityGML, inkl. Adressen)
- **Vegetation (Bäume)** (separater Visualisierungs-Layer)
- **Externer Datendienst** (S3-kompatibler Object Storage) als Austausch- und Ablageort

Hinweis: Solarthermie ist als zusätzliche Sanierungsmaßnahme (Warmwasser-Unterstützung) fachlich gewünscht, aber aktuell nachrangig priorisiert; der MVP-Umfang bleibt in Klärung.

Beispiele für Datenherkünfte und Referenzen:
- Städtische Daten (Stadtpläne/Basiskarten, Orthofotos, Solarpotenzialdaten)
- Open Data (LOD2)
- Behördenspezifische Lizenzen (oberflächennahe Geothermie)
- Externe Quellen für Referenzwerte/Typologien (IWU/TABULA, BKI, co2online, DIN/VDI)

---

<a id="betriebs-und-orchestrierungsmodell"></a>
## Betriebs- und Orchestrierungsmodell

- Die Offline-Datenpipeline (Wandlungspipeline) läuft als **separater Docker-Container**.
- Die **Orchestrierung erfolgt in CIVITAS/CORE über Airflow** (DAG-basiert).
- Ein **externer Datendienst** (z.B. S3) dient als Quelle und Ziel für Rohdaten und erzeugte 3D Tiles.
- Die **Konvertierung** (CityGML → CityJSON → 3D Tiles) und die **Anreicherung der Metadaten**
  (Solarpotenziale (PV) und Geothermiepotenziale) sind **getrennte Verarbeitungsschritte** und laufen in **separaten Containern**.
- Der Schritt **CityGML → CityJSON → 3D Tiles** wird als eigenständiges, CIVITAS/CORE-fähiges Add-on betrieben.
- Add-ons unterstützen die konfigurationsbasierte Aktivierung/Deaktivierung einzelner Teilkomponenten, sofern fachlich sinnvoll entkoppelbar.
Hinweis: Der **externe Datendienst** entspricht dem in den Architekturdiagrammen referenzierten **3D Tiles Storage**.

---

<a id="verarbeitungsschritte"></a>
## Verarbeitungsschritte

1. **CityGML → CityJSON**  
   Umwandlung der CityGML-Quellen mit `citygml-tools`  
   <https://github.com/citygml4j/citygml-tools>

2. **CityJSON → 3D Tiles**  
   Konvertierung der CityJSON-Daten mit `cityjson-to-3d-tiles`  
   <https://github.com/csi-FOXBYTE/cityjson-to-3d-tiles>

3. **Anreicherung der Metadaten (separater Schritt)**  
   Solarpotenziale liegen als 3D Tiles mit Attributen und Textur vor und werden
   in einem separaten Verarbeitungsschritt mit den konvertierten Tiles zusammengeführt.
   Geothermiepotenziale werden (sobald verfügbar) über eine priorisierte Datensatzabfrage ergänzt:
   Grundwasser → Erdreich → Luft.
   Optional werden abgeleitete Kennwerte (z.B. Hüllfläche, Dachfläche, Volumen) ergänzt.
   Dadurch werden Laufzeit-DB-Zugriffe minimiert.

4. **Optionale visuelle Ableitungen**  
   Weitere visuelle Attribute oder Aggregationen können in diesem Schritt verknüpft oder generiert werden, z.B.:
   - Solarpotenzial-Textur (aus der Lieferung) als Dachflächen-Overlay
   - Geothermiepotenzial als Gebäude-Overlay (Skala/Klassifizierung)
   - Energieeffizienzklasse als Label oder Icon am Gebäude

5. **Bereitstellung**  
   Der fertig angereicherte Datensatz wird im 3D Tiles Storage bereitgestellt
   und über APISIX ausgeliefert:
   - entweder direkt aus dem externen Datendienst
   - oder über ein optionales Tiles Gateway.

---

<a id="dag-ablauf-vereinfachte-sicht"></a>
## DAG-Ablauf (vereinfachte Sicht)

1. **Download** der Rohdaten aus dem externen Datendienst (z.B. S3) in ein Staging-Verzeichnis.
2. **Konvertierung im Container** (CityGML → CityJSON → 3D Tiles).
3. **Anreicherung im separaten Container** (Solar-/Geothermiepotenziale + optionale Kennwerte).
4. **Upload** der erzeugten 3D Tiles und Metadaten in den externen Datendienst.

---

<a id="spezifikation-pipeline-vertrag"></a>
## Spezifikation (Pipeline-Vertrag)

### Trigger & Orchestrierung

- Start erfolgt **manuell über die Airflow-Oberfläche**.
- Die `job_id` wird von Airflow vorgegeben und **als deterministischer Ordnername** genutzt.
- Pro `job_id` wird exakt **ein Pipeline-Lauf** erzeugt; Wiederholung erfolgt über neue `job_id`.

### Airflow DAG (konkret)

- DAG-ID: `dez_offline_pipeline`.

Task-Reihenfolge je `job_id`:
1. `init_job` – erstellt `manifest.json`, Status `running`.
2. `download_inputs` – lädt `jobs/{job_id}/input/` in ein Staging-Verzeichnis.
3. `convert_tiles` – Konvertierungs-Container (CityGML → CityJSON → 3D Tiles).
4. `upload_converted` – lädt `jobs/{job_id}/convert/` in den Datendienst.
5. `enrich_tiles` – Anreicherungs-Container (Solar/Geothermie + optionale Kennwerte).
6. `upload_enriched` – lädt `jobs/{job_id}/enriched/` in den Datendienst.
7. `finalize_job` – aktualisiert `manifest.json` (Status, Zeiten, Exit-Code).

### Storage-Layout (S3-kompatibel)

- `jobs/{job_id}/input/`  
  Eingabedaten (CityGML-Dateien, Solarpotenzial-3D Tiles, Vegetationsdaten; Struktur beliebig).
- `jobs/{job_id}/convert/`  
  Ausgabe der Konvertierung (3D Tiles ohne Metadaten-Anreicherung).
- `jobs/{job_id}/enriched/`  
  Ausgabe nach Anreicherung (3D Tiles mit Metadaten).
- `jobs/{job_id}/logs/`  
  Laufzeit-Logs (inkl. Fortschritt).
- `jobs/{job_id}/manifest.json`  
  Metadaten zum Lauf (Status, Zeitstempel, Eingabeparameter).

Hinweis: Es gibt **keine Versionierung** im Datendienst; alte Daten müssen manuell entfernt werden.
Sicherheitsprinzip: Zugriff auf den Datendienst erfolgt ausschließlich über Secrets-Management; keine Tokens im Code oder in Logs.

### Eingaben

- Ein Ordner mit **CityGML-Dateien** (LOD2, inkl. Adressen; Dateistruktur innerhalb des Ordners ist beliebig).
- Solarpotenzial-**3D Tiles** (Attribute + Textur) als zusätzliche Eingabe.
- Vegetationsdaten (Bäume) als eigener Layer (3D Tiles oder vergleichbares Format).
- **EPSG-Code** muss explizit übergeben werden (Coordinate Reference System kann nicht zuverlässig ausgelesen werden).
- `appearance` (String) wählt **genau eine** Texture/Theme aus der CityGML-Quelle.
- `hasAlphaChannel` (Boolean) gibt an, ob die Texture-Daten einen **Alpha-Kanal** enthalten.
Hinweis: Für die Verarbeitung wird ein **Job-Ordner gemountet**; der Container arbeitet ausschließlich in diesem Ordner bis Abschluss.

### Ausgaben

- **3D Tiles** werden als Ordner ausgegeben und in den dedizierten Bucket hochgeladen.
- Zwischenstand nach Konvertierung liegt getrennt von der angereicherten Ausgabe.
Hinweis: Der Ziel-Bucket ist der dedizierte **3D Tiles Storage** im externen Datendienst.

### Exit-Codes

- `0` Erfolgreich abgeschlossen
- `10` Eingabefehler (z.B. keine CityGML-Dateien, fehlender EPSG-Code)
- `20` Fehler in der Konvertierung (CityGML → CityJSON → 3D Tiles)
- `30` Fehler in der Anreicherung
- `50` Infrastrukturfehler (S3/Netzwerk/Filesystem)

### Fortschritt & Logging

- Logs werden **ausschließlich** über `stdout`/`stderr` ausgegeben und zusätzlich unter `jobs/{job_id}/logs/` persistiert.
- Logs dürfen **keine Zugangsdaten** oder Secrets enthalten.
- Fortschritt wird als JSON-Lines geloggt, z.B.:

```json
{"event":"progress","stage":"convert","percent":35,"message":"Converted 120/340 files"}
```

- Stufen (mindestens): `download`, `convert`, `enrich`, `upload`.

### Fehlerbehandlung & Wiederanlauf

- Ein Retry ist zulässig (Airflow).
- Bei Teilfehlern wird der gesamte Lauf **neu gestartet**.
- Als gültig gelten ausschließlich vollständig erfolgreich abgeschlossene Läufe.

---

<a id="security-by-design-pipeline"></a>
## Security by Design (Pipeline)

- Zugriff auf den Datendienst ausschließlich via Secrets-Management.
- Keine Credentials in Code, Konfiguration oder Logs.
- Logs enthalten nur technische Fehler- und Fortschrittsinformationen.
- Job-Ordner ist der einzige Schreibbereich der Container.
- Empfehlung: Verschlüsselung **at rest** im Datendienst (z.B. serverseitige Verschlüsselung des Buckets) zur Erhöhung der Sicherheit.

---

<a id="manifest-schema-manifest-json"></a>
## Manifest-Schema (manifest.json)

Pflichtfelder: `job_id`, `status`, `stage`, `epsg`, `appearance`, `hasAlphaChannel`, `created_at`, `output_prefix`.
Statuswerte: `pending`, `running`, `failed`, `succeeded`.
Stage-Werte: `download`, `convert`, `enrich`, `upload`.

```json
{
  "job_id": "dez-2026-02-04-001",
  "status": "running",
  "stage": "convert",
  "epsg": "EPSG:25832",
  "appearance": "main-texture",
  "hasAlphaChannel": true,
  "input_file_count": 340,
  "created_at": "2026-02-04T12:00:00Z",
  "started_at": "2026-02-04T12:05:00Z",
  "completed_at": null,
  "output_prefix": "jobs/dez-2026-02-04-001/",
  "exit_code": null,
  "error": null
}
```

Hinweis: `error` ist nur bei `status = failed` gefüllt und enthält einen technischen Fehlertext.

---

<a id="container-parameter-validierung"></a>
## Container-Parameter & Validierung

### Parameter-Mapping (Environment)

- `JOB_ID` (String) – von Airflow vorgegeben.
- `JOB_DIR` (Pfad) – gemounteter Job-Ordner (z.B. `/job`).
- `EPSG` (String) – z.B. `EPSG:25832`.
- `APPEARANCE` (String) – gewünschtes Theme/Texture-Set in CityGML.
- `HAS_ALPHA_CHANNEL` (Boolean, `true|false`).
Hinweis: Airflow-Parameter `hasAlphaChannel` wird auf `HAS_ALPHA_CHANNEL` gemappt.
Sicherheitsprinzip: Secrets (z.B. S3-Credentials) werden ausschließlich über Secrets-Management bereitgestellt.

### Validierungsregeln

- `JOB_DIR` muss existieren und beschreibbar sein.
- `EPSG` darf nicht leer sein und muss dem Format `EPSG:<code>` entsprechen.
- `APPEARANCE` darf nicht leer sein und muss in den CityGML-Quellen vorhanden sein.
- `HAS_ALPHA_CHANNEL` muss explizit `true` oder `false` sein.

---

<a id="airflow-task-beispiel-dockeroperator"></a>
## Airflow Task-Beispiel (DockerOperator)

```python
DockerOperator(
    task_id="convert_tiles",
    image="dez/tiles-converter:latest",
    api_version="auto",
    auto_remove=True,
    environment={
        "JOB_ID": "{{ dag_run.conf['job_id'] }}",
        "JOB_DIR": "/job",
        "EPSG": "{{ dag_run.conf['epsg'] }}",
        "APPEARANCE": "{{ dag_run.conf['appearance'] }}",
        "HAS_ALPHA_CHANNEL": "{{ dag_run.conf['hasAlphaChannel'] }}"
    },
    mounts=[
        Mount(
            source="/mnt/jobs/{{ dag_run.conf['job_id'] }}",
            target="/job",
            type="bind"
        )
    ]
)
```

Hinweis: `job_id`, `epsg`, `appearance` und `hasAlphaChannel` werden als DAG-Run-Parameter übergeben.

---

<a id="anreicherungs-container-spezifikation"></a>
## Anreicherungs-Container (Spezifikation)

### Zweck

- Ergänzung von 3D Tiles um Solarpotenziale (PV) und Geothermiepotenziale.
- Optionale Berechnung abgeleiteter Kennwerte (z.B. Hüllfläche, Dachfläche, Volumen).

### Erwartete Eingaben

- Pfad zu konvertierten 3D Tiles (`jobs/{job_id}/convert/`).
- Geothermiepotenziale über Datensatzabfrage (Priorität: Grundwasser, Erdreich, Luft; EPSG wird für die Abfrage verwendet, Quelle noch offen).
- Solarpotenzial-3D Tiles (Attribute + Textur) als Eingabe für das Attribut-Mapping.
- Konfigurationsparameter für Mapping und Einheiten (siehe Schema).

### Erwartete Ausgaben

- Angereicherte 3D Tiles (`jobs/{job_id}/enriched/`).
- Laufprotokolle und Fortschrittslogs (`jobs/{job_id}/logs/`).

### Mapping-Regeln

- **Gebäudezuordnung** erfolgt über `gml:id` der CityGML-Gebäudeobjekte.
- **Solarpotenziale** werden aus den gelieferten Attributen in 3D Tiles übernommen; eine Aufsummierung je Gebäude ist optional.
- **Geothermiepotenziale** werden über die Gebäudegrundfläche aus dem Datensatz gemittelt; die Abfrage folgt der Reihenfolge Grundwasser → Erdreich → Luft. Falls keine Abdeckung vorliegt, wird der Wert als `null` gesetzt.
- **Adresse** wird aus den CityGML-Adressobjekten übernommen; wenn nur ein Freitext vorhanden ist, wird dieser als `address_full` gesetzt. Die Ausgabe der Adresse aus LOD2 ist zwingend sicherzustellen (Fehler im bisherigen Wandler beheben).
- **Nebengebäude** werden nicht mit Hauptgebäuden zusammengeführt; jedes CityGML-Gebäude wird separat verarbeitet.

### Metadaten-Schema (Tiles-Attribute)

- `address_full` (String)
- `street` (String, optional)
- `house_number` (String, optional)
- `postal_code` (String, optional)
- `city` (String, optional)
- `roof_area_m2` (Number)
- `solar_potential_kwh_a` (Number)
- `solar_yield_kwh_m2a` (Number)
- `geothermal_potential_w_m2` (Number)

Zusätzliche Rohattribute aus den Solarpotenzial-3D Tiles (unverändert übernommen):
- `solarArea` (Number)
- `Fläche` (String)
- `Dachneigung` (String)
- `Dachorientierung` (String)
- `SVF_min` (Number)
- `SVF_avg` (Number)
- `SVF_med` (Number)
- `SVF_max` (Number)
- `Z_MIN` (String)
- `Z_MAX` (String)
- `Z_MIN_ASL` (String)
- `Z_MAX_ASL` (String)
- `creationDate` (String, ISO-Datum)
- `globalRadMonths_1..12` (Number)
- `directRadMonths_1..12` (Number)
- `diffuseRadMonths_1..12` (Number)

Hinweis: Einheiten und Skalierungen stammen aus der Datenlieferung; es erfolgt keine automatische Normalisierung.

Hinweis MVP: Da derzeit noch kein belastbarer Geothermie-Datensatz vorliegt, bleiben Bewertungslogik und konkrete Ausgabefelder für die MVP-Phase in diesem Punkt offen.

### Validierungsregeln

- `address_full` muss gesetzt sein.
- Potenzialwerte müssen numerisch sein; fehlende Werte werden als `null` gespeichert.
- Einheiten sind fix: `m2`, `kWh/a`, `kWh/m2a`, `W/m2`.

---

---

<a id="pipeline-diagramm"></a>
## Pipeline-Diagramm

Das Diagramm zeigt die Verarbeitungsschritte; Orchestrierung und Datenaustausch über Airflow sind im Abschnitt oben beschrieben.
Hinweis: Die Solarpotenziale sind aktuell bereits als 3D Tiles verfügbar und werden in der Anreicherung übernommen.

![offline-data-pipeline.png](./attachments/offline-data-pipeline.png)

Quelle: `raw/offline-data-pipeline.puml`

---

<a id="warum-keine-datenbankzugriffe-zur-laufzeit"></a>
## Warum keine Datenbankzugriffe zur Laufzeit

- **Performance**: Potenziale sind direkt in den Tiles; keine zusätzlichen Roundtrips pro Gebäude.
- **Skalierung**: Statische Assets lassen sich effizient über CDN/Cache ausliefern.
- **Stabilität**: Das Laufzeitsystem ist weniger abhängig von Datenbanklast und -verfügbarkeit.
- **Kosten**: Geringere DB-Last reduziert Betriebs- und Infrastrukturkosten.

---

<a id="ergebnis"></a>
## Ergebnis

- Statische Potenziale sind direkt in den 3D Tiles eingebettet.
- Laufzeitlogik bleibt schlank; Datenbankzugriffe beschränken sich auf dynamische Inhalte.
