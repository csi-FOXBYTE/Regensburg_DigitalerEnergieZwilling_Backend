# Architektur - Backend

## Ziel dieser Sicht

Dieses Kapitel beschreibt Verantwortlichkeiten, Schnittstellen und Betriebsprinzipien des Backends des Digitaler Energy Zwilling (DEZ).

---

## Verantwortlichkeiten

- Authentifizierung und Autorisierung (OIDC für Stadtverwaltung / Fachpersonal).
- Verwaltung, Versionierung und Veröffentlichung von Simulationskonfigurationen.
- Persistenz von Nutzereingaben, Triage-Informationen und Katalogen.
- Öffentliche Schreibschnittstelle inklusive Validierung und Verifikation.
- Optionale serverseitige Simulation über den Simulationskern.

---

## Schnittstellen

- Öffentliche API (z.B. Konfiguration, optionale Speicherung von Ergebnissen).
- Administrative API (Konfiguration, Triage, Reporting).
- Identity Provider (Keycloak) für Admin-Login.
- Relationale Datenbank mit räumlicher Erweiterung.
- Simulationskern als eingebettetes Modul für Re-Berechnungen.

---

## Diagramm

![backend-architecture.png](./attachments/backend-architecture.png)

Quelle: `raw/backend-architecture.puml`

---

## Datenhaltung

- Relationale Datenbank für dynamische und administrative Daten.
- Keine Speicherung statischer Potenzialdaten oder 3D Tiles.
- Konfigurations-Snapshots als exportierte Dateien.

---

## Sicherheits- und Betriebsprinzipien

- Strikte Trennung von Public- und Admin-Endpunkten.
- Rate Limiting und Altcha-Challenges für öffentliche Schreibzugriffe.
- Statelesses Backend, containerisierbar, mit Observability (Logs, Metriken, Tracing).

---

## Abgrenzung

- Keine Auslieferung großer statischer Datenmengen (3D Tiles).
- Keine Laufzeit-Berechnung von Potenzialen.
