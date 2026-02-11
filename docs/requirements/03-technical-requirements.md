# Technische Anforderungen - Digitaler Energy Zwilling (DEZ)

## Ziel der technischen Anforderungen

Dieses Dokument beschreibt die **technischen Anforderungen** an den Digitaler Energy Zwilling (DEZ).  
Es legt verbindlich fest, **welche technischen Eigenschaften, Randbedingungen und Qualitätsmerkmale** das System erfüllen muss, um die fachlichen Anforderungen korrekt, sicher und wartbar umzusetzen.

Die technischen Anforderungen dienen als:

- Grundlage für Architektur- und Technologieentscheidungen
- Referenz für Implementierung und Reviews
- Basis für Abnahme und Qualitätssicherung

Verbindlichkeit: **MUSS** = verpflichtend, **SOLL** = wünschenswert/nice-to-have, **KANN** = optional.

---

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

## 3. 3D-Visualisierung & Tiles

**TA-10**  
Die 3D-Visualisierung muss auf dem Standard 3D Tiles basieren.

**TA-11**  
3D Tiles müssen vollständig offline vorverarbeitet werden.

**TA-12**  
Solarpotenziale (PV) und Geothermiepotenziale müssen als statische Attribute direkt in den 3D Tiles abgelegt sein.

**TA-13**  
Zur Laufzeit dürfen keine Solar- oder Geothermiepotenziale berechnet werden.

Hinweis: Solarthermiepotenziale sind nicht Teil der technischen Anforderungen.

**TA-14**  
3D Tiles dürfen nicht vom Backend ausgeliefert werden.

**TA-15**  
3D Tiles müssen über ein dediziertes Gateway bereitgestellt werden.

---

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

## 5. Simulationskern

**TA-19**  
Der Simulationskern muss als eigenständiges JavaScript-Modul implementiert sein.

**TA-20**  
Der Simulationskern muss sowohl im Browser als auch in einer Node.js-Umgebung lauffähig sein.

**TA-21**  
Die Simulation muss vollständig clientseitig ausführbar sein.

**TA-22**  
Für die Durchführung einer Simulation dürfen keine Nutzereingaben zwingend an den Server übertragen werden.

**TA-23**  
Eine serverseitige Ausführung der Simulation darf optional für administrative oder technische Zwecke möglich sein.

---

## 6. Datenschutz & Privacy-by-Design

**TA-24**  
Das System muss eine datenschutzfreundliche Nutzung ohne Übertragung personenbezogener Nutzereingaben ermöglichen.

**TA-25**  
Die Speicherung von Nutzereingaben muss optional und explizit durch den Nutzer ausgelöst werden.

**TA-26**  
Simulation und Datenspeicherung müssen technisch voneinander entkoppelt sein.

---

## 7. Konfigurationsmanagement

**TA-27**  
Simulationsparameter müssen ohne Codeänderung anpassbar sein.

**TA-28**  
Simulationskonfigurationen müssen versionierbar sein.

**TA-29**  
Jede Konfiguration muss eindeutig einer Version oder einem zeitlichen Gültigkeitsbereich zugeordnet sein.

**TA-30**  
Für den öffentlichen Bürger-Client muss eine veröffentlichte, versionierte Konfigurationsdatei bereitgestellt werden.

**TA-31**  
Simulationsergebnisse müssen anhand der verwendeten Konfigurationsversion reproduzierbar sein.

---

## 8. Backend & API

**TA-32**  
Das Backend muss Schnittstellen zur Verwaltung von Simulationskonfigurationen bereitstellen.

**TA-33**  
Das Backend muss Schnittstellen zur optionalen Speicherung von Nutzereingaben bereitstellen.

**TA-34**  
Das Backend muss administrative Funktionen zur Sichtung und Triage von Nutzereingaben unterstützen.

**TA-35**  
Öffentliche und administrative API-Endpunkte müssen technisch getrennt und unterschiedlich abgesichert sein.

---

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

## 10. Betrieb & Qualität

**TA-40**  
Das System muss für eine spike-basierte Nutzung mit mehreren tausend parallelen Nutzern ausgelegt sein.

**TA-41**  
Das System muss Mechanismen zur Beobachtbarkeit wie Logging, Metriken und Tracing unterstützen.

