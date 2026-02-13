# MVP-Definition und Release-Aufteilung

Dieses Dokument definiert den geplanten MVP-Umfang und dessen Aufteilung in drei separate Releases.

---

## Zielbild MVP

Der MVP wird in drei aufeinander aufbauenden Releases umgesetzt:

1. **Release 1:** Plattformaufbau (CIVITAS/CORE + Services + Datenpipeline)
2. **Release 2 (primär Hauptzielgruppe (Bürger/Eigentümer/Vermieter/Mieter)):** Öffentlicher Client + Bürgerfunktionen + Backend-CRUD
3. **Release 3 (primär Nebenzielgruppe (Stadtverwaltung/Fachpersonal)):** Verwaltungsbereich + Datenfreigabe und Wärmeplanung + Abschlussfunktionen

---

## Release 1 - Plattformaufbau

Ziel: Technische Basis in CIVITAS/CORE bereitstellen und Datenverfügbarkeit für den weiteren Ausbau schaffen.

Umfang:
- Anbindung und Aufbau aller für den Betrieb notwendigen Komponenten in der CIVITAS/CORE-Plattform.
- Aufbau der benötigten Services für den Plattformbetrieb.
- Umsetzung der Datenpipeline zur Anreicherung der 3D-Tiles.
- Vorgelagertes Verschneiden/Preprocessing, damit ein vollständiger Datensatz offline verfügbar ist.
- Verortung des MasterPortal-Link-Outs auf die DEZ-Plattform.

Ergebnis:
- Betriebsfähige Plattformgrundlage für die folgenden Releases.
- Angereicherter, offline verfügbarer 3D-Tile-Datensatz als Datenbasis.

---

## Release 2 - Hauptzielgruppe (Bürger/Eigentümer/Vermieter/Mieter): Öffentlicher Client + Backend-CRUD

Ziel: Primärfunktionen für die Hauptzielgruppe bereitstellen und den ersten nutzbaren End-to-End-Flow ermöglichen.

Umfang öffentlicher Client:
- 3D-Kartenansicht.
- Auswahl eines Gebäudes über 3D-Ansicht und/oder Adresseingabe.
- Darstellung des Ist-Zustands inklusive Berechnung und Plausibilitätscheck.
- Basisimplementierung der Sanierungsempfehlung, inklusive Auswahl von Maßnahmen.
- Ergebnisanzeige inklusive Vergleich innerhalb der Stadt Regensburg.
- Erste Implementierung von Fördermöglichkeiten.
- Footer-Bereich: Impressum, Datenschutz, Cookie-Consent.

Umfang Backend:
- Backend-Implementierung inklusive CRUD-Funktionalitäten für die MVP-relevanten Datenflüsse.

Ergebnis:
- Erstes nutzbares Bürgerangebot.

---

## Release 3 - Nebenzielgruppe (Stadtverwaltung/Fachpersonal): Verwaltungsbereich + Datenfreigabe und Wärmeplanung + Abschlussfunktionen

Ziel: Primärfunktionen für die Nebenzielgruppe bereitstellen; zusätzlich die für Datenfreigabe und Wärmeplanung sowie Abschluss des MVP erforderlichen Querschnittsfunktionen umsetzen.

Umfang:
- Technische Bereitstellung des Exports als PDF/JSON für den öffentlichen Client (Bürgerbereich).
- Datenfreigabe durch Nutzer und Bereitstellung der freigegebenen Eingabedaten für die Wärmeplanung über die CIVITAS/CORE-Plattform.
- Löschprozess über Export-Referenz (z. B. Link/QR) inklusive Zwei-Faktor-Verfahren.
- Umsetzung des Verwaltungsbereichs.
- Konfiguration der Berechnungsparameter.
- Konfiguration der Sanierungsmaßnahmen.
- Dedizierte Abfrage- und Darstellungslogik für Wärmeplanungsdaten.
- Prüfung und Freigabe von Eingabedaten durch Stadtverwaltung / Fachpersonal.

Ergebnis:
- Administrierbarer MVP mit steuerbarer Berechnungslogik, bereitgestellten Abschlussfunktionen für den Bürgerbereich (Export und Löschung) sowie umgesetzter Datenfreigabe und Wärmeplanung.

---

## Phase 4 (außerhalb/nach MVP)

Folgende Themen werden für die verbleibende Entwicklungsdauer außerhalb bzw. nach der MVP-Phase eingeplant:

- Darstellung der Amortisation.
- Implementierung der Feedback-Funktion.
- Einfärben von Gebäuden in der 3D-Ansicht.
- Quartiersanalyse (Vergleich mit Gebiet/Stadt).
