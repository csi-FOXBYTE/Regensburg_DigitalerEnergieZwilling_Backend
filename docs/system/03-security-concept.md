# Sicherheitskonzept

Dieses Kapitel beschreibt das Sicherheitskonzept des Digitaler Energy Zwilling (DEZ) als technische Leitlinie fÃ¼r Planung, Umsetzung und Betrieb. Es konkretisiert die Anforderungen aus den technischen Anforderungen und verankert die Orientierung am BSI IT-Grundschutz.

---

**Ziele**

- Vertraulichkeit, IntegritÃ¤t und VerfÃ¼gbarkeit der Systeme und Daten sicherstellen.
- Missbrauch Ã¶ffentlicher Endpunkte verhindern und administrative Zugriffe schÃ¼tzen.
- Datenschutzfreundliche Nutzung ohne Zwang zur Speicherung persÃ¶nlicher Daten.

---

**Geltungsbereich**

- Ã–ffentlicher BÃ¼rger-Client (statische Auslieferung).
- Administrativer Client (geschÃ¼tzter Bereich).
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

**Mapping: Baustein â†’ DEZ-MaÃŸnahmen (Kurzfassung)**

- **APP.3.1 Webanwendungen und Webservices**: Trennung Ã¶ffentlicher/administrativer Funktionen, serverseitige Validierung, Rate Limiting und Challenge fÃ¼r Ã¶ffentliche Writes.
- **APP.3.2 Webserver**: HÃ¤rtung der Auslieferung, TLS erzwingen, minimale AngriffsflÃ¤che, keine serverseitige Renderlogik im Ã¶ffentlichen Client.
- **APP.4.3 Relationale Datenbanksysteme**: Zugriff nur Ã¼ber Backend, rollenbasierte Zugriffe, Audit-Logs fÃ¼r Admin-Aktionen.
- **SYS.1.1 Allgemeiner Server**: Container mit Non-Root, minimale Capabilities, Patch-Management, Secrets-Management.
- **NET.1.1 Netzarchitektur und -design**: Backend nicht direkt aus dem Internet erreichbar, Zugriff Ã¼ber API-Management/Reverse Proxy, Netzwerksegmentierung.
- **NET.3.1 Netzkomponenten**: Standardisierte Schnittstellen, klare Netzgrenzen, Monitoring der Schnittstellen.
- **OPS.1.1.3 Patch- und Ã„nderungsmanagement**: RegelmÃ¤ÃŸige Updates, dokumentierte Ã„nderungen, Rollback-Strategien.
- **CON.8 Software-Entwicklung**: SDLC nach OWASP, Code-Reviews, Security-Scanning, Penetrationstest vor Go-Live.

---

**Sicherheitsprinzipien**

- Least Privilege und minimal notwendige Berechtigungen.
- Secure Defaults und Defense in Depth.
- Trennung Ã¶ffentlicher und administrativer Funktionen.
- Konfigurations- und Datenhoheit Ã¼ber versionierte Freigaben.

---

**IdentitÃ¤t, Zugriff und Rollen**

- Admin-Zugriff ausschlieÃŸlich Ã¼ber OIDC (Keycloak).
- Rollenbasierte Freigaben fÃ¼r Systempflege und Triage.
- Ã–ffentliche Schreibzugriffe nur mit Schutzmechanismen (Altcha, Rate Limiting).

---

**Daten- und Datenschutzkonzept**

- Keine personenbezogene Pflichtdatenerfassung im BÃ¼rgerbereich.
- Optionale Ãœbermittlung von Eingaben, stets explizit ausgelÃ¶st.
- Session-Cookies fÃ¼r temporÃ¤re ZustÃ¤nde, Consent fÃ¼r optionales Tracking.
- LÃ¶schprozess mit eindeutiger Identifikation (z.B. Link/QR im PDF).

---

**Netzwerk- und Plattformschutz**

- VerschlÃ¼sselte DatenÃ¼bertragung (TLS) fÃ¼r alle externen Zugriffe.
- Backend nicht direkt aus dem Internet erreichbar; Zugriff Ã¼ber API-Management.
- Datenbankzugriff nur aus dem Backend, keine direkten Client-Verbindungen.

---

**SystemhÃ¤rtung**

- Container mit minimalen Rechten (Non-Root, minimale Capabilities).
- Secrets ausschlieÃŸlich Ã¼ber Secrets-Management.
- RegelmÃ¤ÃŸige Sicherheitsupdates und Patch-Management.

---

**Logging, Monitoring und Nachvollziehbarkeit**

- Protokollierung von Nutzeraktionen, Systemprozessen und Fehlerereignissen.
- Maschinenlesbare Logs mit Standard-Log-Levels (DEBUG, INFO, WARN, ERROR, FATAL).
- Audit-Logs fÃ¼r Admin-Aktionen inkl. Zeitstempel und Benutzerkennung.

---

**Lieferkette und Open Source**

- AbhÃ¤ngigkeiten werden Ã¼ber CVE-Management beobachtet.
- SBOM wird gepflegt und mit Releases verÃ¶ffentlicht.
- Sicherheits- und Bug-Kontaktstellen sind definiert.

---

**PrÃ¼fungen und Tests**

- Secure Development Lifecycle nach OWASP.
- Code-Reviews und automatisierte Tests als Standard.
- Penetrationstest vor Go-Live.

---

**Betrieb und Incident-Handling**

- ZustÃ¤ndigkeiten fÃ¼r Betrieb und Support sind dokumentiert.
- SicherheitsvorfÃ¤lle werden klassifiziert, priorisiert und nachvollziehbar dokumentiert.
