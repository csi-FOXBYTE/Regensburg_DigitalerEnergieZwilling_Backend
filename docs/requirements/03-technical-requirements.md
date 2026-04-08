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

<a id="ta-01"></a>

**TA-01**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Das System muss als webbasierte Anwendung ohne lokale Installation nutzbar sein.

<a id="ta-02"></a>

**TA-02**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Das System muss eine klare technische Trennung zwischen öffentlichem Bürgerbereich für Bürger (Eigentümer/Vermieter) und administrativem Bereich für Stadtverwaltung / Fachpersonal umsetzen.

<a id="ta-03"></a>

**TA-03**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Öffentliche Funktionen müssen ohne Authentifizierung nutzbar sein.

<a id="ta-04"></a>

**TA-04**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Administrative Funktionen müssen serverseitig geschützt und nur nach erfolgreicher Authentifizierung erreichbar sein.

---

<a id="2-frontend-auslieferung"></a>

## 2. Frontend & Auslieferung

<a id="ta-05"></a>

**TA-05**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Das Frontend muss vollständig als statische Webanwendung erzeugt werden.

<a id="ta-06"></a>

**TA-06**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Zur Erzeugung des statischen Frontends muss ein Static-Site-Generator eingesetzt werden.

<a id="ta-07"></a>

**TA-07**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Zur Laufzeit darf keine serverseitige Renderlogik erforderlich sein.

<a id="ta-08"></a>

**TA-08**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Das Frontend muss mindestens zwei klar getrennte UI-Bereiche bereitstellen:

- einen öffentlichen Bürger-Client
- einen administrativen Bereich für Stadtverwaltung / Fachpersonal

<a id="ta-09"></a>

**TA-09**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Der HTML-Code des administrativen Bereichs darf erst nach erfolgreicher Authentifizierung ausgeliefert werden.

---

<a id="3-3d-visualisierung-tiles"></a>

## 3. 3D-Visualisierung & Tiles

<a id="ta-10"></a>

**TA-10**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die 3D-Visualisierung muss auf dem Standard 3D Tiles basieren.

<a id="ta-11"></a>

**TA-11**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
3D Tiles müssen vollständig offline vorverarbeitet werden.

<a id="ta-12"></a>

**TA-12**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Solarpotenziale (PV) und Geothermiepotenziale müssen als statische Attribute direkt in den 3D Tiles abgelegt sein.

<a id="ta-13"></a>

**TA-13**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Zur Laufzeit dürfen keine Solar- oder Geothermiepotenziale berechnet werden.

> ⚠️ **Hinweis:** Solarthermie ist als zusätzliche Sanierungsmaßnahme vorgesehen, der finale technische Umfang für die MVP-Phase ist jedoch noch in Klärung.

<a id="ta-14"></a>

**TA-14**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
3D Tiles dürfen nicht vom Backend ausgeliefert werden.

<a id="ta-15"></a>

**TA-15**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
3D Tiles müssen über APISIX bereitgestellt werden, entweder per direktem HTTPS-Zugriff auf den externen Datendienst (S3-kompatibel) oder über ein dediziertes Tiles Gateway.

---

<a id="4-datenpipeline-offline"></a>

## 4. Datenpipeline (Offline)

<a id="ta-16"></a>

**TA-16**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Das System muss eine eigenständige Offline-Datenpipeline zur Verarbeitung von Geodaten unterstützen.

<a id="ta-17"></a>

**TA-17**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die Datenpipeline muss folgende Schritte abbilden können:

- Konvertierung von CityGML zu CityJSON
- Verarbeitung von Solar- und Geothermiedaten
- Anreicherung der Gebäudedaten mit Potenzialattributen
- Erzeugung von 3D Tiles

<a id="ta-18"></a>

**TA-18**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die Datenpipeline muss unabhängig vom Laufzeitsystem betreibbar sein.

---

<a id="5-berechnungskern"></a>

## 5. Berechnungskern

<a id="ta-19"></a>

**TA-19**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Der Berechnungskern muss als eigenständiges JavaScript-Modul implementiert sein.

<a id="ta-20"></a>

**TA-20**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Der Berechnungskern muss sowohl im Browser als auch in einer Node.js-Umgebung lauffähig sein.

<a id="ta-21"></a>

**TA-21**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die Berechnung muss vollständig clientseitig ausführbar sein.

<a id="ta-22"></a>

**TA-22**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Für die Durchführung einer Berechnung dürfen keine Nutzereingaben zwingend an den Server übertragen werden.

<a id="ta-23"></a>

**TA-23**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Eine serverseitige Ausführung der Berechnung darf optional für administrative oder technische Zwecke möglich sein.

---

<a id="6-datenschutz-privacy-by-design"></a>

## 6. Datenschutz & Privacy-by-Design

<a id="ta-24"></a>

**TA-24**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Das System muss eine datenschutzfreundliche Nutzung ohne Übertragung personenbezogener Nutzereingaben ermöglichen.

<a id="ta-25"></a>

**TA-25**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die Speicherung von Nutzereingaben muss optional und explizit durch den Nutzer ausgelöst werden.

<a id="ta-26"></a>