**TA-42**  
Das System muss containerisierbar sein und in einer orchestrierten Umgebung betrieben werden können.

---

## 11. Konfigurations-Publishing

**TA-43**  
Konfigurationen müssen in der Datenbank als **Source of Truth** gepflegt und versioniert werden.

**TA-44**  
Für jede veröffentlichte Konfiguration muss ein JSON-Snapshot erzeugt und als Datei exportiert werden.

**TA-45**  
Der Simulationskern muss die veröffentlichte JSON-Konfiguration lesen können, ohne direkten Datenbankzugriff.

**TA-46**  
Veröffentlichte Konfigurationen müssen unveränderlich sein; Änderungen erfordern eine neue Version.

---

## 12. Öffentliche Übermittlung & Verifikation

**TA-47**  
Der öffentliche Bürger-Client muss Simulationsergebnisse **inklusive Eingaben** an das Backend übermitteln können.

**TA-48**  
Das Backend muss Eingaben gegen **konfigurierbare Wertebereiche** validieren (z.B. min/max).

**TA-49**  
Das Backend muss Ergebnisse serverseitig mit dem gleichen Simulationskern neu berechnen.

**TA-50**  
Nur verifizierte und triagierte Ergebnisse dürfen für die Gebäude-Indexierung und Veröffentlichungen verwendet werden.

**TA-51**  
Öffentliche Schreibzugriffe müssen durch Altcha-Challenges und Rate Limiting geschützt werden.
Altcha ist eine selbsthostbare, datenschutzfreundliche Challenge; der Backend-Service prüft das übermittelte Token.

---

## 13. Offline-Pipeline-Betrieb (Airflow)

**TA-52**  
Die Offline-Datenpipeline muss in Civitas Core über Airflow orchestriert werden; DAG-Läufe werden ausschließlich manuell über die Airflow-Oberfläche gestartet.

**TA-53**  
Die Konvertierung (CityGML → CityJSON → 3D Tiles) und die Metadaten-Anreicherung (Solar/Geothermie) müssen als getrennte Verarbeitungsschritte in separaten Containern ausgeführt werden.

**TA-54**  
Jeder Pipeline-Lauf muss eine von Airflow vorgegebene `job_id` verwenden und alle Artefakte unter einem dedizierten Job-Ordner im S3-kompatiblen Datendienst ablegen.

**TA-55**  
Die Pipeline muss als Eingabe einen CityGML-Ordner, einen EPSG-Code, ein `appearance`-Theme sowie `hasAlphaChannel` entgegennehmen.

**TA-56**  
Die Pipeline muss einen Laufstatus über ein `manifest.json` je `job_id` dokumentieren und strukturierte Fortschrittslogs bereitstellen.

**TA-57**  
Bei Teilfehlern darf kein Teilergebnis als gültig markiert werden; fehlerhafte Läufe gelten als verworfen und müssen vollständig neu gestartet werden.

---

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

## 15. Datenschutz, Consent & Tracking

**TA-65**  
Der Bürgerbereich darf keine Registrierung erfordern; temporäre Zustände dürfen über Session-Cookies gehalten werden, optionale lokale Speicherung im Browser ist zulässig.

**TA-66**  
Lokale Speicherung im Browser (z.B. Local Storage) ist zulässig, darf aber keine personenbezogene Vorbefüllung für neue Nutzer erzeugen; Nutzerdaten dürfen nicht zwischen Bürgern geteilt werden.

**TA-67**  
Das System muss ein Consent-Management für Cookies bereitstellen (notwendig/Analytics/Drittanbieter) und nachträgliche Änderungen erlauben.

**TA-68**  
Tracking und Analyse von Klickpfaden oder Nutzungsverhalten dürfen nur als Opt-in erfolgen.

**TA-69**  
Die Oberfläche muss barrierefrei gemäß § 4 BGG konzipiert sein und die Anforderungen der BITV 2.0 erfüllen (u.a. Screenreader, Alternativtexte, Kontrast, Tastaturbedienbarkeit).

---

## 16. Observability & Logging

**TA-70**  
Logs müssen Nutzeraktionen, Systemprozesse und Fehlerereignisse mit Zeitstempeln protokollieren, maschinenlesbar sein und Standard-Log-Levels (DEBUG, INFO, WARN, ERROR, FATAL) verwenden; Log-Level müssen zur Laufzeit dynamisch anpassbar sein.

