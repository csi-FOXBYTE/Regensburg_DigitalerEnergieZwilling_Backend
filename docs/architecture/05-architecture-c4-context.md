# Architektur - C4 Kontext Diagramm

## Ziel dieser Sicht

Dieses Kapitel beschreibt den Digitaler Energy Zwilling (DEZ) auf **Kontext-Ebene (C4 Level 1)**.
Die Kontext-Sicht zeigt das System als Black Box, seine wichtigsten Nutzer und die
relevanten externen Systeme sowie Datenquellen.

Die Sicht dient:
- der gemeinsamen Orientierung mit Fachbereichen und Stakeholdern
- der Abgrenzung des Systems nach außen
- der frühen Klärung von Abhängigkeiten

---

## Kontextdiagramm

![c4-context.png](./attachments/c4-context.png)

Quelle: `raw/c4-context.puml`

---

## Akteure und Systeme

- **Bürger (Eigentümer/Vermieter)**: nutzt den öffentlichen 3D-Client zur Visualisierung und Simulation.
- **Stadtverwaltung / Fachpersonal**: nutzt den Admin-Bereich zur Konfiguration und QS.
- **Keycloak CIVITAS**: OIDC-Identity-Provider für Admin-Login (Plattformdienst innerhalb von Civitas Core).
- **City Geo Services**: liefert Basemaps via WMS/WMTS.
- **CityGML LOD2 Source**: Gebäudedaten für die Offline-Aufbereitung.
- **Solar and Geothermal Sources**: Potenzialdaten als Raster-/Vektorquellen bzw. 3D Tiles (Solar).

---

## Schnittstellen und Datenflüsse (high level)

- Bürger (Eigentümer/Vermieter) und Stadtverwaltung / Fachpersonal greifen über HTTPS auf den Digitaler Energy Zwilling (DEZ) zu.
- Admin-Authentifizierung erfolgt über OIDC gegen Keycloak CIVITAS.
- Basemaps werden zur Laufzeit aus City Geo Services geladen (WMS/WMTS).
- CityGML- und Potenzialdaten werden **offline** in das System importiert.

---

## Abgrenzung zur Container-Sicht

Dieses Kapitel enthält **keine internen Container oder Komponenten**.
Die detaillierte Laufzeitstruktur ist in den folgenden C4-Sichten (Container und Component)
beschrieben.
