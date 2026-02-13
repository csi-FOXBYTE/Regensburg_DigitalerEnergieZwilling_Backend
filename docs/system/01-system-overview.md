# Systemüberblick - Digitaler Energy Zwilling (DEZ)

## Inhaltsverzeichnis

1. [Zielsetzung](#zielsetzung)
2. [Zielgruppen](#zielgruppen)
3. [Nutzen](#nutzen)
4. [Abgrenzung und Nicht-Ziele](#abgrenzung-und-nicht-ziele)
5. [Systemkontext](#systemkontext)
6. [Datenhaltung und Datenfluss](#datenhaltung-und-datenfluss)
7. [MVP-Klärungsbedarf (erneuerbare Maßnahmen)](#mvp-klaerungsbedarf-erneuerbare-massnahmen)
8. [Zentrale Leitprinzipien](#zentrale-leitprinzipien)
9. [Dokumentstruktur](#dokumentstruktur)

<a id="zielsetzung"></a>
## Zielsetzung

Der Digitaler Energy Zwilling (DEZ) ist eine webbasierte 3D-Anwendung zur Visualisierung und indikativ-orientierenden Bewertung energetischer Potenziale von Gebäuden im Stadtgebiet Regensburg. Ziel ist eine niedrigschwellige, verständliche und datenschutzfreundliche Entscheidungsunterstützung für Eigentümer und Vermieter. DEZ steht für Digitaler Energy Zwilling und nicht für das Donau Einkaufszentrum.

Der DEZ richtet sich nicht an Energieberater oder Förderstellen und liefert keine rechtsverbindlichen Aussagen. Ergebnisse sind indikativ und dienen der Orientierung.

### Motivation

- Beitrag zu den Klimaschutzzielen der Stadt Regensburg und zur Fortschreibung der Wärmeplanung auf Quartiersebene.
- Verbesserung der Datenbasis durch die freiwillige Nutzung des Tools durch Eigentümer und interessierte Bürger.

### Ziele der Lösung

- Bereitstellung gebäude- und flächenspezifischer Energiebedarfsschätzungen.
- Berechnung und Vorschläge für Sanierungsmaßnahmen.
- Integration von Geodaten (z.B. LOD2), um Nutzereingaben zu minimieren.
- Nutzung von Normen, Richtlinien und Katalogen zur Berechnung von Energie-, Kosten- und THG-Kennwerten.
- Darstellung von Sanierungseffekten (Energie-/Kosteneinsparungen, CO₂-Reduktionen).
- Abschätzung von Investitionskosten und Wirtschaftlichkeit.
- Niederschwelliges, digitales Bürgerangebot mit intuitiver Bedienung.
- Langfristige Skalierbarkeit und Integration in bestehende Systeme (Geoportal/MasterPortal, CIVITAS/CORE).
- Verpflichtender Einstiegspunkt aus dem MasterPortal über einen Link auf die DEZ-Plattform.

---

<a id="zielgruppen"></a>
## Zielgruppen

### Bürger (Eigentümer/Vermieter)
- Zugriff ohne Authentifizierung
- Interaktive 3D-Visualisierung des Stadtmodells mit Gebäudeauswahl
- Anzeige von Solarpotenzialen (PV) und Geothermiepotenzialen
- Verbindliche farbliche Gebäudeeinfärbung im 3D-Client zur Einordnung der Effizienz
- Auswahl erneuerbarer Maßnahmen inkl. PV-Szenarien und Solarthermie (Warmwasser-Unterstützung)
- Einfache Simulationen für Sanierungsmaßnahmen mit variabler Eingabetiefe (kontinuierliches Spektrum)
- Anonymisierte Datenerfassung (z.B. Personenanzahl als Klassen 1–5 bzw. >5)
- Eingabetiefe-Spektrum von "keine Nutzereingabe" bis "vollständig durch Nutzer definiert" (von reinen Basisannahmen bis vollständig manuell angepassten Angaben)
- Keine Registrierung; Bearbeitungszustand wird über einen notwendigen Cookie persistiert, optionale Wiederherstellung vom Server bei expliziter Speicherung
- Nutzung ohne verpflichtende Datenübermittlung; Export nur auf Wunsch

### Stadtverwaltung / Fachpersonal
- Zugriff über geschützten Admin-Bereich
- Pflege und Veröffentlichung von Simulationskonfigurationen
- Sichtung, Triage und Qualitätssicherung von Nutzereingaben
- Auswertung für Quartiersanalyse und interne Berichte

---

<a id="nutzen"></a>
## Nutzen

### Allgemein
- Austausch zwischen Bürgern und Kommune durch aggregierte, freiwillig bereitgestellte Ergebnisse
- Beitrag zu Nachhaltigkeit und Klimaschutz

### Bürger
- Verständliche Informationen zu baulichen Maßnahmen
- „Beratung light“ als Orientierung vor einer echten Energieberatung

### Verwaltung
- Bessere Planbarkeit für Wärmeplanung und Klimaschutzmaßnahmen
- Evidenzbasierte Priorisierung von Maßnahmen auf Quartiersebene

---

<a id="abgrenzung-und-nicht-ziele"></a>
## Abgrenzung und Nicht-Ziele

Der DEZ ist kein:
- förderfähiges Berechnungstool
- Ersatz für individuelle Energieberatung
- amtliches Auskunftssystem
- Echtzeit-Simulationssystem mit detaillierter Gebäudephysik

---

<a id="systemkontext"></a>
## Systemkontext

Das System besteht aus:
- einem öffentlichen 3D-Client für Visualisierung und Simulation
- einem administrativen Bereich für Fachpersonal
- einem Simulationskern als JavaScript-Modul (clientseitig, optional serverseitig)
- einem Backend für Authentifizierung, Konfiguration, Persistenz und Triage
- einer Offline-Datenpipeline zur Vorverarbeitung von Geodaten
- APISIX als zentralem Web/API-Gateway für externe Zugriffe
- einem optionalen 3D Tiles Gateway zur Auslieferung statischer Tiles

Rechenintensive Potenzialanalysen werden offline durchgeführt und als Attribute in 3D Tiles abgelegt. Zur Laufzeit findet keine Neuberechnung der Potenziale statt.

---

<a id="datenhaltung-und-datenfluss"></a>
## Datenhaltung und Datenfluss

- Statische, allgemein gültige Potenziale liegen ausschließlich in den 3D Tiles.
- 3D Tiles enthalten Gebäudegeometrie, Adressen aus LOD2, Solarpotenzial-Attribute (inkl. Textur für die Potenzialdarstellung) sowie Vegetationsobjekte (Bäume).
- Dynamische, nutzerspezifische Daten liegen in der Datenbank.
- Konfigurationen werden versioniert und als veröffentlichte JSON-Snapshots für den Client bereitgestellt.
- Es gibt keine doppelte Datenhaltung statischer Potenziale im Backend.
- Wenn Nutzereingaben gespeichert werden, ist ein Löschprozess über einen eindeutigen Link/QR vorgesehen.

---

<a id="mvp-klaerungsbedarf-erneuerbare-massnahmen"></a>
## MVP-Klärungsbedarf (erneuerbare Maßnahmen)

- **Solarthermie**: als zusätzliche Maßnahme zur Warmwasserbereitung fachlich gewünscht, aber in der Umsetzung nachrangig priorisiert; finaler MVP-Umfang offen.
- **PV**: zwei Darstellungen vorgesehen  
  1) Dimensionierung von PV + Speicher für den Wärmepumpenbetrieb inkl. energetischer/finanzieller Effekte.  
  2) Maximale Ausnutzung geeigneter PV-Flächen zur Kommunikation von Potenzialen für Haushaltsstrom, KFZ-Ladung und ähnliche Verbräuche.
- **Geothermie**: Einschätzung über Datensatzabfrage in Reihenfolge Grundwasser → Erdreich → Luft; belastbarer Datensatz liegt aktuell noch nicht vor, MVP-Umfang bleibt in Klärung.

---

<a id="zentrale-leitprinzipien"></a>
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

<a id="dokumentstruktur"></a>
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
