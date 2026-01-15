# Systemüberblick – Digitaler Energy Zwilling (DEZ)

## Zielsetzung

Der Digitaler Energy Zwilling (DEZ) ist eine webbasierte 3D-Anwendung zur **Visualisierung und Bewertung energetischer Potenziale von Gebäuden** im Stadtgebiet Regensburg.  
DEZ steht hier für **Digitaler Energy Zwilling** und nicht für das Donau Einkaufszentrum.
Ziel ist es, Bürgern (insbesondere Eigentümern/Vermietern) eine **niedrigschwellige, verständliche und datenschutzfreundliche Entscheidungsunterstützung** für energetische Sanierungsmaßnahmen bereitzustellen.

Die Anwendung richtet sich nicht an Energieberater oder Förderstellen, sondern dient der **indikativ-orientierenden Einschätzung** von Potenzialen (z.B. Solar, Geothermie, Sanierungsmaßnahmen).

---

## Zielgruppen

### Bürger (Eigentümer/Vermieter)
- Zugriff ohne Authentifizierung
- Interaktive 3D-Visualisierung des Stadtmodells
- Einsicht in energetische Potenziale einzelner Gebäude
- Durchführung einfacher Simulationen zur Abschätzung von Maßnahmen
- Nutzung ohne verpflichtende Datenübermittlung an den Server

### Stadtverwaltung / Fachpersonal
- Zugriff über geschützte Admin-Oberfläche
- Pflege und Veröffentlichung von Simulationsparametern
- Sichtung und Triage von Nutzereingaben
- Qualitätssicherung und fachliche Kontrolle

---

## Abgrenzung und Nicht-Ziele

Der Digitaler Energy Zwilling (DEZ) ist **kein**:
- förderfähiges Berechnungstool
- Ersatz für individuelle Energieberatung
- amtliches Auskunftssystem
- dynamisches Rechentool mit Echtzeit-Physikmodellen

Simulationsergebnisse sind **indikativ** und dienen ausschließlich der Orientierung.

---

## Systemkontext

Das System besteht aus:
- einem **öffentlichen 3D-Client** zur Visualisierung und Simulation
- einer **administrativen Oberfläche** zur Konfiguration und Datenpflege
- einer **Offline-Datenpipeline** zur Vorverarbeitung komplexer Geodaten
- einem **Backend**, das Authentifizierung, Konfiguration und Datenspeicherung übernimmt

Rechenintensive Geodaten und Potenzialanalysen werden **offline** durchgeführt und als statische Attribute in 3D Tiles abgelegt.  
Zur Laufzeit erfolgt keine Neuberechnung dieser Potenziale.

---

## Zentrale Leitprinzipien

### Privacy-by-Design
Simulationen können vollständig clientseitig durchgeführt werden.  
Nutzereingaben werden nur dann an den Server übertragen, wenn der Nutzer dies explizit wünscht.

### Trennung von statisch und dynamisch
- Statische, allgemein gültige Daten liegen in 3D Tiles
- Dynamische, nutzerspezifische Daten liegen in der Datenbank
- Keine doppelte Datenhaltung

### Skalierbarkeit durch Einfachheit
- Statisches Frontend
- Entkopplung von 3D-Tiles und Backend
- Vermeidung unnötiger Laufzeitlogik

---

## Dokumentstruktur

Die weitere Dokumentation ist wie folgt aufgebaut:

- **Fachliche Anforderungen**: beschreibt, welche Funktionen das System bereitstellt
- **Technische Anforderungen**: definiert verbindliche technische Leitplanken
- **Architekturübersicht**: erläutert die Systemarchitektur und ihre Prinzipien
- **C4-Diagramme**: visualisieren Container-, Komponenten- und Datenflüsse
- **Datenpipeline & Simulation**: beschreiben die Verarbeitung und Berechnungslogik
- **Betrieb & Sicherheit**: behandeln Deployment, Monitoring und Datenschutz

Dieses Dokument dient als Einstieg und Referenzpunkt für alle weiteren Kapitel.