---

## 17. Sicherheit & SDLC

**TA-71**  
Secure Development Lifecycle nach OWASP-Praktiken, Code-Reviews, Security-Scanning und Patch-Management sind verpflichtend; vor Go-Live ist ein Penetrationstest durchzuführen. Ergänzend müssen Programmdokumentation, Inline-Dokumentation sowie Architektur-, ER- und Datenflussmodell fortlaufend gepflegt und bereitgestellt werden.

---

## 18. Integration (CIVITAS/CORE)

**TA-72**  
Die Integration in CIVITAS/CORE muss OGC-Standards, NGSI-LD und SensorThingsAPI unterstützen; IAM erfolgt über Keycloak (OIDC) und API-Management über APISIX; Multimandantenfähigkeit (Dataspace) ist zu berücksichtigen. Die Kommunikation zwischen Komponenten muss über standardisierte Schnittstellen (z.B. REST, MQTT, OGC-Dienste) erfolgen; offene, dokumentierte APIs wie OpenAPI 3.x oder OGC API Features sind verbindlich zu verwenden. Zusätzliche Datensenken sind zu vermeiden.

---

## 19. Performance & Skalierung

**TA-73**  
Das System muss Caching für häufig genutzte Daten/Visualisierungen unterstützen und für horizontale sowie vertikale Skalierung vorbereitet sein; Monitoring umfasst Ladezeiten, CPU, RAM und I/O.

---

## 20. Betrieb & Support

**TA-74**  
Für den Betrieb sind Bugfixing, OS- und Framework-Updates, Security-Patches und 2nd-Level-Support bereitzustellen; kritische Sicherheitsupdates müssen innerhalb von 72h erfolgen; Supportzeiten sind Mo–Fr 09:00–16:00 Uhr.

---

## 21. Rechenmethoden & Nachweise

**TA-75**  
Berechnungen müssen auf anerkannten Normen, Richtlinien und Katalogen basieren (u.a. DIN 4108, DIN 4701, DIN V 18599, VDI 2067, VDI 3807, IWU-Gebäudetypologien, BKI-Kostenplaner).

**TA-76**  
In der Projektdokumentation sind konkrete Nachweise der verwendeten Rechenmethoden zu liefern (inkl. Seitenzahl, Tabellen-/Zeilennummern und spezifische Formelverweise).

---

## 22. Datenlöschung & Sitzungen

**TA-77**  
Wenn Nutzereingaben oder Ergebnisse gespeichert wurden, muss ein Löschprozess bereitgestellt werden (z.B. über Link/QR im PDF), der eine eindeutige Identifikation des Datensatzes ermöglicht.

**TA-78**  
Der Löschprozess muss eine einfache, zweistufige Verifikation unterstützen (z.B. Adressabgleich + zusätzlicher Bestätigungsschritt), um ungewollte Löschungen zu vermeiden.

**TA-79**  
Sitzungsdaten müssen ohne Registrierung nutzbar sein; Abbruch und Wiederaufnahme innerhalb der Session sind zu unterstützen. Persistente Speicherung darf nur erfolgen, wenn der Nutzer dies explizit auslöst.

**TA-80**  
Der Consent-Status (Datenschutz/Cookies) muss als technische Voraussetzung für optionale Speicherung/Tracking geprüft und revisionssicher protokolliert werden.

---

## 23. Admin-Triage & Audit

**TA-81**  
Jeder Nutzerdatensatz muss einen Status tragen (neu, in Prüfung, freigegeben, unplausibel) und die Statusänderung muss mit Zeitstempel und Benutzerkennung im Audit-Log protokolliert werden.

**TA-82**  
Der Admin-Bereich muss eine gruppierte Ansicht pro Gebäude bereitstellen, inkl. Vergleich mehrerer Datensätze.

**TA-83**  
Exporte für Verwaltung/Wärmeplanung müssen mindestens als JSON und CSV bereitgestellt werden und Filterkriterien berücksichtigen.

**TA-84**  
Statuswechsel sind nur entlang des definierten Triage-Lifecycles zulässig: neu → in Prüfung → freigegeben oder unplausibel.

---

## 24. Eingabetiefe & Live-Berechnung