**TA-26**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Berechnung und Datenspeicherung müssen technisch voneinander entkoppelt sein.

---

<a id="7-konfigurationsmanagement"></a>

## 7. Konfigurationsmanagement

<a id="ta-27"></a>

**TA-27**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Berechnungsparameter müssen ohne Codeänderung anpassbar sein.

<a id="ta-28"></a>

**TA-28**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Berechnungskonfigurationen müssen versionierbar sein.

<a id="ta-29"></a>

**TA-29**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Jede Konfiguration muss eindeutig einer Version oder einem zeitlichen Gültigkeitsbereich zugeordnet sein.

<a id="ta-30"></a>

**TA-30**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Für den öffentlichen Bürger-Client muss eine veröffentlichte, versionierte Konfigurationsdatei bereitgestellt werden.

<a id="ta-31"></a>

**TA-31**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Berechnungsergebnisse müssen anhand der verwendeten Konfigurationsversion reproduzierbar sein.

---

<a id="8-backend-api"></a>

## 8. Backend & API

<a id="ta-32"></a>

**TA-32**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Das Backend muss Schnittstellen zur Verwaltung von Berechnungskonfigurationen bereitstellen.

<a id="ta-33"></a>

**TA-33**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Das Backend muss Schnittstellen zur optionalen Speicherung und Wiederherstellung von Nutzereingaben bereitstellen.

<a id="ta-34"></a>

**TA-34**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Das Backend muss administrative Funktionen zur Sichtung und Triage von Nutzereingaben unterstützen.

<a id="ta-35"></a>

**TA-35**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Öffentliche und administrative API-Endpunkte müssen technisch getrennt und unterschiedlich abgesichert sein.

---

<a id="9-persistenz-datenhaltung"></a>

## 9. Persistenz & Datenhaltung

<a id="ta-36"></a>

**TA-36**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Nutzereingaben müssen persistent in einer relationalen Datenbank gespeichert werden.

<a id="ta-37"></a>

**TA-37**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die Datenbank muss räumliche Erweiterungen für Geoabfragen unterstützen.

<a id="ta-38"></a>

**TA-38**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Statische Potenzialdaten dürfen nicht in der Datenbank gespeichert werden.

<a id="ta-39"></a>

**TA-39**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Konfigurationsdaten müssen in der Datenbank als zentrale Quelle gepflegt werden.

---

<a id="10-betrieb-qualitaet"></a>

## 10. Betrieb & Qualität

<a id="ta-40"></a>

**TA-40**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Das System muss für eine spike-basierte Nutzung mit mehreren tausend parallelen Nutzern ausgelegt sein.

<a id="ta-41"></a>

**TA-41**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Das System muss Mechanismen zur Beobachtbarkeit wie Logging, Metriken und Tracing unterstützen.

<a id="ta-42"></a>

**TA-42**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Das System muss containerisierbar sein und in einer orchestrierten Umgebung betrieben werden können.

---

<a id="11-konfigurations-publishing"></a>

## 11. Konfigurations-Publishing

<a id="ta-43"></a>

**TA-43**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Konfigurationen müssen in der Datenbank als **Source of Truth** gepflegt und versioniert werden.

<a id="ta-44"></a>

**TA-44**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Für jede veröffentlichte Konfiguration muss ein JSON-Snapshot erzeugt und als Datei exportiert werden.

<a id="ta-45"></a>

**TA-45**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Der Berechnungskern muss die veröffentlichte JSON-Konfiguration lesen können, ohne direkten Datenbankzugriff.

<a id="ta-46"></a>

**TA-46**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Veröffentlichte Konfigurationen müssen unveränderlich sein; Änderungen erfordern eine neue Version.

---

<a id="12-oeffentliche-uebermittlung-verifikation"></a>

## 12. Öffentliche Übermittlung & Verifikation

<a id="ta-47"></a>

**TA-47**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Der öffentliche Bürger-Client muss Berechnungsergebnisse **inklusive Eingaben** an das Backend übermitteln können.

<a id="ta-48"></a>

**TA-48**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Das Backend muss Eingaben gegen **konfigurierbare Wertebereiche** validieren (z.B. min/max).

<a id="ta-49"></a>

**TA-49**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Das Backend muss Ergebnisse serverseitig mit dem gleichen Berechnungskern neu berechnen.

<a id="ta-50"></a>

**TA-50**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Nur verifizierte und triagierte Ergebnisse dürfen für die Gebäude-Indexierung und interne Freigaben verwendet werden.

<a id="ta-51"></a>

**TA-51**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Öffentliche Schreibzugriffe müssen durch Altcha-Challenges und Rate Limiting geschützt werden.
Altcha ist eine selbsthostbare, datenschutzfreundliche Challenge; der Backend-Service prüft das übermittelte Token.

---

<a id="13-offline-pipeline-betrieb-airflow"></a>

## 13. Offline-Pipeline-Betrieb (Airflow)

<a id="ta-52"></a>

**TA-52**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die Offline-Datenpipeline muss in CIVITAS/CORE über Airflow orchestriert werden; DAG-Läufe werden ausschließlich manuell über die Airflow-Oberfläche gestartet.

<a id="ta-53"></a>

