# Technische Anforderungen - Digitaler Energie Zwilling (DEZ)

## Inhaltsverzeichnis

1. [Ziel der technischen Anforderungen](#ziel-der-technischen-anforderungen)
2. [1. Architektur & Grundprinzipien](#1-architektur-grundprinzipien)
3. [2. Frontend & Auslieferung](#2-frontend-auslieferung)
4. [3. 3D-Visualisierung & Tiles](#3-3d-visualisierung-tiles)
5. [4. Datenpipeline (Offline)](#4-datenpipeline-offline)
6. [5. Berechnungskern](#5-berechnungskern)
7. [6. Datenschutz & Privacy-by-Design](#6-datenschutz-privacy-by-design)
8. [7. Konfigurationsmanagement](#7-konfigurationsmanagement)
9. [8. Backend & API](#8-backend-api)
10. [9. Persistenz & Datenhaltung](#9-persistenz-datenhaltung)
11. [10. Betrieb & Qualität](#10-betrieb-qualitaet)
12. [11. Konfigurations-Publishing](#11-konfigurations-publishing)
13. [12. Öffentliche Übermittlung & Verifikation](#12-oeffentliche-uebermittlung-verifikation)
14. [13. Offline-Pipeline-Betrieb (Airflow)](#13-offline-pipeline-betrieb-airflow)
15. [14. Sicherheit (Security by Design)](#14-sicherheit-security-by-design)
16. [15. Datenschutz, Consent & Tracking](#15-datenschutz-consent-tracking)
17. [16. Observability & Logging](#16-observability-logging)
18. [17. Sicherheit & SDLC](#17-sicherheit-sdlc)
19. [18. Integration (CIVITAS/CORE)](#18-integration-civitas-core)
20. [19. Performance & Skalierung](#19-performance-skalierung)
21. [20. Rechenmethoden & Nachweise](#20-rechenmethoden-nachweise)
22. [21. Datenlöschung & Sitzungen](#21-datenloeschung-sitzungen)
23. [22. Admin-Triage & Audit](#22-admin-triage-audit)
24. [23. Eingabetiefe & Live-Berechnung](#23-eingabetiefe-live-berechnung)
25. [24. Open Source & Förderkulisse](#24-open-source-foerderkulisse)
26. [25. BSI Grundschutz Bezug](#25-bsi-grundschutz-bezug)
27. [26. Offene MVP-Klärung: Solarthermie, PV und Geothermie](#26-offene-mvp-klaerung-solarthermie-pv-und-geothermie)
28. [27. CIVITAS/CORE-Integration (Präzisierungen)](#27-civitas-core-integration-praezisierungen)
29. [28. API-Client-Generierung](#28-api-client-generierung)
30. [29. Aktualisierung der Basisdaten](#29-aktualisierung-der-basisdaten)
31. [30. Nachnutzung und White-Labeling](#30-nachnutzung-und-white-labeling)
32. [31. Festlegung: Nutzungsdaten und Tracking](#31-festlegung-nutzungsdaten-und-tracking)
33. [32. Single Point of Truth für Basisdaten](#32-single-point-of-truth-fuer-basisdaten)
34. [33. Datenquellen-Metadaten](#33-datenquellen-metadaten)
35. [34. Abnahmeprozess und Ansprechpartner](#34-abnahmeprozess-und-ansprechpartner)
36. [Abgrenzung](#abgrenzung)

<a id="ziel-der-technischen-anforderungen"></a>

## Ziel der technischen Anforderungen

Dieses Dokument beschreibt die **technischen Anforderungen** an den Digitaler Energie Zwilling (DEZ).  
Es legt verbindlich fest, **welche technischen Eigenschaften, Randbedingungen und Qualitätsmerkmale** das System erfüllen muss, um die fachlichen Anforderungen korrekt, sicher und wartbar umzusetzen.

Die technischen Anforderungen dienen als:

- Grundlage für Architektur- und Technologieentscheidungen
- Referenz für Implementierung und Reviews
- Basis für Abnahme und Qualitätssicherung

Verbindlichkeit: **MUSS** = verpflichtend, **SOLL** = wünschenswert/nice-to-have, **KANN** = optional.

---

<a id="1-architektur-grundprinzipien"></a>

## 1. Architektur & Grundprinzipien

**TA-01**  
Das System muss als webbasierte Anwendung ohne lokale Installation nutzbar sein.

**TA-02**  
Das System muss eine klare technische Trennung zwischen öffentlichem Bürgerbereich für Bürger (Eigentümer/Vermieter) und administrativem Bereich für Stadtverwaltung / Fachpersonal umsetzen.

**TA-03**  
Öffentliche Funktionen müssen ohne Authentifizierung nutzbar sein.

**TA-04**  
Administrative Funktionen müssen serverseitig geschützt und nur nach erfolgreicher Authentifizierung erreichbar sein.

---

<a id="2-frontend-auslieferung"></a>

## 2. Frontend & Auslieferung

**TA-05**  
Das Frontend muss vollständig als statische Webanwendung erzeugt werden.

**TA-06**  
Zur Erzeugung des statischen Frontends muss ein Static-Site-Generator eingesetzt werden.

**TA-07**  
Zur Laufzeit darf keine serverseitige Renderlogik erforderlich sein.

**TA-08**  
Das Frontend muss mindestens zwei klar getrennte UI-Bereiche bereitstellen:

- einen öffentlichen Bürger-Client
- einen administrativen Bereich für Stadtverwaltung / Fachpersonal

**TA-09**  
Der HTML-Code des administrativen Bereichs darf erst nach erfolgreicher Authentifizierung ausgeliefert werden.

---

<a id="3-3d-visualisierung-tiles"></a>

## 3. 3D-Visualisierung & Tiles

**TA-10**  
Die 3D-Visualisierung muss auf dem Standard 3D Tiles basieren.

**TA-11**  
3D Tiles müssen vollständig offline vorverarbeitet werden.

**TA-12**  
Solarpotenziale (PV) und Geothermiepotenziale müssen als statische Attribute direkt in den 3D Tiles abgelegt sein.

**TA-13**  
Zur Laufzeit dürfen keine Solar- oder Geothermiepotenziale berechnet werden.

> ⚠️ **Hinweis:** Solarthermie ist als zusätzliche Sanierungsmaßnahme vorgesehen, der finale technische Umfang für die MVP-Phase ist jedoch noch in Klärung.

**TA-14**  
3D Tiles dürfen nicht vom Backend ausgeliefert werden.

**TA-15**  
3D Tiles müssen über APISIX bereitgestellt werden, entweder per direktem HTTPS-Zugriff auf den externen Datendienst (S3-kompatibel) oder über ein dediziertes Tiles Gateway.

---

<a id="4-datenpipeline-offline"></a>

## 4. Datenpipeline (Offline)

**TA-16**  
Das System muss eine eigenständige Offline-Datenpipeline zur Verarbeitung von Geodaten unterstützen.

**TA-17**  
Die Datenpipeline muss folgende Schritte abbilden können:

- Konvertierung von CityGML zu CityJSON
- Verarbeitung von Solar- und Geothermiedaten
- Anreicherung der Gebäudedaten mit Potenzialattributen
- Erzeugung von 3D Tiles

**TA-18**  
Die Datenpipeline muss unabhängig vom Laufzeitsystem betreibbar sein.

---

<a id="5-berechnungskern"></a>

## 5. Berechnungskern

**TA-19**  
Der Berechnungskern muss als eigenständiges JavaScript-Modul implementiert sein.

**TA-20**  
Der Berechnungskern muss sowohl im Browser als auch in einer Node.js-Umgebung lauffähig sein.

**TA-21**  
Die Berechnung muss vollständig clientseitig ausführbar sein.

**TA-22**  
Für die Durchführung einer Berechnung dürfen keine Nutzereingaben zwingend an den Server übertragen werden.

**TA-23**  
Eine serverseitige Ausführung der Berechnung darf optional für administrative oder technische Zwecke möglich sein.

---

<a id="6-datenschutz-privacy-by-design"></a>

## 6. Datenschutz & Privacy-by-Design

**TA-24**  
Das System muss eine datenschutzfreundliche Nutzung ohne Übertragung personenbezogener Nutzereingaben ermöglichen.

**TA-25**  
Die Speicherung von Nutzereingaben muss optional und explizit durch den Nutzer ausgelöst werden.

**TA-26**  
Berechnung und Datenspeicherung müssen technisch voneinander entkoppelt sein.

---

<a id="7-konfigurationsmanagement"></a>

## 7. Konfigurationsmanagement

**TA-27**  
Berechnungsparameter müssen ohne Codeänderung anpassbar sein.

**TA-28**  
Berechnungskonfigurationen müssen versionierbar sein.

**TA-29**  
Jede Konfiguration muss eindeutig einer Version oder einem zeitlichen Gültigkeitsbereich zugeordnet sein.

**TA-30**  
Für den öffentlichen Bürger-Client muss eine veröffentlichte, versionierte Konfigurationsdatei bereitgestellt werden.

**TA-31**  
Berechnungsergebnisse müssen anhand der verwendeten Konfigurationsversion reproduzierbar sein.

---

<a id="8-backend-api"></a>

## 8. Backend & API

**TA-32**  
Das Backend muss Schnittstellen zur Verwaltung von Berechnungskonfigurationen bereitstellen.

**TA-33**  
Das Backend muss Schnittstellen zur optionalen Speicherung und Wiederherstellung von Nutzereingaben bereitstellen.

**TA-34**  
Das Backend muss administrative Funktionen zur Sichtung und Triage von Nutzereingaben unterstützen.

**TA-35**  
Öffentliche und administrative API-Endpunkte müssen technisch getrennt und unterschiedlich abgesichert sein.

---

<a id="9-persistenz-datenhaltung"></a>

## 9. Persistenz & Datenhaltung

**TA-36**  
Nutzereingaben müssen persistent in einer relationalen Datenbank gespeichert werden.

**TA-37**  
Die Datenbank muss räumliche Erweiterungen für Geoabfragen unterstützen.

**TA-38**  
Statische Potenzialdaten dürfen nicht in der Datenbank gespeichert werden.

**TA-39**  
Konfigurationsdaten müssen in der Datenbank als zentrale Quelle gepflegt werden.

---

<a id="10-betrieb-qualitaet"></a>

## 10. Betrieb & Qualität

**TA-40**  
Das System muss für eine spike-basierte Nutzung mit mehreren tausend parallelen Nutzern ausgelegt sein.

**TA-41**  
Das System muss Mechanismen zur Beobachtbarkeit wie Logging, Metriken und Tracing unterstützen.

**TA-42**  
Das System muss containerisierbar sein und in einer orchestrierten Umgebung betrieben werden können.

---

<a id="11-konfigurations-publishing"></a>

## 11. Konfigurations-Publishing

**TA-43**  
Konfigurationen müssen in der Datenbank als **Source of Truth** gepflegt und versioniert werden.

**TA-44**  
Für jede veröffentlichte Konfiguration muss ein JSON-Snapshot erzeugt und als Datei exportiert werden.

**TA-45**  
Der Berechnungskern muss die veröffentlichte JSON-Konfiguration lesen können, ohne direkten Datenbankzugriff.

**TA-46**  
Veröffentlichte Konfigurationen müssen unveränderlich sein; Änderungen erfordern eine neue Version.

---

<a id="12-oeffentliche-uebermittlung-verifikation"></a>

## 12. Öffentliche Übermittlung & Verifikation

**TA-47**  
Der öffentliche Bürger-Client muss Berechnungsergebnisse **inklusive Eingaben** an das Backend übermitteln können.

**TA-48**  
Das Backend muss Eingaben gegen **konfigurierbare Wertebereiche** validieren (z.B. min/max).

**TA-49**  
Das Backend muss Ergebnisse serverseitig mit dem gleichen Berechnungskern neu berechnen.

**TA-50**  
Nur verifizierte und triagierte Ergebnisse dürfen für die Gebäude-Indexierung und interne Freigaben verwendet werden.

**TA-51**  
Öffentliche Schreibzugriffe müssen durch Altcha-Challenges und Rate Limiting geschützt werden.
Altcha ist eine selbsthostbare, datenschutzfreundliche Challenge; der Backend-Service prüft das übermittelte Token.

---

<a id="13-offline-pipeline-betrieb-airflow"></a>

## 13. Offline-Pipeline-Betrieb (Airflow)

**TA-52**  
Die Offline-Datenpipeline muss in CIVITAS/CORE über Airflow orchestriert werden; DAG-Läufe werden ausschließlich manuell über die Airflow-Oberfläche gestartet.

**TA-53**  
Die Konvertierung (CityGML → CityJSON → 3D Tiles) und die Attributanreicherung (Solar/Geothermie) müssen als getrennte Verarbeitungsschritte in separaten Containern ausgeführt werden.

**TA-54**  
Jeder Pipeline-Lauf muss eine von Airflow vorgegebene `job_id` verwenden und alle Artefakte unter einem dedizierten Job-Ordner im S3-kompatiblen Datendienst ablegen.

**TA-55**  
Die Pipeline muss als Eingabe einen CityGML-Ordner, einen EPSG-Code, ein `appearance`-Theme sowie `hasAlphaChannel` entgegennehmen.

**TA-56**  
Die Pipeline muss einen Laufstatus über ein `manifest.json` je `job_id` dokumentieren und strukturierte Fortschrittslogs bereitstellen.

**TA-57**  
Bei Teilfehlern darf kein Teilergebnis als gültig markiert werden; fehlerhafte Läufe gelten als verworfen und müssen vollständig neu gestartet werden.

---

<a id="14-sicherheit-security-by-design"></a>

## 14. Sicherheit (Security by Design)

**TA-58**  
Das System muss Prinzipien von Security by Design umsetzen (Least Privilege, Secure Defaults, Defense in Depth).

**TA-59**  
Alle externen Zugriffe müssen authentifiziert und autorisiert sein; Zugriffstoken dürfen nicht im Code abgelegt werden.

**TA-60**  
Secrets müssen ausschließlich über Secrets-Management bereitgestellt werden.

**TA-61**  
Die Datenübertragung muss verschlüsselt erfolgen (TLS).

**TA-62**  
Eingaben müssen serverseitig validiert werden; fehlerhafte Eingaben sind zu protokollieren.

**TA-63**  
Security-relevante Events müssen auditierbar geloggt werden.

**TA-64**  
Container müssen mit minimalen Rechten laufen (Non-Root, minimale Capabilities).

---

<a id="15-datenschutz-consent-tracking"></a>

## 15. Datenschutz, Consent & Tracking

**TA-65**  
Der Bürgerbereich darf keine Registrierung erfordern; der Bearbeitungszustand muss über einen notwendigen Cookie persistiert werden, damit Wiederbesuche ohne erneute Eingabe möglich sind.

**TA-66**  
Zusätzliche lokale Speicherung im Browser (z.B. Local Storage) ist zulässig, darf aber keine personenbezogene Vorbefüllung für neue Nutzer erzeugen; Nutzerdaten dürfen nicht zwischen Bürgern geteilt werden.

**TA-67**  
Das System muss ein Consent-Management für Cookies bereitstellen (notwendig/Analytics/Drittanbieter) und nachträgliche Änderungen erlauben.

**TA-68**  
Tracking und Analyse von Klickpfaden oder Nutzungsverhalten dürfen nur als Opt-in erfolgen.

**TA-69**  
Die Oberfläche muss barrierefrei gemäß § 4 BGG konzipiert sein und die Anforderungen der BITV 2.0 erfüllen (u.a. Screenreader, Alternativtexte, Kontrast, Tastaturbedienbarkeit).

---

<a id="16-observability-logging"></a>

## 16. Observability & Logging

**TA-70**  
Logs müssen Nutzeraktionen, Systemprozesse und Fehlerereignisse mit Zeitstempeln protokollieren, maschinenlesbar sein und Standard-Log-Levels (DEBUG, INFO, WARN, ERROR, FATAL) verwenden; Log-Level müssen zur Laufzeit dynamisch anpassbar sein. Containerisierte Komponenten schreiben standardmäßig auf `stdout`/`stderr`, sodass die zentrale Einsammlung über Kubernetes-Log-Pipelines (z.B. Promtail oder Grafana Alloy) erfolgen kann.

---

<a id="17-sicherheit-sdlc"></a>

## 17. Sicherheit & SDLC

**TA-71**  
Secure Development Lifecycle nach OWASP-Praktiken, Code-Reviews, Security-Scanning und Patch-Management sind verpflichtend; vor Go-Live ist ein Penetrationstest durchzuführen. Ergänzend müssen Programmdokumentation, Inline-Dokumentation sowie Architektur-, ER- und Datenflussmodell fortlaufend gepflegt und bereitgestellt werden.

---

<a id="18-integration-civitas-core"></a>

## 18. Integration (CIVITAS/CORE)

**TA-72**  
Die Integration in CIVITAS/CORE muss über standardisierte, dokumentierte Schnittstellen erfolgen; IAM erfolgt über Keycloak (OIDC) und API-Management über APISIX. Verbindlich sind offene APIs (z.B. OpenAPI 3.x, OGC API Features, REST/MQTT/OGC-Dienste). Eine Umsetzung von Smart Data Models und NGSI-LD ist für den DEZ nicht geplant (aufgrund des bereits entwickelten Umfangs des Rechenkerns und Unsicherheiten bei FIWARE); City Energy ADE ist derzeit nicht vorgesehen (Kompatibilität zu CityGML 3.x aktuell nicht gegeben), und SensorThingsAPI wird in diesem Kontext nicht verwendet. Eine optionale Implementierung kann im Projektverlauf neu bewertet werden. Zusätzliche Datensenken sind zu vermeiden.

---

<a id="19-performance-skalierung"></a>

## 19. Performance & Skalierung

**TA-73**  
Das System muss Caching für häufig genutzte Daten/Visualisierungen unterstützen und für horizontale sowie vertikale Skalierung vorbereitet sein; Monitoring umfasst Ladezeiten, CPU, RAM und I/O.

---

<a id="20-rechenmethoden-nachweise"></a>

## 20. Rechenmethoden & Nachweise

**TA-74**  
Berechnungen müssen auf anerkannten Normen, Richtlinien und Katalogen basieren (u.a. DIN 4108, DIN 4701, DIN V 18599, VDI 2067, VDI 3807, IWU-Gebäudetypologien, BKI-Kostenplaner).

**TA-75**  
In der Projektdokumentation sind konkrete Nachweise der verwendeten Rechenmethoden zu liefern (inkl. Seitenzahl, Tabellen-/Zeilennummern und spezifische Formelverweise).

---

<a id="21-datenloeschung-sitzungen"></a>

## 21. Datenlöschung & Sitzungen

**TA-76**  
Wenn Nutzereingaben oder Ergebnisse gespeichert wurden, muss ein Löschprozess bereitgestellt werden (z.B. über Link/QR im PDF), der eine eindeutige Identifikation des Datensatzes ermöglicht.

**TA-77**  
Der Löschprozess muss eine einfache, zweistufige Verifikation unterstützen (z.B. Adressabgleich + zusätzlicher Bestätigungsschritt), um ungewollte Löschungen zu vermeiden.

**TA-78**  
Sitzungsdaten müssen ohne Registrierung nutzbar sein; Abbruch und Wiederaufnahme über Wiederbesuche hinweg müssen über den notwendigen Cookie unterstützt werden. Eine serverseitige Wiederherstellung darf nur bereitgestellt werden, wenn der Nutzer die Speicherung explizit ausgelöst hat.

**TA-79**  
Der notwendige Cookie zur Zustandswiederherstellung muss transparent ausgewiesen werden; der Consent-Status (Datenschutz/Cookies) muss als technische Voraussetzung für optionale serverseitige Speicherung und Tracking geprüft und revisionssicher protokolliert werden.

---

<a id="22-admin-triage-audit"></a>

## 22. Admin-Triage & Audit

**TA-80**  
Jeder Nutzerdatensatz muss einen Status tragen (neu, in Prüfung, freigegeben, unplausibel) und die Statusänderung muss mit Zeitstempel und Benutzerkennung im Audit-Log protokolliert werden.

**TA-81**  
Der Admin-Bereich muss eine gruppierte Ansicht pro Gebäude bereitstellen, inkl. Vergleich mehrerer Datensätze.

**TA-82**  
Exporte für Verwaltung/Wärmeplanung müssen mindestens als JSON und CSV bereitgestellt werden und Filterkriterien berücksichtigen.

**TA-83**  
Statuswechsel sind nur entlang des definierten Triage-Lifecycles zulässig: neu → in Prüfung → freigegeben oder unplausibel.

---

<a id="23-eingabetiefe-live-berechnung"></a>

## 23. Eingabetiefe & Live-Berechnung

**TA-84**  
Der Berechnungskern muss ein kontinuierliches Eingabetiefe-Spektrum unterstützen; am unteren Ende basiert die Berechnung ausschließlich auf LOD2, Baualtersklassen und Standardannahmen.

**TA-85**  
Am oberen Ende des Spektrums müssen Szenario-Berechnungen für Einzelmaßnahmen und Kombinationen unterstützt und die Ergebnisse vergleichbar bereitgestellt werden (vorher/nachher).

**TA-86**  
Live-Ergebnisse sollen nach Eingabeänderungen ohne expliziten Berechnungs-Button aktualisiert werden; die Reaktionszeit muss für interaktive Nutzung geeignet sein.

### Eingabefelder entlang des Spektrums

| Eingabebereich              | Pflichtangaben                                        | Optionale Angaben                                                                                                                      |
| --------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Ohne Nutzereingabe          | keine                                                 | keine                                                                                                                                  |
| Grundangaben                | Baujahr                                               | Energieträger, Jahresverbrauch oder Kosten, Warmwasser elektrisch (Ja/Nein), Personenanzahl (Klassen)                                  |
| Bauteile und Anlage         | Bauteilzustände je Dach/Außenwand/Fenster/Kellerdecke | Heizflächenart, Erzeugerart, Baujahre je Bauteil                                                                                       |
| Detaillierung               | keine zusätzlichen globalen Pflichtangaben            | Überschreiben von Defaults je Bauteil, Dämmung ja/nein, Sanierungsjahr, Verglasungsart/Rahmen |
| Szenarien und Kombinationen | Auswahl mindestens einer Sanierungsmaßnahme           | Kombinationen, Budget, Förderlogik (optional)                                                                                          |

> ⚠️ **Hinweis:** Die genannten Eingaben bilden keine festen Stufen. Sie können entlang eines kontinuierlichen Spektrums bedarfsorientiert kombiniert werden.
>
> Luftdichtheit wird nicht direkt durch Nutzer eingegeben, sondern aus allgemeinen Annahmen (Katalogwerte und Baualter) referenziert.
>
> Eingaben sind als automatisch/manuell/geschätzt zu markieren; Validierungen erfolgen eingabetiefenspezifisch.

### Technische Zuordnung der Datenstufen aus der Grobkonzept-Arbeitsmappe

Quelle: `26-03-06_-Übersicht Berechnung Grobkonzept.xlsx`

- Datenstufe 1 ist technisch als Vollautomatikmodus ohne Nutzereingabe umzusetzen.
- Datenstufe 2 ist technisch als maximale manuelle Überschreibbarkeit und Detailparametrisierung umzusetzen.
- Zwischenwerte sind als kontinuierliche Kombination beider Extreme abzubilden (kein festes Stufenschema im UI oder in der API).

| Domäne           | Muss in Datenstufe 1 automatisiert belegt werden                       | Muss in Datenstufe 2 manuell überschreibbar sein                       |
| ---------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Dach/Dachfenster | Flächen aus LOD, U-Werte aus Baujahr/Baualtersklasse, Standardfaktoren | Flächen, U-Werte, Konstruktion/Schichtannahmen                         |
| OGD/AW/UGD       | Flächen und U-Werte aus LOD + Katalogwerten                            | Flächen, U-Werte, Konstruktionsdetails und Materialannahmen            |
| Fenster/Türen    | Standardflächenanteile und U-Werte aus Baualter/Katalog                | Flächen, Rahmen-/Verglasungsparameter, U-Werte                         |
| Heizung/Anlage   | Vorbelegung aus Baujahr, Energieträger- und Erzeugerkatalog            | Systemart, Erzeugerart, Heizflächenart, Zusatzheizung, Detailparameter |

### Offene technische Klärungspunkte aus dem Grobkonzept

Die folgenden Punkte sind vor produktiver Übernahme als technische Spezifikation zu konkretisieren:

- Kostenlogik ist in mehreren Blättern nur als Platzhalter gekennzeichnet und hat noch keine belastbare Felddefinition.
- Einzelne Beispiel-/Templatewerte (`0`, `#`) dürfen nicht als produktive Defaults interpretiert werden.
- Die fachliche Herleitung und Geltung von Korrekturfaktoren `F` je Bauteil ist unvollständig dokumentiert.
- Mehrere Heizungsfälle sind nur mit generischem Ergebnistext ("Sanierungsempfehlung") hinterlegt; es fehlt eine maschinenlesbare Entscheidungslogik.
- Kataloginhalte im Blatt `Kat. 2 Heizung` enthalten uneinheitliche Bezeichner/Sonderzeichen und benötigen eine formale Bereinigung vor Import in Konfigurationsdaten.

---

<a id="24-open-source-foerderkulisse"></a>

## 24. Open Source & Förderkulisse

**TA-87**  
Die Lösung muss Open Source sein und als finales Release über OpenCoDE veröffentlicht werden; Zwischenstände oder Beta-Versionen dürfen dort nicht bereitgestellt werden.

**TA-88**  
Die für OpenCoDE geforderten Qualitätskriterien müssen erfüllt werden, einschließlich: werthaltige Projektbeschreibung, benannte verantwortliche Person, CVE-Management für Abhängigkeiten, automatisierte Tests, Bug- und Security-Kontaktstellen, SBOM sowie Release Notes.

**TA-89**  
Das Repository muss die für OpenCoDE erforderlichen Dateien enthalten (u.a. `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `LICENSE`, `README.md`, `SECURITY.md`, `publiccode.yml`). Jede Datei muss einen Urheberrechtsvermerk, eine Lizenzbezeichnung und einen SPDX-Identifier enthalten.

**TA-90**  
Die Open-Source-Lizenz ist in Abstimmung mit dem Auftraggeber auszuwählen (permissiv vs. Copyleft). Lizenz-Compliance ist sicherzustellen; die Nutzung von CLA und/oder DCO ist vorzusehen.

**TA-91**  
Die Dokumentation muss Wiederverwendbarkeit sicherstellen und mindestens Installationsanleitung, Schnittstellenbeschreibung sowie Benutzer- und Administrationshandbuch umfassen; die Open-Source-Guidelines der Förderkulisse sind einzuhalten.

**TA-92**  
Vendor-Lock-in ist zu vermeiden: Die Codebase muss portabel, frei von proprietären Geheimnissen und ohne nicht-offene Abhängigkeiten bereitgestellt werden.

**TA-93**  
Code mit Datentausch-Funktionalität muss öffentliche Standards für den Austausch verwenden; eine Liste aller verwendeten Standards ist innerhalb der Codebase zu pflegen.

**TA-94**  
Der Beitragungs- und Release-Prozess muss Security-Grundsätze berücksichtigen (z.B. Secret-Scanning, gesicherte Release-Pfade, Vieraugenprinzip).

**TA-95**  
Falls flurstücksbezogene Geothermiepotenziale nicht rechtzeitig verfügbar sind, müssen diese aus den verfügbaren Daten nach dem LfU/TUM-Vorgehen selbst berechnet werden; der Fallback ist in der Pipeline zu berücksichtigen.

---

<a id="25-bsi-grundschutz-bezug"></a>

## 25. BSI Grundschutz Bezug

**TA-96**  
Das Sicherheitskonzept muss sich an relevanten Bausteinen des BSI IT-Grundschutz-Kompendiums orientieren. Für den Digitaler Energie Zwilling (DEZ) sind insbesondere folgende Bausteine einschlägig:

- APP.3.1 Webanwendungen und Webservices
- APP.3.2 Webserver
- APP.4.3 Relationale Datenbanksysteme
- SYS.1.1 Allgemeiner Server
- NET.1.1 Netzarchitektur und -design
- NET.3.1 Netzkomponenten
- OPS.1.1.3 Patch- und Änderungsmanagement
- CON.8 Software-Entwicklung

---

<a id="26-offene-mvp-klaerung-solarthermie-pv-und-geothermie"></a>

## 26. Offene MVP-Klärung: Solarthermie, PV und Geothermie

**TA-97**  
Solarthermie muss technisch als optionale Sanierungsmaßnahme zur Unterstützung der Warmwasserbereitung in Kombination mit der bestehenden Heizung modellierbar sein.

**TA-98**  
Der konkrete Umsetzungsumfang bezüglich Solarthermie muss für die MVP-Phase vor Implementierungsstart verbindlich festgelegt werden.

**TA-99**  
Für PV müssen zwei getrennte Berechnungspfade unterstützt werden:

- Darstellung 1: Dimensionierung von PV-Anlage und Speicher für den Betrieb einer Wärmepumpe inkl. energetischer und finanzieller Effekte.
- Darstellung 2: Maximale Ausnutzung der für PV geeigneten Flächen inkl. Kommunikation der Potenziale für Haushaltsstrom, KFZ-Ladung oder vergleichbare Verbräuche.

**TA-100**  
Die Geothermie-Einschätzung muss technisch in einer festen Prioritätsreihenfolge erfolgen: Grundwasser, Erdreich, Luft.

**TA-101**  
Bis zur Bereitstellung eines belastbaren Geothermie-Datensatzes ist die Geothermie-Bewertung als vorläufig zu kennzeichnen; der produktive Einsatz im MVP bleibt bis zur Klärung offen.

---

<a id="27-civitas-core-integration-praezisierungen"></a>

## 27. CIVITAS/CORE-Integration (Präzisierungen)

**TA-102**  
Alle externen Datenzugriffe (API, veröffentlichte Konfigurations-Snapshots, 3D Tiles) müssen ausschließlich über APISIX erfolgen; direkte öffentliche Zugriffe auf interne Dienste sind unzulässig.

**TA-103**  
Der Verarbeitungsschritt `CityGML → CityJSON → 3D Tiles` muss als eigenständiges, CIVITAS/CORE-fähiges Add-on bereitgestellt werden.

**TA-104**  
Add-ons müssen die konfigurationsbasierte Aktivierung und Deaktivierung einzelner Dienste oder Teilkomponenten unterstützen, sofern diese fachlich sinnvoll entkoppelbar sind.

**TA-105**  
Für die Bereitstellung von 3D Tiles müssen zwei Betriebsmodi unterstützt werden:

- direkter Zugriff auf den externen S3-kompatiblen Datendienst hinter APISIX
- Zugriff über ein optionales Tiles Gateway hinter APISIX

**TA-106**  
Der Aufruf der DEZ-Plattform aus dem MasterPortal muss technisch verbindlich über einen konfigurierbaren Link-Out unterstützt werden; eine tiefe UI-Einbettung in das MasterPortal ist dafür nicht zwingend erforderlich.

> **Begründung (technisch):** Der Link-Out ermöglicht eine performante, statische DEZ-Auslieferung, höhere Entkopplung im Betrieb (Verfügbarkeit/Release-Zyklus), DEZ-spezifische Consent-/Tracking-Logik sowie bessere Skalierbarkeit für die Nachnutzung in weiteren Kommunen.

**TA-107**  
Die Gebäudeeinfärbung im öffentlichen 3D-Client ist verpflichtend umzusetzen und muss über Cesium Tileset Styles (z.B. `Cesium3DTileStyle`) auf Basis der Effizienzklassen bzw. Ergebnisattribute steuerbar sein.

---

<a id="28-api-client-generierung"></a>

## 28. API-Client-Generierung

**TA-108**  
Das Backend muss eine OpenAPI-3.0-Spezifikation als Source of Truth bereitstellen; die Spezifikation wird über die bestehenden Fastify-toab/OpenAPI-Mechanismen erzeugt.

**TA-109**  
Der Frontend-API-Client muss aus der OpenAPI-3.0-Spezifikation mit `@hey-api/openapi-ts` generiert werden.

**TA-110**  
Für den generierten Frontend-API-Client muss die React-Query-Erweiterung von `@hey-api/openapi-ts` genutzt werden, um typsichere Query- und Mutation-Hooks bereitzustellen.

**TA-111**  
Im Frontend-Repository muss die Generator-Konfiguration zentral in `openapi-ts.config.ts` gepflegt werden.

**TA-112**  
Als Eingabe für die Client-Generierung muss eine versionierte OpenAPI-Spezifikation im Pfad `openapi/openapi.json` verwendet werden.

**TA-113**  
Der generierte API-Client-Code muss im Pfad `src/shared/api/generated/` abgelegt werden; manuelle Änderungen in generierten Dateien sind unzulässig.

**TA-114**  
Für die Generierung und Konsistenzprüfung müssen standardisierte Skripte bereitgestellt werden:

- `openapi:generate` zur Neugenerierung
- `openapi:check` zur Prüfung, dass kein ungeprüfter Generierungs-Diff vorliegt

**TA-115**  
Query- und Mutation-Nutzung im Frontend muss über den generierten React-Query-Layer erfolgen; direkte, untypisierte HTTP-Aufrufe für API-Endpunkte sind zu vermeiden.

---

<a id="29-aktualisierung-der-basisdaten"></a>

## 29. Aktualisierung der Basisdaten

**TA-116**  
Der LOD2-Basisdatensatz muss mit einem Zielzyklus von zwei Jahren aktualisiert werden können.

**TA-117**  
Solarpotenzial- und Geothermie-Basisdaten müssen unabhängig vom LOD2-Zyklus mit jeweils eigenen Aktualisierungszeiträumen aktualisierbar sein.

**TA-118**  
Die Offline-Pipeline muss vollständig optionale, getrennte Aktualisierungsruns je Datendomäne unterstützen (mindestens: `lod2`, `solar`, `geothermie`, `full`).

**TA-119**  
Ein Aktualisierungsrun einer Datendomäne darf keine obligatorische Neuberechnung oder Neuveröffentlichung nicht betroffener Datendomänen erzwingen.

**TA-120**  
Für die Nachnutzung durch andere Kommunen muss die Pipeline so ausgelegt sein, dass Aktualisierungen je Datenquelle unabhängig voneinander konfiguriert, gestartet und validiert werden können.

---

<a id="30-nachnutzung-und-white-labeling"></a>

## 30. Nachnutzung und White-Labeling

**TA-121**  
Das System muss ein konfigurierbares Kommunenprofil unterstützen, in dem mindestens Branding, Basemap-Quellen, Datenquellen-Endpunkte, Default-Parameter und Textbausteine kommunenspezifisch gepflegt werden können.

**TA-122**  
Regensburg-spezifische Inhalte dürfen nicht hartcodiert in Kernkomponenten liegen, sondern müssen über das Kommunenprofil oder über austauschbare Konfigurationspakete gekapselt sein.

**TA-123**  
Für die Offline-Datenpipeline muss ein kanonisches Zielschema für Gebäude-, Potenzial- und Adressattribute definiert werden, auf das kommunenspezifische Quellschemata gemappt werden.

**TA-124**  
Für jede angebundene Kommune muss ein versioniertes Mapping-Profil (Quelle -> kanonisches Schema) vorliegen, inklusive Feldzuordnung, Einheiten, Transformationsregeln und Fallback-Strategien.

**TA-125**  
CityGML Energy ADE muss als optionaler Eingabestandard unterstützt werden. Wenn Energy-ADE-Daten vorliegen, müssen diese vorrangig über das Mapping-Profil in das kanonische Schema überführt werden können.

**TA-126**  
Wenn keine Energy-ADE-Daten vorliegen, muss das System über definierte Fallback-Pfade (z.B. LOD2-Basisattribute, externe Potenzialdaten, Konfigurationswerte) weiterhin lauffähig sein.

**TA-127**  
Mapping-Ergebnisse müssen pro Attribut eine Herkunftskennzeichnung (Quelle, Transformationsregel, Mapping-Version) bereitstellen, damit Nachvollziehbarkeit und kommunenübergreifende Vergleichbarkeit sichergestellt sind.

**TA-128**  
Mapping-Profile und Kommunenprofile müssen unabhängig voneinander versioniert, getestet und ausgerollt werden können, ohne die Kernlogik des Berechnungskerns zu ändern.

---

<a id="31-festlegung-nutzungsdaten-und-tracking"></a>

## 31. Festlegung: Nutzungsdaten und Tracking

**TA-129**  
Für Nutzungsanalysen ist Matomo verbindlich als Analytics-Lösung einzusetzen.

**TA-130**  
Analytics-Skripte und Tracking-Endpunkte dürfen erst nach gültigem Opt-in aktiviert werden.

**TA-131**  
Vor produktiver Aktivierung von Analytics müssen Eventkatalog, Zweckbindung, Aufbewahrungsfristen, Anonymisierungsregeln, Löschkonzept und Rollen-/Rechtekonzept verbindlich dokumentiert und freigegeben sein.

**TA-132**  
Tracking-Funktionen müssen ohne gültiges Opt-in standardmäßig deaktiviert bleiben.

---

<a id="32-single-point-of-truth-fuer-basisdaten"></a>

## 32. Single Point of Truth für Basisdaten

**Hinweis (SoT):** Für Basisdaten bedeutet Single Point of Truth die eindeutige Kombination aus **Quell-Datensatzversion**, **Mapping-Profil-Version** und **veröffentlichtem Release-Manifest**.

**TA-133**  
Basisdaten müssen je Kommune über einen versionierten Quellnachweis (Datensatz-ID, Quelle, Zeitpunkt, Prüfsumme, EPSG) geführt werden.

**TA-134**  
Die Transformation von LOD2- und Ergänzungsdaten in 3D Tiles muss ausschließlich über ein versioniertes Mapping-Profil erfolgen.

**TA-135**  
Für die Laufzeit muss je Kommune ein veröffentlichtes Release-Manifest den aktiven Stand der Basisdaten eindeutig festlegen.

**TA-136**  
Jeder abgeleitete Basisdatenwert in 3D Tiles muss provenance-fähig auf Quellversion, Mapping-Version und Transformationszeitpunkt rückführbar sein.

**TA-137**  
Teil-Updates dürfen nur den betroffenen Daten-Scope neu veröffentlichen; der aktive Stand nicht betroffener Scopes muss unverändert gültig bleiben.

**TA-138**  
Eine DEZ-Instanz muss genau eine Kommune bedienen; Nachnutzung für weitere Kommunen erfolgt über getrennte Deployments und nicht über gleichzeitige Mehrkommunen-Nutzung innerhalb derselben Instanz.

---

<a id="33-datenquellen-metadaten"></a>

## 33. Datenquellen-Metadaten

**TA-139**  
Für jede in der DEZ verwendete Datenquelle müssen verbindlich die Metadaten `data_owner`, `license` und `distribution` ausgewiesen werden.

**TA-140**  
Die Felder `data_owner`, `license` und `distribution` müssen für die in DEZ verwendeten Datenquellen in den Datenschutzhinweisen der DEZ-Webseite transparent ausgewiesen werden.

**TA-141**  
Die Verantwortung für Datenverantwortung sowie Bereitstellung und Pflege der Metadaten (`data_owner`, `license`, `distribution`) liegt beim jeweiligen Betreiber der DEZ-Plattform.

---

<a id="34-abnahmeprozess-und-ansprechpartner"></a>

## 34. Abnahmeprozess und Ansprechpartner

**TA-142**  
Für den Abnahmeprozess sind bei der Stadt Regensburg jeweils ein fachlicher und ein technischer Ansprechpartner verbindlich benannt.

---

<a id="abgrenzung"></a>

## Abgrenzung

Dieses Dokument beschreibt **was technisch erforderlich ist**, nicht jedoch die konkrete Implementierung.  
Details zur Architektur, zu Komponenten und Datenflüssen werden in den Architekturkapiteln beschrieben.