**TA-85**  
Der Simulationskern muss ein kontinuierliches Eingabetiefe-Spektrum unterstützen; am unteren Ende basiert die Simulation ausschließlich auf LOD2, Baualtersklassen und Standardannahmen.

**TA-86**  
Am oberen Ende des Spektrums müssen Szenario-Berechnungen für Einzelmaßnahmen und Kombinationen unterstützt und die Ergebnisse vergleichbar bereitgestellt werden (vorher/nachher).

**TA-87**  
Live-Ergebnisse sollen nach Eingabeänderungen ohne expliziten Berechnungs-Button aktualisiert werden; die Reaktionszeit muss für interaktive Nutzung geeignet sein.

### Eingabefelder entlang des Spektrums

| Eingabebereich | Pflichtangaben | Optionale Angaben |
| ----- | ----- | ----- |
| Ohne Nutzereingabe | keine | keine |
| Grundangaben | Baujahr | Energieträger, Jahresverbrauch oder Kosten, Warmwasser elektrisch (Ja/Nein), Personenanzahl (Klassen) |
| Bauteile und Anlage | Bauteilzustände je Dach/Außenwand/Fenster/Kellerdecke | Heizflächenart, Erzeugerart, Baujahre je Bauteil |
| Detaillierung | keine zusätzlichen globalen Pflichtangaben | Überschreiben von Defaults je Bauteil, Dämmung ja/nein, Sanierungsjahr, Verglasungsart/Rahmen, Vorlauftemperatur, Erzeugerleistung, Umwälzpumpe, Regelprinzip, technische Ausführung |
| Szenarien und Kombinationen | Auswahl mindestens einer Sanierungsmaßnahme | Kombinationen, Budget, Fürderlogik (optional) |

Hinweis: Die genannten Eingaben bilden keine festen Stufen. Sie können entlang eines kontinuierlichen Spektrums bedarfsorientiert kombiniert werden.
Hinweis: Luftdichtheit wird nicht direkt durch Nutzer eingegeben, sondern aus allgemeinen Annahmen (Katalogwerte und Baualter) referenziert.
Hinweis: Eingaben sind als automatisch/manuell/geschätzt zu markieren; Validierungen erfolgen eingabetiefenspezifisch.

### Technische Zuordnung der Datenstufen aus der Grobkonzept-Arbeitsmappe

Quelle: `30-01-26_-Übersicht Berechnung Grobkonzept.xlsx`

- Datenstufe 1 ist technisch als Vollautomatikmodus ohne Nutzereingabe umzusetzen.
- Datenstufe 2 ist technisch als maximale manuelle Überschreibbarkeit und Detailparametrisierung umzusetzen.
- Zwischenwerte sind als kontinuierliche Kombination beider Extreme abzubilden (kein festes Stufenschema im UI oder in der API).

| Domäne | Muss in Datenstufe 1 automatisiert belegt werden | Muss in Datenstufe 2 manuell überschreibbar sein |
| ----- | ----- | ----- |
| Dach/Dachfenster | Flächen aus LOD, U-Werte aus Baujahr/Baualtersklasse, Standardfaktoren | Flächen, U-Werte, Konstruktion/Schichtannahmen |
| OGD/AW/UGD | Flächen und U-Werte aus LOD + Katalogwerten | Flächen, U-Werte, Konstruktionsdetails und Materialannahmen |
| Fenster/Türen | Standardflächenanteile und U-Werte aus Baualter/Katalog | Flächen, Rahmen-/Verglasungsparameter, U-Werte |
| Heizung/Anlage | Vorbelegung aus Baujahr, Energieträger- und Erzeugerkatalog | Systemart, Erzeugerart, Heizflächenart, Zusatzheizung, Detailparameter |

### Offene technische Klärungspunkte aus dem Grobkonzept

Die folgenden Punkte sind vor produktiver übernahme als technische Spezifikation zu konkretisieren:
- Kostenlogik ist in mehreren Blättern nur als Platzhalter gekennzeichnet und hat noch keine belastbare Felddefinition.
- Einzelne Beispiel-/Templatewerte (`0`, `#`) dürfen nicht als produktive Defaults interpretiert werden.
- Die fachliche Herleitung und Geltung von Korrekturfaktoren `F` je Bauteil ist unvollständig dokumentiert.
- Mehrere Heizungsfälle sind nur mit generischem Ergebnistext ("Sanierungsempfehlung") hinterlegt; es fehlt eine maschinenlesbare Entscheidungslogik.
- Kataloginhalte im Blatt `Kat. Heizung` enthalten uneinheitliche Bezeichner/Sonderzeichen und benötigen eine formale Bereinigung vor Import in Konfigurationsdaten.