**TA-53**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die Konvertierung (CityGML → CityJSON → 3D Tiles) und die Attributanreicherung (Solar/Geothermie) müssen als getrennte Verarbeitungsschritte in separaten Containern ausgeführt werden.

<a id="ta-54"></a>

**TA-54**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Jeder Pipeline-Lauf muss eine von Airflow vorgegebene `job_id` verwenden und alle Artefakte unter einem dedizierten Job-Ordner im S3-kompatiblen Datendienst ablegen.

<a id="ta-55"></a>

**TA-55**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die Pipeline muss als Eingabe einen CityGML-Ordner, einen EPSG-Code, ein `appearance`-Theme sowie `hasAlphaChannel` entgegennehmen.

<a id="ta-56"></a>

**TA-56**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die Pipeline muss einen Laufstatus über ein `manifest.json` je `job_id` dokumentieren und strukturierte Fortschrittslogs bereitstellen.

<a id="ta-57"></a>

**TA-57**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Bei Teilfehlern darf kein Teilergebnis als gültig markiert werden; fehlerhafte Läufe gelten als verworfen und müssen vollständig neu gestartet werden.

---

<a id="14-sicherheit-security-by-design"></a>

## 14. Sicherheit (Security by Design)

<a id="ta-58"></a>

**TA-58**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Das System muss Prinzipien von Security by Design umsetzen (Least Privilege, Secure Defaults, Defense in Depth).

<a id="ta-59"></a>

**TA-59**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Alle externen Zugriffe müssen authentifiziert und autorisiert sein; Zugriffstoken dürfen nicht im Code abgelegt werden.

<a id="ta-60"></a>

**TA-60**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Secrets müssen ausschließlich über Secrets-Management bereitgestellt werden.

<a id="ta-61"></a>

**TA-61**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die Datenübertragung muss verschlüsselt erfolgen (TLS).

<a id="ta-62"></a>

**TA-62**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Eingaben müssen serverseitig validiert werden; fehlerhafte Eingaben sind zu protokollieren.

<a id="ta-63"></a>

**TA-63**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Security-relevante Events müssen auditierbar geloggt werden.

<a id="ta-64"></a>

**TA-64**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Container müssen mit minimalen Rechten laufen (Non-Root, minimale Capabilities).

---

<a id="15-datenschutz-consent-tracking"></a>

## 15. Datenschutz, Consent & Tracking

<a id="ta-65"></a>

**TA-65**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Der Bürgerbereich darf keine Registrierung erfordern; der Bearbeitungszustand muss über Local Storage persistiert werden, damit Wiederbesuche ohne erneute Eingabe möglich sind.

<a id="ta-66"></a>

**TA-66**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Lokale Speicherung im Browser (Local Storage) ist zulässig, darf aber keine personenbezogene Vorbefüllung für neue Nutzer erzeugen; Nutzerdaten dürfen nicht zwischen Bürgern geteilt werden.

<a id="ta-67"></a>

**TA-67**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System muss ein Consent-Management für optionale Tracking- und Drittanbieter-Funktionen bereitstellen und nachträgliche Änderungen erlauben; notwendige lokale Browser-Speicherung ist davon getrennt zu behandeln.

<a id="ta-68"></a>

**TA-68**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Tracking und Analyse von Klickpfaden oder Nutzungsverhalten dürfen nur als Opt-in erfolgen.

<a id="ta-69"></a>

**TA-69**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Die Oberfläche muss barrierefrei gemäß § 4 BGG konzipiert sein und die Anforderungen der BITV 2.0 erfüllen (u.a. Screenreader, Alternativtexte, Kontrast, Tastaturbedienbarkeit).

---

<a id="16-observability-logging"></a>

## 16. Observability & Logging

<a id="ta-70"></a>

**TA-70**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Logs müssen Nutzeraktionen, Systemprozesse und Fehlerereignisse mit Zeitstempeln protokollieren, maschinenlesbar sein und Standard-Log-Levels (DEBUG, INFO, WARN, ERROR, FATAL) verwenden; Log-Level müssen zur Laufzeit dynamisch anpassbar sein. Containerisierte Komponenten schreiben standardmäßig auf `stdout`/`stderr`, sodass die zentrale Einsammlung über Kubernetes-Log-Pipelines (z.B. Promtail oder Grafana Alloy) erfolgen kann.

---

<a id="17-sicherheit-sdlc"></a>

## 17. Sicherheit & SDLC

<a id="ta-71"></a>

**TA-71**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Secure Development Lifecycle nach OWASP-Praktiken, Code-Reviews, Security-Scanning und Patch-Management sind verpflichtend; vor Go-Live ist ein Penetrationstest durchzuführen. Ergänzend müssen Programmdokumentation, Inline-Dokumentation sowie Architektur-, ER- und Datenflussmodell fortlaufend gepflegt und bereitgestellt werden.

---

<a id="18-integration-civitas-core"></a>

## 18. Integration (CIVITAS/CORE)

<a id="ta-72"></a>

