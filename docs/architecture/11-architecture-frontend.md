# Architektur - Frontend

## Ziel dieser Sicht

Dieses Kapitel beschreibt Aufbau, Verantwortlichkeiten und Schnittstellen des Frontends des Digitaler Energy Zwilling (DEZ). Fokus ist die statische Auslieferung und die Laufzeit im Browser.

---

## Umfang und Abgrenzung

- Umfasst Public Client und Admin-Oberfläche.
- Beschreibt nicht die Offline-Datenpipeline oder die Backend-Implementierung.

---

## Verantwortlichkeiten

- Darstellung des 3D-Stadtmodells und Auswahl einzelner Gebäude.
- Visualisierung von Solarpotenzialen (PV) und Geothermiepotenzialen aus 3D Tiles.
- Nutzung der Solarpotenzial-Textur (z.B. Dachausrichtung) für visuelle Hinweise.
- Darstellung von Vegetationsobjekten (Bäume) zur besseren räumlichen Orientierung.
- Durchführung der Simulation im Browser über den Simulationskern.
- Darstellung der Ergebnisse und Hinweise für Bürger (Eigentümer/Vermieter).
- Administrative Funktionen für Stadtverwaltung / Fachpersonal (Konfiguration, Triage).
- Einfacher/erweiterter Modus für Eingaben sowie Feedback-Formular nach Berechnung.
- Barrierefreiheit und responsives Layout (BITV 2.0).
- Live-Ergebnisse nach Eingabeänderungen (ohne expliziten „Berechnen“-Button).

---

## Schnittstellen

- 3D Tiles über das Tiles Gateway.
- Konfigurations-Snapshots (versionierte JSON) vom Backend.
- Öffentliche und administrative Backend-APIs.
- Basemap-Dienste (WMS/WMTS) für Kartenhintergründe.

---

## Diagramm

![frontend-architecture.png](./attachments/frontend-architecture.png)

Quelle: `raw/frontend-architecture.puml`

---

## Datenhaltung und Privacy

- Keine persistente Speicherung im Frontend.
- Nutzereingaben bleiben lokal, sofern keine explizite Übermittlung erfolgt.
- Exporte erzeugen Dateien nur auf ausdrücklichen Nutzerwunsch.

---

## Build und Auslieferung

- Statische Webanwendung; Build erfolgt zur Projekt-Build-Zeit.
- Build basiert auf Astro mit zwei Islands: Public Client und Admin Dashboard.
- Admin-HTML wird erst nach erfolgreicher Authentifizierung ausgeliefert.
- Statische Assets sind cachefähig, dynamische Daten kommen über APIs.

Begriff: **Island-Architektur** bezeichnet in Astro die Kombination aus statischem HTML und gezielt eingebundenen interaktiven Islands.
