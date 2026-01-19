# Systemüberblick - Digitaler Energy Zwilling (DEZ)

## Zielsetzung

Der Digitaler Energy Zwilling (DEZ) ist eine webbasierte 3D-Anwendung zur Visualisierung und indikativ-orientierenden Bewertung energetischer Potenziale von Gebäuden im Stadtgebiet Regensburg. Ziel ist eine niedrigschwellige, verständliche und datenschutzfreundliche Entscheidungsunterstützung für Eigentümer und Vermieter. DEZ steht für Digitaler Energy Zwilling und nicht für das Donau Einkaufszentrum.

Der DEZ richtet sich nicht an Energieberater oder Förderstellen und liefert keine rechtsverbindlichen Aussagen. Ergebnisse sind indikativ und dienen der Orientierung.

---

## Zielgruppen

### Bürger (Eigentümer/Vermieter)
- Zugriff ohne Authentifizierung
- Interaktive 3D-Visualisierung des Stadtmodells mit Gebäudeauswahl
- Anzeige von Solar- und Geothermiepotenzialen
- Einfache Simulationen für Sanierungsmaßnahmen in mehreren Stufen
- Nutzung ohne verpflichtende Datenübermittlung; Export nur auf Wunsch

### Stadtverwaltung / Fachpersonal
- Zugriff über geschützte Admin-Oberfläche
- Pflege und Veröffentlichung von Simulationskonfigurationen
- Sichtung, Triage und Qualitätssicherung von Nutzereingaben
- Auswertung für Quartiersanalyse und interne Berichte

---

## Abgrenzung und Nicht-Ziele

Der DEZ ist kein:
- förderfähiges Berechnungstool
- Ersatz für individuelle Energieberatung
- amtliches Auskunftssystem
- Echtzeit-Simulationssystem mit detaillierter Gebäudephysik

---

## Systemkontext

Das System besteht aus:
- einem öffentlichen 3D-Client für Visualisierung und Simulation
- einer administrativen Oberfläche für Fachpersonal
- einem Simulationskern als JavaScript-Modul (clientseitig, optional serverseitig)
- einem Backend für Authentifizierung, Konfiguration, Persistenz und Triage
- einer Offline-Datenpipeline zur Vorverarbeitung von Geodaten
- einem 3D-Tiles-Gateway zur Auslieferung statischer Tiles

Rechenintensive Potenzialanalysen werden offline durchgeführt und als Attribute in 3D Tiles abgelegt. Zur Laufzeit findet keine Neuberechnung der Potenziale statt.

---

## Datenhaltung und Datenfluss

- Statische, allgemein gültige Potenziale liegen ausschließlich in den 3D Tiles.
- Dynamische, nutzerspezifische Daten liegen in der Datenbank.
- Konfigurationen werden versioniert und als veröffentlichte JSON-Snapshots für den Client bereitgestellt.
- Es gibt keine doppelte Datenhaltung statischer Potenziale im Backend.

---

## Zentrale Leitprinzipien

### Privacy-by-Design
Simulationen können vollständig clientseitig durchgeführt werden. Nutzereingaben werden nur auf expliziten Wunsch übertragen und gespeichert.

### Trennung von statisch und dynamisch
Statische Potenziale liegen in Tiles, dynamische Nutzereingaben und Konfigurationen in der Datenbank. Diese Trennung reduziert Komplexität und schützt personenbezogene Daten.

### Offline-Vorverarbeitung
Komplexe Geodaten werden außerhalb des Laufzeitsystems verarbeitet, um Performance und Skalierbarkeit sicherzustellen.

### Leichtgewichtiges Backend
Das Backend stellt ausschließlich Konfiguration, Authentifizierung und Persistenz bereit und liefert keine großen Datenmengen aus.

---

## Dokumentstruktur

Die weitere Dokumentation ist wie folgt aufgebaut:
- Fachliche Anforderungen
- Technische Anforderungen
- Architekturübersicht und C4-Diagramme
- Datenmodell & API-View
- Runtime-Flows & Betriebsaspekte
- Offline-Datenpipeline & Simulation
- Betrieb, Sicherheit und Datenschutz

Dieses Dokument dient als Einstieg und Referenzpunkt für die übrigen Kapitel.