**TA-72**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die Integration in CIVITAS/CORE muss über standardisierte, dokumentierte Schnittstellen erfolgen; IAM erfolgt über Keycloak (OIDC) und API-Management über APISIX. Verbindlich sind offene APIs (z.B. OpenAPI 3.x, OGC API Features, REST/MQTT/OGC-Dienste). Eine Umsetzung von Smart Data Models und NGSI-LD ist für den DEZ nicht geplant (aufgrund des bereits entwickelten Umfangs des Rechenkerns und Unsicherheiten bei FIWARE); City Energy ADE ist derzeit nicht vorgesehen (Kompatibilität zu CityGML 3.x aktuell nicht gegeben), und SensorThingsAPI wird in diesem Kontext nicht verwendet. Eine optionale Implementierung kann im Projektverlauf neu bewertet werden. Zusätzliche Datensenken sind zu vermeiden.

---

<a id="19-performance-skalierung"></a>

## 19. Performance & Skalierung

<a id="ta-73"></a>

**TA-73**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Das System muss Caching für häufig genutzte Daten/Visualisierungen unterstützen und für horizontale sowie vertikale Skalierung vorbereitet sein; Monitoring umfasst Ladezeiten, CPU, RAM und I/O.

---

<a id="20-rechenmethoden-nachweise"></a>

## 20. Rechenmethoden & Nachweise

<a id="ta-74"></a>

**TA-74**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Berechnungen müssen auf anerkannten Normen, Richtlinien und Katalogen basieren (u.a. DIN 4108, DIN 4701, DIN V 18599, VDI 2067, VDI 3807, IWU-Gebäudetypologien, BKI-Kostenplaner).

<a id="ta-75"></a>

**TA-75**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
In der Projektdokumentation sind konkrete Nachweise der verwendeten Rechenmethoden zu liefern (inkl. Seitenzahl, Tabellen-/Zeilennummern und spezifische Formelverweise).

---

<a id="21-datenloeschung-sitzungen"></a>

## 21. Datenlöschung & Sitzungen

<a id="ta-76"></a>

**TA-76**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Wenn Nutzereingaben oder Ergebnisse gespeichert wurden, muss ein Löschprozess bereitgestellt werden (z.B. über Link/QR im PDF), der eine eindeutige Identifikation des Datensatzes ermöglicht.

<a id="ta-77"></a>

**TA-77**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Der Löschprozess muss eine einfache, zweistufige Verifikation unterstützen (z.B. Adressabgleich + zusätzlicher Bestätigungsschritt), um ungewollte Löschungen zu vermeiden.

<a id="ta-78"></a>

**TA-78**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Sitzungsdaten müssen ohne Registrierung nutzbar sein; Abbruch und Wiederaufnahme über Wiederbesuche hinweg müssen über Local Storage unterstützt werden. Eine serverseitige Wiederherstellung darf nur bereitgestellt werden, wenn der Nutzer die Speicherung explizit ausgelöst hat.

<a id="ta-79"></a>

**TA-79**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Die notwendige lokale Browser-Speicherung zur Zustandswiederherstellung muss transparent ausgewiesen werden; der Consent-Status (Datenschutz/Tracking) muss als technische Voraussetzung für optionale serverseitige Speicherung und Tracking geprüft und revisionssicher protokolliert werden.

---

<a id="22-admin-triage-audit"></a>

## 22. Admin-Triage & Audit

<a id="ta-80"></a>

**TA-80**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Jeder Nutzerdatensatz muss einen Status tragen (neu, in Prüfung, freigegeben, unplausibel) und die Statusänderung muss mit Zeitstempel und Benutzerkennung im Audit-Log protokolliert werden.

<a id="ta-81"></a>

**TA-81**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Der Admin-Bereich muss eine gruppierte Ansicht pro Gebäude bereitstellen, inkl. Vergleich mehrerer Datensätze.

<a id="ta-82"></a>

**TA-82**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Exporte für Verwaltung/Wärmeplanung müssen mindestens als JSON und CSV bereitgestellt werden und Filterkriterien berücksichtigen.

<a id="ta-83"></a>

**TA-83**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Statuswechsel sind nur entlang des definierten Triage-Lifecycles zulässig: neu → in Prüfung → freigegeben oder unplausibel.

---

<a id="23-eingabetiefe-live-berechnung"></a>

## 23. Eingabetiefe & Live-Berechnung

<a id="ta-84"></a>

**TA-84**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Der Berechnungskern muss ein kontinuierliches Eingabetiefe-Spektrum unterstützen; am unteren Ende basiert die Berechnung ausschließlich auf LOD2, Baualtersklassen und Standardannahmen.

<a id="ta-85"></a>

**TA-85**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Am oberen Ende des Spektrums müssen Szenario-Berechnungen für Einzelmaßnahmen und Kombinationen unterstützt und die Ergebnisse vergleichbar bereitgestellt werden (vorher/nachher).

<a id="ta-86"></a>

**TA-86**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
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

Quelle: `20260320_RDEZ_Uebersicht_Berechnung_Grobkonzept.xlsx`

Die aktualisierte Arbeitsmappe beschreibt weiterhin keine festen technischen Betriebsmodi, sondern die beiden Referenz-Enden eines kontinuierlichen Eingabetiefe-Spektrums:

