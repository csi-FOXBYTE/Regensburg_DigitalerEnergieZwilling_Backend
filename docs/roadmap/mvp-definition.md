# MVP-Definition und Release-Aufteilung

Dieses Dokument definiert den geplanten MVP-Umfang und dessen Aufteilung in drei separate Releases.

---

## Inhaltsverzeichnis

1. [Zielbild MVP](#zielbild-mvp)
2. [Release 1 - Plattformaufbau](#release-1-plattformaufbau)
3. [Release 2 - Öffentlicher Client (Bürgerbereich) + Backend-CRUD](#release-2-oeffentlicher-client-buergerbereich-backend-crud)
4. [Release 3 - Verwaltungsbereich für Stadtverwaltung / Fachpersonal](#release-3-verwaltungsbereich-fuer-stadtverwaltung-fachpersonal)
5. [Phase 4 (außerhalb/nach MVP)](#phase-4-ausserhalb-nach-mvp)

<a id="zielbild-mvp"></a>
## Zielbild MVP

Der MVP wird in drei aufeinander aufbauenden Releases umgesetzt:

1. **Release 1:** Plattformaufbau (CIVITAS/CORE + Services + Datenpipeline)
2. **Release 2:** Öffentlicher Client + Bürgerfunktionen + Backend-CRUD
3. **Release 3:** Verwaltungsbereich für Stadtverwaltung / Fachpersonal (Konfiguration Berechnungsparameter und Maßnahmen)

---

<a id="release-1-plattformaufbau"></a>
## Release 1 - Plattformaufbau

Ziel: Technische Basis in CIVITAS/CORE bereitstellen und Datenverfügbarkeit für den weiteren Ausbau schaffen.

Umfang:
- Anbindung und Aufbau aller für den Betrieb notwendigen Komponenten in der CIVITAS/CORE-Plattform.
- Aufbau der benötigten Services für den Plattformbetrieb.
- Umsetzung der Datenpipeline zur Anreicherung der 3D-Tiles.
- Vorgelagertes Verschneiden/Preprocessing, damit ein vollständiger Datensatz offline verfügbar ist.
- Verortung des verpflichtenden Masterportal-Link-Outs auf die DEZ-Plattform.

Ergebnis:
- Betriebsfähige Plattformgrundlage für die folgenden Releases.
- Angereicherter, offline verfügbarer 3D-Tile-Datensatz als Datenbasis.

---

<a id="release-2-oeffentlicher-client-buergerbereich-backend-crud"></a>
## Release 2 - Öffentlicher Client (Bürgerbereich) + Backend-CRUD

Ziel: Bürger einbinden und den ersten nutzbaren End-to-End-Flow bereitstellen.

Umfang öffentlicher Client:
- 3D-Kartenansicht.
- Auswahl eines Gebäudes über 3D-Ansicht und/oder Adresseingabe.
- Darstellung des Ist-Zustands inklusive Berechnung und Plausibilitätscheck.
- Basisimplementierung der Sanierungsempfehlung inklusive Auswahl von Maßnahmen.
- Ergebnisanzeige inklusive Vergleich innerhalb der Stadt Regensburg.
- Fördermöglichkeiten (einfache Implementierung).
- Bereitstellung der Daten zur Wärmeplanung über die CIVITAS/CORE-Plattform.
- Datenfreigabe durch Nutzer.
- Footer-Bereich: Impressum, Datenschutz, Cookie-Consent.

Hinweis Wärmeplanung:
- Der Zugriff auf die Wärmeplanungsdaten erfolgt über die CIVITAS/CORE-Plattform.
- Eine dedizierte Abfrage- oder Darstellungslogik ist nicht Bestandteil des MVP und wird in Phase 4 behandelt.
- Die Prüfung und Freigabe von Eingabedaten durch Stadtverwaltung / Fachpersonal ist nicht Bestandteil des MVP und wird in Phase 4 behandelt.

Umfang Backend:
- Backend-Implementierung inklusive CRUD-Funktionalitäten für die MVP-relevanten Datenflüsse.

Ergebnis:
- Erstes produktiv nutzbares Bürgerangebot mit Datenfreigabe durch Nutzer.

---

<a id="release-3-verwaltungsbereich-fuer-stadtverwaltung-fachpersonal"></a>
## Release 3 - Verwaltungsbereich für Stadtverwaltung / Fachpersonal

Ziel: Fachliche Steuerung und Pflege durch Stadtverwaltung / Fachpersonal ermöglichen.

Umfang:
- Umsetzung des Verwaltungsbereichs.
- Konfiguration der Berechnungsparameter.
- Konfiguration der Sanierungsmaßnahmen.
- Export als PDF/JSON.
- Löschprozess inklusive Zwei-Faktor-Verfahren.

Ergebnis:
- Administrierbarer MVP mit steuerbarer Berechnungslogik und Maßnahmenkatalog.

---

<a id="phase-4-ausserhalb-nach-mvp"></a>
## Phase 4 (außerhalb/nach MVP)

Folgende Themen werden für die verbleibende Entwicklungsdauer außerhalb bzw. nach der MVP-Phase eingeplant:

- Amortisation.
- Feedback-Funktion.
- Einfärben von Gebäuden in der 3D-Ansicht.
- Quartiersanalyse (Vergleich mit Gebiet/Stadt).
- Verwaltungsbereich speziell für die Wärmeplanung (inklusive Prüfung und Freigabe von Eingabedaten durch Stadtverwaltung / Fachpersonal).
