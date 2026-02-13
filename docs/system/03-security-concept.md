# Sicherheitskonzept

Dieses Kapitel beschreibt das Sicherheitskonzept des Digitaler Energie Zwilling (DEZ) als technische Leitlinie für Planung, Umsetzung und Betrieb. Es konkretisiert die Anforderungen aus den technischen Anforderungen und verankert die Orientierung am BSI IT-Grundschutz.

---

## Inhaltsverzeichnis

1. [Ziele](#ziele)
2. [Geltungsbereich](#geltungsbereich)
3. [BSI-Grundschutz-Bezug (Auswahl)](#bsi-grundschutz-bezug-auswahl)
4. [Mapping: Baustein DEZ-Maßnahmen (Kurzfassung)](#mapping-baustein-dez-massnahmen-kurzfassung)
5. [Sicherheitsprinzipien](#sicherheitsprinzipien)
6. [Identität, Zugriff und Rollen](#identitaet-zugriff-und-rollen)
7. [Daten- und Datenschutzkonzept](#daten-und-datenschutzkonzept)
8. [Netzwerk- und Plattformschutz](#netzwerk-und-plattformschutz)
9. [Systemhärtung](#systemhaertung)
10. [Logging, Monitoring und Nachvollziehbarkeit](#logging-monitoring-und-nachvollziehbarkeit)
11. [Lieferkette und Open Source](#lieferkette-und-open-source)
12. [Prüfungen und Tests](#pruefungen-und-tests)
13. [Betrieb und Incident-Handling](#betrieb-und-incident-handling)

<a id="ziele"></a>

## Ziele

- Vertraulichkeit, Integrität und Verfügbarkeit der Systeme und Daten sicherstellen.
- Missbrauch öffentlicher Endpunkte verhindern und administrative Zugriffe schützen.
- Datenschutzfreundliche Nutzung ohne Zwang zur Speicherung persönlicher Daten.

---

<a id="geltungsbereich"></a>

## Geltungsbereich

- Öffentlicher Bürger-Client (statische Auslieferung).
- Administrativer Client (geschützter Bereich).
- Backend-API, Datenbank, Konfigurations-Publishing.
- Offline-Datenpipeline (Airflow, Container, externer Datendienst).
- Tiles Gateway und 3D Tiles Storage.

---

<a id="bsi-grundschutz-bezug-auswahl"></a>

## BSI-Grundschutz-Bezug (Auswahl)

- APP.3.1 Webanwendungen und Webservices.
- APP.3.2 Webserver.
- APP.4.3 Relationale Datenbanksysteme.
- SYS.1.1 Allgemeiner Server.
- NET.1.1 Netzarchitektur und -design.
- NET.3.1 Netzkomponenten.
- OPS.1.1.3 Patch- und Änderungsmanagement.
- CON.8 Software-Entwicklung.

---

<a id="mapping-baustein-dez-massnahmen-kurzfassung"></a>

## Mapping: Baustein DEZ-Maßnahmen (Kurzfassung)

- **APP.3.1 Webanwendungen und Webservices**: Trennung öffentlicher/administrativer Funktionen, serverseitige Validierung, Rate Limiting und Challenge für öffentliche Writes.
- **APP.3.2 Webserver**: Härtung der Auslieferung, TLS erzwingen, minimale Angriffsfläche, keine serverseitige Renderlogik im öffentlichen Client.
- **APP.4.3 Relationale Datenbanksysteme**: Zugriff nur über Backend, rollenbasierte Zugriffe, Audit-Logs für Admin-Aktionen.
- **SYS.1.1 Allgemeiner Server**: Container mit Non-Root, minimale Capabilities, Patch-Management, Secrets-Management.
- **NET.1.1 Netzarchitektur und -design**: Backend nicht direkt aus dem Internet erreichbar, Zugriff über API-Management/Reverse Proxy, Netzwerksegmentierung.
- **NET.3.1 Netzkomponenten**: Standardisierte Schnittstellen, klare Netzgrenzen, Monitoring der Schnittstellen.
- **OPS.1.1.3 Patch- und Änderungsmanagement**: Regelmäßige Updates, dokumentierte Änderungen, Rollback-Strategien.
- **CON.8 Software-Entwicklung**: SDLC nach OWASP, Code-Reviews, Security-Scanning, Penetrationstest vor Go-Live.

---

<a id="sicherheitsprinzipien"></a>

## Sicherheitsprinzipien

- Least Privilege und minimal notwendige Berechtigungen.
- Secure Defaults und Defense in Depth.
- Trennung öffentlicher und administrativer Funktionen.
- Konfigurations- und Datenhoheit über versionierte Freigaben.

---

<a id="identitaet-zugriff-und-rollen"></a>

## Identität, Zugriff und Rollen

- Admin-Zugriff ausschließlich über OIDC (Keycloak).
- Rollenbasierte Freigaben für Systempflege und Triage.
- Öffentliche Schreibzugriffe nur mit Schutzmechanismen (Altcha, Rate Limiting).

---

<a id="daten-und-datenschutzkonzept"></a>

## Daten- und Datenschutzkonzept

- Keine personenbezogene Pflichtdatenerfassung im Bürgerbereich.
- Optionale Übermittlung von Eingaben, stets explizit ausgelöst.
- Notwendiger Cookie für persistente Zustandswiederherstellung bei Wiederbesuchen, Consent für optionale serverseitige Speicherung und optionales Tracking.
- Löschprozess mit eindeutiger Identifikation (z.B. Link/QR im PDF).

---

<a id="netzwerk-und-plattformschutz"></a>

## Netzwerk- und Plattformschutz

- Verschlüsselte Datenübertragung (TLS) für alle externen Zugriffe.
- Backend nicht direkt aus dem Internet erreichbar; Zugriff über API-Management.
- Datenbankzugriff nur aus dem Backend, keine direkten Client-Verbindungen.

---

<a id="systemhaertung"></a>

## Systemhärtung

- Container mit minimalen Rechten (Non-Root, minimale Capabilities).
- Secrets ausschließlich über Secrets-Management.
- Regelmäßige Sicherheitsupdates und Patch-Management.

---

<a id="logging-monitoring-und-nachvollziehbarkeit"></a>

## Logging, Monitoring und Nachvollziehbarkeit

- Protokollierung von Nutzeraktionen, Systemprozessen und Fehlerereignissen.
- Maschinenlesbare Logs mit Standard-Log-Levels (DEBUG, INFO, WARN, ERROR, FATAL).
- Audit-Logs für Admin-Aktionen inkl. Zeitstempel und Benutzerkennung.

---

<a id="lieferkette-und-open-source"></a>

## Lieferkette und Open Source

- Abhängigkeiten werden über CVE-Management beobachtet.
- SBOM wird gepflegt und mit Releases veröffentlicht.
- Sicherheits- und Bug-Kontaktstellen sind definiert.

---

<a id="pruefungen-und-tests"></a>

## Prüfungen und Tests

- Secure Development Lifecycle nach OWASP.
- Code-Reviews und automatisierte Tests als Standard.
- Penetrationstest vor Go-Live.

---

<a id="betrieb-und-incident-handling"></a>

## Betrieb und Incident-Handling

- Zuständigkeiten für Betrieb und Support sind dokumentiert.
- Sicherheitsvorfälle werden klassifiziert, priorisiert und nachvollziehbar dokumentiert.