- **Datenstufe 1** ist technisch als Vollautomatikfall ohne Nutzereingabe umzusetzen.
- **Datenstufe 2** ist technisch als Fall vollständiger Überschreibbarkeit aller dafür freigegebenen Eingabewerte umzusetzen.
- Zwischenstände sind als kontinuierliche Kombination beider Enden abzubilden; ein starres Stufenschema im UI, in der API oder im Persistenzmodell ist nicht vorzusehen.

Technische Konsequenzen:

- Das System muss pro fachlich relevantem Eingabewert zwischen automatisch abgeleitetem Basiswert, optionalem Nutzerwert und tatsächlich verwendetem Berechnungswert unterscheiden können.
- Für jeden überschreibbaren Wert muss Herkunft und Bearbeitungsstatus nachvollziehbar sein.
- Die Menge der freigegebenen, überschreibbaren Werte ist fachlich definiert und darf nicht mit allen internen Rechengrößen gleichgesetzt werden.

| Domäne           | Muss in Datenstufe 1 automatisiert belegt werden                       | Muss in Datenstufe 2 manuell überschreibbar sein                       |
| ---------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Dach/Dachfenster | Flächen aus LOD, U-Werte aus Baujahr/Baualtersklasse, Standardfaktoren | Flächen, U-Werte, Konstruktion/Schichtannahmen                         |
| OGD/AW/UGD       | Flächen und U-Werte aus LOD + Katalogwerten                            | Flächen, U-Werte, Konstruktionsdetails und Materialannahmen            |
| Fenster/Türen    | Standardflächenanteile und U-Werte aus Baualter/Katalog                | Flächen, Rahmen-/Verglasungsparameter, U-Werte                         |
| Heizung/Anlage   | Vorbelegung aus Baujahr, Energieträger- und Erzeugerkatalog            | Systemart, Erzeugerart, Heizflächenart, Heizkreistemperatur, Regelung, Zusatzheizung, Brennstofflager-/Umbaukontext, Preis- und Faktorparameter |

Die aktualisierte Arbeitsmappe präzisiert zusätzlich die technische Breite der Anlageneingaben sowie die zu persistierenden Ergebnisdimensionen. Neben Heizwärmebedarf sind Endenergie, Primärenergie, CO₂, Brennstoffverbrauch und Brennstoffkosten als getrennte Ergebnisfelder vorzusehen.

### Offene technische Klärungspunkte aus dem Grobkonzept

Die folgenden Punkte sind vor produktiver Übernahme als technische Spezifikation zu konkretisieren:

- Kostenlogik ist in mehreren Blättern nur als Platzhalter gekennzeichnet und hat noch keine belastbare Felddefinition.
- Einzelne Beispiel-/Templatewerte (`0`, `#`) dürfen nicht als produktive Defaults interpretiert werden.
- Die fachliche Herleitung und Geltung von Korrekturfaktoren `F` je Bauteil ist unvollständig dokumentiert.
- Es liegt nun eine erste beispielhafte Maßnahmenmatrix für Heizungsfälle vor; für die produktive Übernahme fehlt jedoch weiterhin eine vollständige, maschinenlesbare Entscheidungslogik.
- Die neue Arbeitsmappe führt mit `Grobkonzept` und `Berechnungen` zusätzliche Strukturblätter ein; deren Verhältnis zu Persistenzmodell, API-Vertrag und Konfigurationsmodell ist vor produktiver Umsetzung verbindlich zu präzisieren.
- Beispiel- und Templatewerte aus der Arbeitsmappe dürfen nicht ungeprüft als technische Defaults in Persistenz, API oder Konfiguration übernommen werden.
- Kataloginhalte im Blatt `Kat. 2 Heizung` enthalten uneinheitliche Bezeichner/Sonderzeichen und benötigen eine formale Bereinigung vor Import in Konfigurationsdaten.

---

<a id="24-open-source-foerderkulisse"></a>

## 24. Open Source & Förderkulisse

<a id="ta-87"></a>

**TA-87**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die Lösung muss Open Source sein und als finales Release über OpenCoDE veröffentlicht werden; Zwischenstände oder Beta-Versionen dürfen dort nicht bereitgestellt werden.

<a id="ta-88"></a>

**TA-88**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die für OpenCoDE geforderten Qualitätskriterien müssen erfüllt werden, einschließlich: werthaltige Projektbeschreibung, benannte verantwortliche Person, CVE-Management für Abhängigkeiten, automatisierte Tests, Bug- und Security-Kontaktstellen, SBOM sowie Release Notes.

<a id="ta-89"></a>

