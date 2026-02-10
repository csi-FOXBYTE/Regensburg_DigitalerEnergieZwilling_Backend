# Sicherheitskonzept

Dieses Kapitel beschreibt das Sicherheitskonzept des Digitaler Energy Zwilling (DEZ) als technische Leitlinie für Planung, Umsetzung und Betrieb. Es konkretisiert die Anforderungen aus den technischen Anforderungen und verankert die Orientierung am BSI IT-Grundschutz.

---

**Ziele**

- Vertraulichkeit, Integrität und Verfügbarkeit der Systeme und Daten sicherstellen.
- Missbrauch öffentlicher Endpunkte verhindern und administrative Zugriffe schätzen.
- Datenschutzfreundliche Nutzung ohne Zwang zur Speicherung persönlicher Daten.

---

**Geltungsbereich**

- Öffentlicher Bürger-Client (statische Auslieferung).
- Administrativer Client (geschützter Bereich).
- Backend-API, Datenbank, Konfigurations-Publishing.
- Offline-Datenpipeline (Airflow, Container, externer Datendienst).
- Tiles Gateway und 3D Tiles Storage.

---

**BSI-Grundschutz-Bezug (Auswahl)**

- APP.3.1 Webanwendungen und Webservices.
- APP.3.2 Webserver.
- APP.4.3 Relationale Datenbanksysteme.
- SYS.1.1 Allgemeiner Server.
- NET.1.1 Netzarchitektur und -design.
- NET.3.1 Netzkomponenten.
- OPS.1.1.3 Patch- und Ã„nderungsmanagement.
- CON.8 Software-Entwicklung.

---

**Mapping: Baustein DEZ-Maßnahmen (Kurzfassung)**

- **APP.3.1 Webanwendungen und Webservices**: Trennung öffentlicher/administrativer Funktionen, serverseitige Validierung, Rate Limiting und Challenge für öffentliche Writes.
- **APP.3.2 Webserver**: Härtung der Auslieferung, TLS erzwingen, minimale Angriffsfläche, keine serverseitige Renderlogik im öffentlichen Client.
- **APP.4.3 Relationale Datenbanksysteme**: Zugriff nur über Backend, rollenbasierte Zugriffe, Audit-Logs für Admin-Aktionen.
- **SYS.1.1 Allgemeiner Server**: Container mit Non-Root, minimale Capabilities, Patch-Management, Secrets-Management.
- **NET.1.1 Netzarchitektur und -design**: Backend nicht direkt aus dem Internet erreichbar, Zugriff über API-Management/Reverse Proxy, Netzwerksegmentierung.
- **NET.3.1 Netzkomponenten**: Standardisierte Schnittstellen, klare Netzgrenzen, Monitoring der Schnittstellen.
- **OPS.1.1.3 Patch- und Ã„nderungsmanagement**: Regelmäßige Updates, dokumentierte Ã„nderungen, Rollback-Strategien.
- **CON.8 Software-Entwicklung**: SDLC nach OWASP, Code-Reviews, Security-Scanning, Penetrationstest vor Go-Live.

---

**Sicherheitsprinzipien**

- Least Privilege und minimal notwendige Berechtigungen.
- Secure Defaults und Defense in Depth.
- Trennung öffentlicher und administrativer Funktionen.
- Konfigurations- und Datenhoheit über versionierte Freigaben.

---

**Identität, Zugriff und Rollen**

- Admin-Zugriff ausschließlich über OIDC (Keycloak).
- Rollenbasierte Freigaben für Systempflege und Triage.
- Ã–ffentliche Schreibzugriffe nur mit Schutzmechanismen (Altcha, Rate Limiting).

---

**Daten- und Datenschutzkonzept**

- Keine personenbezogene Pflichtdatenerfassung im Bürgerbereich.
- Optionale Ãœbermittlung von Eingaben, stets explizit ausgelöst.
- Session-Cookies für temporäre Zustände, Consent für optionales Tracking.
- Löschprozess mit eindeutiger Identifikation (z.B. Link/QR im PDF).

---

**Netzwerk- und Plattformschutz**

- Verschlüsselte Datenübertragung (TLS) für alle externen Zugriffe.
- Backend nicht direkt aus dem Internet erreichbar; Zugriff über API-Management.
- Datenbankzugriff nur aus dem Backend, keine direkten Client-Verbindungen.

---

**Systemhärtung**

- Container mit minimalen Rechten (Non-Root, minimale Capabilities).
- Secrets ausschließlich über Secrets-Management.
- Regelmäßige Sicherheitsupdates und Patch-Management.

---

**Logging, Monitoring und Nachvollziehbarkeit**

- Protokollierung von Nutzeraktionen, Systemprozessen und Fehlerereignissen.
- Maschinenlesbare Logs mit Standard-Log-Levels (DEBUG, INFO, WARN, ERROR, FATAL).
- Audit-Logs für Admin-Aktionen inkl. Zeitstempel und Benutzerkennung.

---

**Lieferkette und Open Source**

- Abhängigkeiten werden über CVE-Management beobachtet.
- SBOM wird gepflegt und mit Releases veröffentlicht.
- Sicherheits- und Bug-Kontaktstellen sind definiert.

---

**Prüfungen und Tests**

- Secure Development Lifecycle nach OWASP.
- Code-Reviews und automatisierte Tests als Standard.
- Penetrationstest vor Go-Live.

---

**Betrieb und Incident-Handling**

- Zuständigkeiten für Betrieb und Support sind dokumentiert.
- Sicherheitsvorfälle werden klassifiziert, priorisiert und nachvollziehbar dokumentiert.