---

## 25. Anlagentechnik-Detailgrad

**TA-88**  
Die Eingabemaske muss die Heizungsregelung als auswählbare Kategorie unterstützen (Raumtemperaturregelung, witterungsgeführte Regelung, Differenzregelung).

**TA-89**  
Mit zunehmender manueller Eingabetiefe müssen optionale Anlagenparameter aufgenommen werden können (Vorlauftemperatur, Erzeugerleistung, Umwälzpumpe, Heizflächen, Regelprinzip, technische Ausführung).

---

## 26. Open Source & Förderkulisse

**TA-90**  
Die Lösung muss Open Source sein und als finales Release über OpenCoDE veröffentlicht werden; Zwischenstände oder Beta-Versionen dürfen dort nicht bereitgestellt werden.

**TA-91**  
Die für OpenCoDE geforderten Qualitätskriterien müssen erfüllt werden, einschließlich: werthaltige Projektbeschreibung, benannte verantwortliche Person, CVE-Management für Abhängigkeiten, automatisierte Tests, Bug- und Security-Kontaktstellen, SBOM sowie Release Notes.

**TA-92**  
Das Repository muss die für OpenCoDE erforderlichen Dateien enthalten (u.a. `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `LICENSE`, `README.md`, `SECURITY.md`, `publiccode.yml`). Jede Datei muss einen Urheberrechtsvermerk, eine Lizenzbezeichnung und einen SPDX-Identifier enthalten.

**TA-93**  
Die Open-Source-Lizenz ist in Abstimmung mit dem Auftraggeber auszuwählen (permissiv vs. Copyleft). Lizenz-Compliance ist sicherzustellen; die Nutzung von CLA und/oder DCO ist vorzusehen.

**TA-94**  
Die Dokumentation muss Wiederverwendbarkeit sicherstellen und mindestens Installationsanleitung, Schnittstellenbeschreibung sowie Benutzer- und Administrationshandbuch umfassen; die Open-Source-Guidelines der Förderkulisse sind einzuhalten.

**TA-95**  
Vendor-Lock-in ist zu vermeiden: Die Codebase muss portabel, frei von proprietären Geheimnissen und ohne nicht-offene Abhängigkeiten bereitgestellt werden.

**TA-96**  
Code mit Datentausch-Funktionalität muss öffentliche Standards für den Austausch verwenden; eine Liste aller verwendeten Standards ist innerhalb der Codebase zu pflegen.

**TA-97**  
Der Beitragungs- und Release-Prozess muss Security-Grundsätze berücksichtigen (z.B. Secret-Scanning, gesicherte Release-Pfade, Vieraugenprinzip).

**TA-98**  
Falls flurstücksbezogene Geothermiepotenziale nicht rechtzeitig verfügbar sind, müssen diese aus den verfügbaren Daten nach dem LfU/TUM-Vorgehen selbst berechnet werden; der Fallback ist in der Pipeline zu berücksichtigen.

---

## 27. BSI Grundschutz Bezug

**TA-99**  
Das Sicherheitskonzept muss sich an relevanten Bausteinen des BSI IT-Grundschutz-Kompendiums orientieren. Für den Digitaler Energy Zwilling (DEZ) sind insbesondere folgende Bausteine einschlägig:

- APP.3.1 Webanwendungen und Webservices
- APP.3.2 Webserver
- APP.4.3 Relationale Datenbanksysteme
- SYS.1.1 Allgemeiner Server
- NET.1.1 Netzarchitektur und -design
- NET.3.1 Netzkomponenten
- OPS.1.1.3 Patch- und Änderungsmanagement
- CON.8 Software-Entwicklung

---

## Abgrenzung

Dieses Dokument beschreibt **was technisch erforderlich ist**, nicht jedoch die konkrete Implementierung.  
Details zur Architektur, zu Komponenten und Datenflüssen werden in den Architekturkapiteln beschrieben.