**TA-89**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Das Repository muss die für OpenCoDE erforderlichen Dateien enthalten (u.a. `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `LICENSE`, `README.md`, `SECURITY.md`, `publiccode.yml`). Jede Datei muss einen Urheberrechtsvermerk, eine Lizenzbezeichnung und einen SPDX-Identifier enthalten.

<a id="ta-90"></a>

**TA-90**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die Open-Source-Lizenz ist in Abstimmung mit dem Auftraggeber auszuwählen (permissiv vs. Copyleft). Lizenz-Compliance ist sicherzustellen; die Nutzung von CLA und/oder DCO ist vorzusehen.

<a id="ta-91"></a>

**TA-91**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Die Dokumentation muss Wiederverwendbarkeit sicherstellen und mindestens Installationsanleitung, Schnittstellenbeschreibung sowie Benutzer- und Administrationshandbuch umfassen; die Open-Source-Guidelines der Förderkulisse sind einzuhalten.

<a id="ta-92"></a>

**TA-92**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Vendor-Lock-in ist zu vermeiden: Die Codebase muss portabel, frei von proprietären Geheimnissen und ohne nicht-offene Abhängigkeiten bereitgestellt werden.

<a id="ta-93"></a>

**TA-93**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Code mit Datentausch-Funktionalität muss öffentliche Standards für den Austausch verwenden; eine Liste aller verwendeten Standards ist innerhalb der Codebase zu pflegen.

<a id="ta-94"></a>

**TA-94**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Der Beitragungs- und Release-Prozess muss Security-Grundsätze berücksichtigen (z.B. Secret-Scanning, gesicherte Release-Pfade, Vieraugenprinzip).

<a id="ta-95"></a>

**TA-95**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Falls flurstücksbezogene Geothermiepotenziale nicht rechtzeitig verfügbar sind, müssen diese aus den verfügbaren Daten nach dem LfU/TUM-Vorgehen selbst berechnet werden; der Fallback ist in der Pipeline zu berücksichtigen.

---

<a id="25-bsi-grundschutz-bezug"></a>

## 25. BSI Grundschutz Bezug

<a id="ta-96"></a>

**TA-96**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
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

<a id="ta-97"></a>

**TA-97**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Solarthermie muss technisch als optionale Sanierungsmaßnahme zur Unterstützung der Warmwasserbereitung in Kombination mit der bestehenden Heizung modellierbar sein.

<a id="ta-98"></a>

**TA-98**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Der konkrete Umsetzungsumfang bezüglich Solarthermie muss für die MVP-Phase vor Implementierungsstart verbindlich festgelegt werden.

<a id="ta-99"></a>

**TA-99**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Für PV müssen zwei getrennte Berechnungspfade unterstützt werden:

- Darstellung 1: Dimensionierung von PV-Anlage und Speicher für den Betrieb einer Wärmepumpe inkl. energetischer und finanzieller Effekte.
- Darstellung 2: Maximale Ausnutzung der für PV geeigneten Flächen inkl. Kommunikation der Potenziale für Haushaltsstrom, KFZ-Ladung oder vergleichbare Verbräuche.

<a id="ta-100"></a>

**TA-100**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Die Geothermie-Einschätzung muss technisch in einer festen Prioritätsreihenfolge erfolgen: Grundwasser, Erdreich, Luft.

<a id="ta-101"></a>

**TA-101**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Bis zur Bereitstellung eines belastbaren Geothermie-Datensatzes ist die Geothermie-Bewertung als vorläufig zu kennzeichnen; der produktive Einsatz im MVP bleibt bis zur Klärung offen.

---

<a id="27-civitas-core-integration-praezisierungen"></a>

## 27. CIVITAS/CORE-Integration (Präzisierungen)

<a id="ta-102"></a>

**TA-102**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Alle externen Datenzugriffe (API, veröffentlichte Konfigurations-Snapshots, 3D Tiles) müssen ausschließlich über APISIX erfolgen; direkte öffentliche Zugriffe auf interne Dienste sind unzulässig.

<a id="ta-103"></a>

**TA-103**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Der Verarbeitungsschritt `CityGML → CityJSON → 3D Tiles` muss als eigenständiges, CIVITAS/CORE-fähiges Add-on bereitgestellt werden.

<a id="ta-104"></a>

**TA-104**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Add-ons müssen die konfigurationsbasierte Aktivierung und Deaktivierung einzelner Dienste oder Teilkomponenten unterstützen, sofern diese fachlich sinnvoll entkoppelbar sind.

<a id="ta-105"></a>

**TA-105**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Für die Bereitstellung von 3D Tiles müssen zwei Betriebsmodi unterstützt werden:

- direkter Zugriff auf den externen S3-kompatiblen Datendienst hinter APISIX
- Zugriff über ein optionales Tiles Gateway hinter APISIX

<a id="ta-106"></a>

**TA-106**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Der Aufruf der DEZ-Plattform aus dem MasterPortal muss technisch verbindlich über einen konfigurierbaren Link-Out unterstützt werden; eine tiefe UI-Einbettung in das MasterPortal ist dafür nicht zwingend erforderlich.

> **Begründung (technisch):** Der Link-Out ermöglicht eine performante, statische DEZ-Auslieferung, höhere Entkopplung im Betrieb (Verfügbarkeit/Release-Zyklus), DEZ-spezifische Consent-/Tracking-Logik sowie bessere Skalierbarkeit für die Nachnutzung in weiteren Kommunen.

<a id="ta-107"></a>

**TA-107**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Die Gebäudeeinfärbung im öffentlichen 3D-Client ist verpflichtend umzusetzen und muss über Cesium Tileset Styles (z.B. `Cesium3DTileStyle`) auf Basis der Effizienzklassen bzw. Ergebnisattribute steuerbar sein.

---

<a id="28-api-client-generierung"></a>

## 28. API-Client-Generierung

<a id="ta-108"></a>

**TA-108**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Das Backend muss eine OpenAPI-3.0-Spezifikation als Source of Truth bereitstellen; die Spezifikation wird über die bestehenden Fastify-toab/OpenAPI-Mechanismen erzeugt.

<a id="ta-109"></a>

**TA-109**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Der Frontend-API-Client muss aus der OpenAPI-3.0-Spezifikation mit `@hey-api/openapi-ts` generiert werden.

<a id="ta-110"></a>

**TA-110**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Für den generierten Frontend-API-Client muss die React-Query-Erweiterung von `@hey-api/openapi-ts` genutzt werden, um typsichere Query- und Mutation-Hooks bereitzustellen.

<a id="ta-111"></a>

**TA-111**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Im Frontend-Repository muss die Generator-Konfiguration zentral in `openapi-ts.config.ts` gepflegt werden.

<a id="ta-112"></a>

**TA-112**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Als Eingabe für die Client-Generierung muss eine versionierte OpenAPI-Spezifikation im Pfad `openapi/openapi.json` verwendet werden.

<a id="ta-113"></a>

**TA-113**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Der generierte API-Client-Code muss im Pfad `src/shared/api/generated/` abgelegt werden; manuelle Änderungen in generierten Dateien sind unzulässig.

<a id="ta-114"></a>

**TA-114**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Für die Generierung und Konsistenzprüfung müssen standardisierte Skripte bereitgestellt werden:

- `openapi:generate` zur Neugenerierung
- `openapi:check` zur Prüfung, dass kein ungeprüfter Generierungs-Diff vorliegt

<a id="ta-115"></a>

**TA-115**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Query- und Mutation-Nutzung im Frontend muss über den generierten React-Query-Layer erfolgen; direkte, untypisierte HTTP-Aufrufe für API-Endpunkte sind zu vermeiden.

---

<a id="29-aktualisierung-der-basisdaten"></a>

## 29. Aktualisierung der Basisdaten

<a id="ta-116"></a>

**TA-116**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Der LOD2-Basisdatensatz muss mit einem Zielzyklus von zwei Jahren aktualisiert werden können.

<a id="ta-117"></a>

**TA-117**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Solarpotenzial- und Geothermie-Basisdaten müssen unabhängig vom LOD2-Zyklus mit jeweils eigenen Aktualisierungszeiträumen aktualisierbar sein.

<a id="ta-118"></a>

**TA-118**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Die Offline-Pipeline muss vollständig optionale, getrennte Aktualisierungsruns je Datendomäne unterstützen (mindestens: `lod2`, `solar`, `geothermie`, `full`).

<a id="ta-119"></a>

**TA-119**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Ein Aktualisierungsrun einer Datendomäne darf keine obligatorische Neuberechnung oder Neuveröffentlichung nicht betroffener Datendomänen erzwingen.

<a id="ta-120"></a>

**TA-120**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Für die Nachnutzung durch andere Kommunen muss die Pipeline so ausgelegt sein, dass Aktualisierungen je Datenquelle unabhängig voneinander konfiguriert, gestartet und validiert werden können.

---

<a id="30-nachnutzung-und-white-labeling"></a>

## 30. Nachnutzung und White-Labeling

<a id="ta-121"></a>

**TA-121**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System muss ein konfigurierbares Kommunenprofil unterstützen, in dem mindestens Branding, Basemap-Quellen, Datenquellen-Endpunkte, Default-Parameter und Textbausteine kommunenspezifisch gepflegt werden können.

<a id="ta-122"></a>

**TA-122**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Regensburg-spezifische Inhalte dürfen nicht hartcodiert in Kernkomponenten liegen, sondern müssen über das Kommunenprofil oder über austauschbare Konfigurationspakete gekapselt sein.

<a id="ta-123"></a>

**TA-123**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Für die Offline-Datenpipeline muss ein kanonisches Zielschema für Gebäude-, Potenzial- und Adressattribute definiert werden, auf das kommunenspezifische Quellschemata gemappt werden.

<a id="ta-124"></a>

**TA-124**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Für jede angebundene Kommune muss ein versioniertes Mapping-Profil (Quelle -> kanonisches Schema) vorliegen, inklusive Feldzuordnung, Einheiten, Transformationsregeln und Fallback-Strategien.

<a id="ta-125"></a>

**TA-125**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
CityGML Energy ADE muss als optionaler Eingabestandard unterstützt werden. Wenn Energy-ADE-Daten vorliegen, müssen diese vorrangig über das Mapping-Profil in das kanonische Schema überführt werden können.

<a id="ta-126"></a>

**TA-126**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Wenn keine Energy-ADE-Daten vorliegen, muss das System über definierte Fallback-Pfade (z.B. LOD2-Basisattribute, externe Potenzialdaten, Konfigurationswerte) weiterhin lauffähig sein.

<a id="ta-127"></a>

**TA-127**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Mapping-Ergebnisse müssen pro Attribut eine Herkunftskennzeichnung (Quelle, Transformationsregel, Mapping-Version) bereitstellen, damit Nachvollziehbarkeit und kommunenübergreifende Vergleichbarkeit sichergestellt sind.

<a id="ta-128"></a>

**TA-128**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Mapping-Profile und Kommunenprofile müssen unabhängig voneinander versioniert, getestet und ausgerollt werden können, ohne die Kernlogik des Berechnungskerns zu ändern.

---

<a id="31-festlegung-nutzungsdaten-und-tracking"></a>

## 31. Festlegung: Nutzungsdaten und Tracking

<a id="ta-129"></a>

**TA-129**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Für Nutzungsanalysen ist Matomo verbindlich als Analytics-Lösung einzusetzen.

<a id="ta-130"></a>

**TA-130**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Analytics-Skripte und Tracking-Endpunkte dürfen erst nach gültigem Opt-in aktiviert werden.

<a id="ta-131"></a>

**TA-131**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Vor produktiver Aktivierung von Analytics müssen Eventkatalog, Zweckbindung, Aufbewahrungsfristen, Anonymisierungsregeln, Löschkonzept und Rollen-/Rechtekonzept verbindlich dokumentiert und freigegeben sein.

<a id="ta-132"></a>

**TA-132**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Tracking-Funktionen müssen ohne gültiges Opt-in standardmäßig deaktiviert bleiben.

---

<a id="32-single-point-of-truth-fuer-basisdaten"></a>

## 32. Single Point of Truth für Basisdaten

**Hinweis (SoT):** Für Basisdaten bedeutet Single Point of Truth die eindeutige Kombination aus **Quell-Datensatzversion**, **Mapping-Profil-Version** und **veröffentlichtem Release-Manifest**.

<a id="ta-133"></a>

**TA-133**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Basisdaten müssen je Kommune über einen versionierten Quellnachweis (Datensatz-ID, Quelle, Zeitpunkt, Prüfsumme, EPSG) geführt werden.

<a id="ta-134"></a>

**TA-134**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Die Transformation von LOD2- und Ergänzungsdaten in 3D Tiles muss ausschließlich über ein versioniertes Mapping-Profil erfolgen.

<a id="ta-135"></a>

**TA-135**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Für die Laufzeit muss je Kommune ein veröffentlichtes Release-Manifest den aktiven Stand der Basisdaten eindeutig festlegen.

<a id="ta-136"></a>

**TA-136**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Jeder abgeleitete Basisdatenwert in 3D Tiles muss provenance-fähig auf Quellversion, Mapping-Version und Transformationszeitpunkt rückführbar sein.

<a id="ta-137"></a>

**TA-137**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Teil-Updates dürfen nur den betroffenen Daten-Scope neu veröffentlichen; der aktive Stand nicht betroffener Scopes muss unverändert gültig bleiben.

<a id="ta-138"></a>

**TA-138**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Eine DEZ-Instanz muss genau eine Kommune bedienen; Nachnutzung für weitere Kommunen erfolgt über getrennte Deployments und nicht über gleichzeitige Mehrkommunen-Nutzung innerhalb derselben Instanz.

---

<a id="33-datenquellen-metadaten"></a>

## 33. Datenquellen-Metadaten

Generelle Bemerkung:
Die hier geführten Metadaten sind auf **DCAT-AP.de** gemappt, bilden den Standard jedoch bewusst **nicht vollständig** ab.
Sie definieren für DEZ nur den verbindlichen Mindestumfang je Datenquelle bzw. je bereitgestellter Distribution.

<a id="ta-139"></a>

**TA-139**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Für jede in der DEZ verwendete Datenquelle müssen verbindlich mindestens die Metadaten `dct:title`, `dct:description`, `dct:publisher`, `dct:license`, `dct:accrualPeriodicity` sowie `dcat:distribution` ausgewiesen werden. `dct:license` kann dabei auf Dataset- und/oder Distribution-Ebene geführt werden. `dcat:distribution` ist als Klasse zu verstehen, deren konkrete Attribute von der Bereitstellungsform abhängen (z.B. API oder Datei).

<a id="ta-140"></a>

**TA-140**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Die Metadaten `dct:title`, `dct:description`, `dct:publisher`, `dct:license`, `dct:accrualPeriodicity` sowie die je `dcat:distribution` relevanten Bereitstellungsattribute müssen für die in DEZ verwendeten Datenquellen in den Datenschutzhinweisen der DEZ-Webseite transparent ausgewiesen werden.

<a id="ta-141"></a>

**TA-141**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Die Verantwortung für Bereitstellung und Pflege dieser Metadaten sowie der distributionsspezifischen Angaben liegt beim jeweiligen Betreiber der DEZ-Plattform.

---

<a id="34-abnahmeprozess-und-ansprechpartner"></a>

## 34. Abnahmeprozess und Ansprechpartner

<a id="ta-142"></a>

**TA-142**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Für den Abnahmeprozess sind bei der Stadt Regensburg jeweils ein fachlicher und ein technischer Ansprechpartner verbindlich benannt.

---

<a id="abgrenzung"></a>

## Abgrenzung

Dieses Dokument beschreibt **was technisch erforderlich ist**, nicht jedoch die konkrete Implementierung.  
Details zur Architektur, zu Komponenten und Datenflüssen werden in den Architekturkapiteln beschrieben.
