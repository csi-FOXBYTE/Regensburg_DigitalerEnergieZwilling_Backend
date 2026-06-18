# MVP-Definition und Release-Aufteilung

Dieses Dokument beschreibt den tatsächlichen Umsetzungsstand des MVP und dient ab dem aktuellen Stand als Planungsdokument für die weitere Entwicklung bis zur Sommerpause sowie für den Nachlauf nach der Sommerpause.

Letzte Änderung: **2026-06-18** (siehe [Roadmap-Pflege und Änderungsverlauf](#roadmap-pflege-und-aenderungsverlauf))

---

## Inhaltsverzeichnis

1. [Zielbild MVP](#zielbild-mvp)
2. [Roadmap-Diagramm (PlantUML)](#roadmap-diagramm-plantuml)
3. [Roadmap-Pflege und Änderungsverlauf](#roadmap-pflege-und-aenderungsverlauf)
4. [Zentrales Register optionaler Komponenten](#zentrales-register-optionaler-komponenten)
5. [Release 1 - Plattformaufbau](#release-1-plattformaufbau)
6. [Release 2 - Hauptzielgruppe (Bürger/Eigentümer/Vermieter): Öffentlicher Client + Backend-CRUD](#release-2)
7. [Release 3 - Umsetzung Bürger-Abschlussfunktionen, Rechenkern und Verwaltungsbereich](#release-3)
8. [Release 4 - Integration, Stabilisierung, Datenpipeline und Testvorbereitung](#release-4)
9. [Release 5 - Feature-Finalisierung und laufende Testphase](#release-5)
10. [Release 6 / Inbetriebnahme vor der Sommerpause](#release-6-inbetriebnahme)
11. [Nachlauf nach der Sommerpause](#nachlauf-nach-der-sommerpause)

<a id="zielbild-mvp"></a>

## Zielbild MVP

Der MVP wird in aufeinander aufbauenden Releases umgesetzt. Die Roadmap bildet abgeschlossene Releases als Ist-Stand ab und beschreibt die weitere Planung bis zur Sommerpause sowie den vorgesehenen Nachlauf nach der Sommerpause:

1. **Release 1 (02.03.2026 bis 15.03.2026):** Plattformaufbau (CIVITAS/CORE + Services + Datenpipeline)
2. **Release 2 (16.03.2026 bis 12.04.2026):** Öffentlicher Client + Bürgerfunktionen + Backend-CRUD
3. **Release 3 (13.04.2026 bis 10.05.2026):** Bürger-Abschlussfunktionen, Rechenkern, Sanierungslogik, Export, Verwaltungsbereich und Testvorbereitung
4. **Release 4 (11.05.2026 bis 18.06.2026):** Integration, Stabilisierung, Backend-/Admin-Anbindung, Datenpipeline, Förderprogramm-Anbindung und Testvorbereitung
5. **Release 5 (ab 19.06.2026, Sprint 13 und Sprint 14 ab 23.06.2026):** Finalisierung der Features, die mit der aktuellen Datenlage bearbeitet werden können, inklusive laufender Testphase mit Expert:innen und Bürger:innen
6. **Release 6 / Inbetriebnahme (voraussichtlich Sprint 15 und optional Sprint 16 bis Ende Juli 2026):** Inbetriebnahme des MVP vor der Sommerpause; die genaue Sprint-Zuordnung hängt vom Enddatum und der Verfügbarkeit der Ansprechpartner beim Auftraggeber ab
7. **Nachlauf nach der Sommerpause:** 3 bis 4 Sprints für Anpassungen, Rückmeldungen, offene Punkte und bewusst verschobene fachliche Erweiterungen

---

<a id="roadmap-diagramm-plantuml"></a>

## Roadmap-Diagramm (PlantUML)

![mvp-roadmap.png](./attachments/mvp-roadmap.png)

Quelle: `raw/mvp-roadmap.puml`

---

<a id="roadmap-pflege-und-aenderungsverlauf"></a>

## Roadmap-Pflege und Änderungsverlauf

- Bei jedem Sprintwechsel wird die Roadmap geprüft.
- Eine Anpassung der Roadmap erfolgt bei Bedarf (optional), wenn sich Prioritäten, Abhängigkeiten oder Umsetzungsrisiken geändert haben.
- Jede Änderung wird als Verlaufseintrag dokumentiert, damit Entscheidungen und Planänderungen nachvollziehbar bleiben.

### Dokumentationsregel

- Jede Änderung wird mit Datum dokumentiert.
- Der bisherige und der neue Stand müssen je Änderung explizit gegenübergestellt werden.
- Für die aktuelle Terminplanung ist der hier dokumentierte Roadmap-Stand maßgeblich.
- Wenn eine Änderung mehrere Einzelanforderungen oder Teilfunktionen betrifft, ist die inhaltliche Release-Beschreibung dieser Roadmap für den aktuellen Planungsstand maßgeblich.

### Änderungsverlauf

| Datum | Betroffener Umfang | Bisheriger Stand | Neuer Stand |
| --- | --- | --- | --- |
| 2026-06-18 | Roadmap-Charakter | Planungsstand für vier Releases und anschließende Inbetriebnahmephase | Kombinierter Ist-Stand und Planungsstand: Release 3/4 werden als bearbeitet/umgesetzt gekennzeichnet; Release 5/6 und Nachlauf nach der Sommerpause werden ergänzt |
| 2026-06-18 | Release 4 Erweiterungen | Amortisation, Kostenschätzung/Förderung, Feedback-Funktion, Potenzial-Farbvisualisierung, Fehlermeldungen, Whitelabel-Doku und Quartiersanalyse in Release 4 | Release 4 wird als bearbeitete Integrations-, Stabilisierungs-, Datenpipeline-, Förderprogramm- und Testvorbereitungsphase dokumentiert |
| 2026-06-18 | Verschobene fachliche Erweiterungen | Sanierungskosten, Amortisation, Quartiersanalyse sowie Solar/PV/Geothermie waren im Release-4-Kontext bzw. als optionale Bausteine eingeordnet | Diese Themen werden auf den Nachlauf nach der Sommerpause verschoben |
| 2026-06-18 | Testphase | Beginn externe Testphase in Release 3 bzw. Inbetriebnahmephase nach Release 4 | Testphase mit Expert:innen und Bürger:innen ist Teil der laufenden Entwicklung in den aktuellen Releases |
| 2026-04-15 | Vergleichswert in der Ergebnisanzeige für Bürger | Vergleich mit dem Regensburger Gebäudebestand | Bundesweiter statistischer Vergleichswert |
| 2026-04-15 | Kostenschätzung und davon abhängige Fördermöglichkeiten für Bürger | Release 2 | Release 3 (Klärung und Neubewertung als Voraussetzung für die weitere Umsetzung im Projektverlauf) |
| 2026-04-15 | Umsetzung von Kostenschätzung und davon abhängiger Förderung | Nicht explizit in der Release-Beschreibung ausgewiesen | Release 4 (abhängig von der Klärung in Release 3) |
| 2026-04-14 | Darstellung und Auswahl von Sanierungsmaßnahmen für Bürger | Release 2 | Release 3 |
| 2026-04-14 | Darstellung und Export der Berechnungsergebnisse für Bürger | Release 2 | Release 3 |
| 2026-04-14 | Farbliche Visualisierung von Energiepotenzialen | Release 2 | Release 4 |
| 2026-04-14 | Sprechende Fehlermeldungen und Meldungsmanagement | Release 2 | Release 4 |
| 2026-04-14 | Integration von Datenpersistenz in die Navigation (Dialog Wiederaufnahme aus Local Storage; Dialog Fortfahren oder Neustarten bei Klick auf Logo/Landingpage) | Release 2 | Release 3 |
| 2026-04-14 | Dokumentation Whitelabeling | Release 2 | Release 4 |
| 2026-04-14 | Definition der Anzeigetexte | Release 2 | Release 3 |

<a id="zentrales-register-optionaler-komponenten"></a>

## Zentrales Register optionaler Komponenten

Optionale oder bewusst offen gehaltene Komponenten werden zentral in der [Übersicht optionaler Komponenten](./optional-components-overview.md) gepflegt.

Die Übersicht ergänzt die Release-Planung um:

- Sichtbarkeit optionaler Bausteine über den gesamten Projektverlauf
- eine initiale Einschätzung der Umsetzbarkeit
- einen klaren Status je Komponente (`Offen`, `Beobachten`, `Geplant`, `Zurückgestellt`, `Entscheiden vor Umsetzung`)

Wenn sich Scope, Datenlage oder Betriebsannahmen ändern, müssen Roadmap und Komponentenübersicht gemeinsam aktualisiert werden.

---

<a id="release-1-plattformaufbau"></a>

## Release 1 - Plattformaufbau

**Entwicklungszeitraum:** 02.03.2026 bis 15.03.2026

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


Zugeordnete Anforderungen:

- Fachliche Anforderungen: [FA-70](../requirements/02-functional-requirements.md#fa-70)
- Technische Anforderungen: [TA-01](../requirements/03-technical-requirements.md#ta-01), [TA-02](../requirements/03-technical-requirements.md#ta-02), [TA-03](../requirements/03-technical-requirements.md#ta-03), [TA-04](../requirements/03-technical-requirements.md#ta-04), [TA-05](../requirements/03-technical-requirements.md#ta-05), [TA-06](../requirements/03-technical-requirements.md#ta-06), [TA-07](../requirements/03-technical-requirements.md#ta-07), [TA-08](../requirements/03-technical-requirements.md#ta-08), [TA-09](../requirements/03-technical-requirements.md#ta-09), [TA-10](../requirements/03-technical-requirements.md#ta-10), [TA-11](../requirements/03-technical-requirements.md#ta-11), [TA-14](../requirements/03-technical-requirements.md#ta-14), [TA-16](../requirements/03-technical-requirements.md#ta-16), [TA-17](../requirements/03-technical-requirements.md#ta-17), [TA-18](../requirements/03-technical-requirements.md#ta-18), [TA-19](../requirements/03-technical-requirements.md#ta-19), [TA-20](../requirements/03-technical-requirements.md#ta-20), [TA-21](../requirements/03-technical-requirements.md#ta-21), [TA-22](../requirements/03-technical-requirements.md#ta-22), [TA-23](../requirements/03-technical-requirements.md#ta-23), [TA-24](../requirements/03-technical-requirements.md#ta-24), [TA-25](../requirements/03-technical-requirements.md#ta-25), [TA-26](../requirements/03-technical-requirements.md#ta-26), [TA-27](../requirements/03-technical-requirements.md#ta-27), [TA-28](../requirements/03-technical-requirements.md#ta-28), [TA-29](../requirements/03-technical-requirements.md#ta-29), [TA-30](../requirements/03-technical-requirements.md#ta-30), [TA-31](../requirements/03-technical-requirements.md#ta-31), [TA-35](../requirements/03-technical-requirements.md#ta-35), [TA-37](../requirements/03-technical-requirements.md#ta-37), [TA-38](../requirements/03-technical-requirements.md#ta-38), [TA-40](../requirements/03-technical-requirements.md#ta-40), [TA-41](../requirements/03-technical-requirements.md#ta-41), [TA-42](../requirements/03-technical-requirements.md#ta-42), [TA-45](../requirements/03-technical-requirements.md#ta-45), [TA-52](../requirements/03-technical-requirements.md#ta-52), [TA-53](../requirements/03-technical-requirements.md#ta-53), [TA-54](../requirements/03-technical-requirements.md#ta-54), [TA-55](../requirements/03-technical-requirements.md#ta-55), [TA-56](../requirements/03-technical-requirements.md#ta-56), [TA-57](../requirements/03-technical-requirements.md#ta-57), [TA-58](../requirements/03-technical-requirements.md#ta-58), [TA-59](../requirements/03-technical-requirements.md#ta-59), [TA-60](../requirements/03-technical-requirements.md#ta-60), [TA-61](../requirements/03-technical-requirements.md#ta-61), [TA-63](../requirements/03-technical-requirements.md#ta-63), [TA-64](../requirements/03-technical-requirements.md#ta-64), [TA-72](../requirements/03-technical-requirements.md#ta-72), [TA-73](../requirements/03-technical-requirements.md#ta-73), [TA-87](../requirements/03-technical-requirements.md#ta-87), [TA-88](../requirements/03-technical-requirements.md#ta-88), [TA-89](../requirements/03-technical-requirements.md#ta-89), [TA-90](../requirements/03-technical-requirements.md#ta-90), [TA-91](../requirements/03-technical-requirements.md#ta-91), [TA-92](../requirements/03-technical-requirements.md#ta-92), [TA-93](../requirements/03-technical-requirements.md#ta-93), [TA-94](../requirements/03-technical-requirements.md#ta-94), [TA-95](../requirements/03-technical-requirements.md#ta-95), [TA-96](../requirements/03-technical-requirements.md#ta-96), [TA-102](../requirements/03-technical-requirements.md#ta-102), [TA-103](../requirements/03-technical-requirements.md#ta-103), [TA-104](../requirements/03-technical-requirements.md#ta-104), [TA-105](../requirements/03-technical-requirements.md#ta-105), [TA-108](../requirements/03-technical-requirements.md#ta-108), [TA-109](../requirements/03-technical-requirements.md#ta-109), [TA-110](../requirements/03-technical-requirements.md#ta-110), [TA-111](../requirements/03-technical-requirements.md#ta-111), [TA-112](../requirements/03-technical-requirements.md#ta-112), [TA-113](../requirements/03-technical-requirements.md#ta-113), [TA-114](../requirements/03-technical-requirements.md#ta-114), [TA-115](../requirements/03-technical-requirements.md#ta-115)
---

<a id="release-2"></a>

## Release 2 - Hauptzielgruppe (Bürger/Eigentümer/Vermieter): Öffentlicher Client + Backend-CRUD

**Entwicklungszeitraum:** 16.03.2026 bis 12.04.2026

Ziel: Primärfunktionen für die Hauptzielgruppe bereitstellen und einen ersten nutzbaren End-to-End-Flow bis zur Bewertung des Ist-Zustands ermöglichen.

Änderung gegenüber Stand 2026-03-13:

- Bisheriger Stand: Release 2 enthielt zusätzlich die Darstellung und Auswahl von Sanierungsmaßnahmen für Bürger, die Darstellung der Berechnungsergebnisse inklusive Vergleichswert, den Export der Berechnungsergebnisse, die Klärung der Umsetzung von Kostenschätzung und davon abhängigen Fördermöglichkeiten, die farbliche Visualisierung von Energiepotenzialen, sprechende Fehlermeldungen, die Integration der Datenpersistenz in die Navigation, die Dokumentation Whitelabeling sowie die Definition der Anzeigetexte.
- Neuer Stand: Diese Inhalte wurden aus Release 2 herausgelöst und in Release 3 bzw. Release 4 verschoben.

Umfang öffentlicher Client:

- 3D-Kartenansicht.
- Auswahl eines Gebäudes über 3D-Ansicht und/oder Adresseingabe.
- Darstellung des Ist-Zustands inklusive Berechnung und Plausibilitätscheck.
- Footer-Bereich: Impressum, Datenschutz, Einwilligungsverwaltung.

Umfang Backend:

- Backend-Implementierung inklusive CRUD-Funktionalitäten für die MVP-relevanten Datenflüsse.

Ergebnis:

- Erstes nutzbares Bürgerangebot für Gebäudeauswahl, Ist-Zustand, Berechnung und Grundbewertung.


Zugeordnete Anforderungen:

- Fachliche Anforderungen: [FA-01](../requirements/02-functional-requirements.md#fa-01), [FA-02](../requirements/02-functional-requirements.md#fa-02), [FA-03](../requirements/02-functional-requirements.md#fa-03), [FA-07](../requirements/02-functional-requirements.md#fa-07), [FA-08](../requirements/02-functional-requirements.md#fa-08), [FA-09](../requirements/02-functional-requirements.md#fa-09), [FA-10](../requirements/02-functional-requirements.md#fa-10), [FA-11](../requirements/02-functional-requirements.md#fa-11), [FA-12](../requirements/02-functional-requirements.md#fa-12), [FA-13](../requirements/02-functional-requirements.md#fa-13), [FA-14](../requirements/02-functional-requirements.md#fa-14), [FA-15](../requirements/02-functional-requirements.md#fa-15), [FA-16](../requirements/02-functional-requirements.md#fa-16), [FA-17](../requirements/02-functional-requirements.md#fa-17), [FA-18](../requirements/02-functional-requirements.md#fa-18), [FA-19](../requirements/02-functional-requirements.md#fa-19), [FA-20](../requirements/02-functional-requirements.md#fa-20), [FA-21](../requirements/02-functional-requirements.md#fa-21), [FA-22](../requirements/02-functional-requirements.md#fa-22), [FA-23](../requirements/02-functional-requirements.md#fa-23), [FA-24](../requirements/02-functional-requirements.md#fa-24), [FA-25](../requirements/02-functional-requirements.md#fa-25), [FA-26](../requirements/02-functional-requirements.md#fa-26), [FA-27](../requirements/02-functional-requirements.md#fa-27), [FA-28](../requirements/02-functional-requirements.md#fa-28), [FA-29](../requirements/02-functional-requirements.md#fa-29), [FA-30](../requirements/02-functional-requirements.md#fa-30), [FA-39](../requirements/02-functional-requirements.md#fa-39), [FA-40](../requirements/02-functional-requirements.md#fa-40), [FA-41](../requirements/02-functional-requirements.md#fa-41), [FA-65](../requirements/02-functional-requirements.md#fa-65), [FA-66](../requirements/02-functional-requirements.md#fa-66), [FA-67](../requirements/02-functional-requirements.md#fa-67), [FA-73](../requirements/02-functional-requirements.md#fa-73), [FA-78](../requirements/02-functional-requirements.md#fa-78), [FA-79](../requirements/02-functional-requirements.md#fa-79), [FA-80](../requirements/02-functional-requirements.md#fa-80), [FA-81](../requirements/02-functional-requirements.md#fa-81), [FA-83](../requirements/02-functional-requirements.md#fa-83), [FA-84](../requirements/02-functional-requirements.md#fa-84), [FA-91](../requirements/02-functional-requirements.md#fa-91), [FA-92](../requirements/02-functional-requirements.md#fa-92), [FA-93](../requirements/02-functional-requirements.md#fa-93), [FA-94](../requirements/02-functional-requirements.md#fa-94), [FA-95](../requirements/02-functional-requirements.md#fa-95), [FA-96](../requirements/02-functional-requirements.md#fa-96), [FA-97](../requirements/02-functional-requirements.md#fa-97), [FA-98](../requirements/02-functional-requirements.md#fa-98), [FA-99](../requirements/02-functional-requirements.md#fa-99), [FA-105](../requirements/02-functional-requirements.md#fa-105), [FA-106](../requirements/02-functional-requirements.md#fa-106), [FA-107](../requirements/02-functional-requirements.md#fa-107), [FA-108](../requirements/02-functional-requirements.md#fa-108), [FA-109](../requirements/02-functional-requirements.md#fa-109), [FA-110](../requirements/02-functional-requirements.md#fa-110), [FA-111](../requirements/02-functional-requirements.md#fa-111), [FA-112](../requirements/02-functional-requirements.md#fa-112), [FA-113](../requirements/02-functional-requirements.md#fa-113), [FA-114](../requirements/02-functional-requirements.md#fa-114), [FA-115](../requirements/02-functional-requirements.md#fa-115), [FA-116](../requirements/02-functional-requirements.md#fa-116), [FA-117](../requirements/02-functional-requirements.md#fa-117)
- Technische Anforderungen: [TA-65](../requirements/03-technical-requirements.md#ta-65), [TA-66](../requirements/03-technical-requirements.md#ta-66), [TA-67](../requirements/03-technical-requirements.md#ta-67), [TA-68](../requirements/03-technical-requirements.md#ta-68), [TA-69](../requirements/03-technical-requirements.md#ta-69), [TA-70](../requirements/03-technical-requirements.md#ta-70), [TA-74](../requirements/03-technical-requirements.md#ta-74), [TA-75](../requirements/03-technical-requirements.md#ta-75), [TA-84](../requirements/03-technical-requirements.md#ta-84), [TA-86](../requirements/03-technical-requirements.md#ta-86), [TA-106](../requirements/03-technical-requirements.md#ta-106), [TA-107](../requirements/03-technical-requirements.md#ta-107), [TA-121](../requirements/03-technical-requirements.md#ta-121), [TA-122](../requirements/03-technical-requirements.md#ta-122), [TA-123](../requirements/03-technical-requirements.md#ta-123), [TA-124](../requirements/03-technical-requirements.md#ta-124), [TA-125](../requirements/03-technical-requirements.md#ta-125), [TA-126](../requirements/03-technical-requirements.md#ta-126), [TA-127](../requirements/03-technical-requirements.md#ta-127), [TA-128](../requirements/03-technical-requirements.md#ta-128), [TA-129](../requirements/03-technical-requirements.md#ta-129), [TA-130](../requirements/03-technical-requirements.md#ta-130), [TA-131](../requirements/03-technical-requirements.md#ta-131), [TA-132](../requirements/03-technical-requirements.md#ta-132)
---

<a id="release-3"></a>

## Release 3 - Umsetzung Bürger-Abschlussfunktionen, Rechenkern und Verwaltungsbereich

**Entwicklungszeitraum:** 13.04.2026 bis 10.05.2026

Ziel: Die gegenüber dem Stand 2026-03-13 verschobenen Bürger-Abschlussfunktionen, Rechenkern-Erweiterungen, Sanierungslogik, Exportfunktionen und den Verwaltungsbereich in einen nutzbaren Entwicklungsstand bringen.

Änderung gegenüber Stand 2026-03-13:

- Bisheriger Stand: Release 3 fokussierte Verwaltungsbereich, Datenfreigabe/Wärmeplanung, Triage- und Löschprozess sowie den Beginn der externen Testphase.
- Neuer Stand: Release 3 umfasst zusätzlich die Darstellung und Auswahl von Sanierungsmaßnahmen für Bürger, die Darstellung der Berechnungsergebnisse inklusive bundesweitem statistischem Vergleichswert, den Export der Berechnungsergebnisse, die Integration der Datenpersistenz in die Navigation sowie die Definition der Anzeigetexte; zusätzlich werden Kostenschätzung und davon abhängige Fördermöglichkeiten in Release 3 geklärt und neu bewertet, um eine weitere Umsetzung im Projektverlauf abzusichern.

Bearbeitet / umgesetzt:

- Rechenkern, Energiekern und Kalkulationskern erweitert, validiert und fachlich abgestimmt.
- Sanierungslogik vorbereitet und im Bürger-Frontend angebunden.
- Ergebnisdarstellung, Session-Wiederaufnahme und PDF-/Export-Funktion vorbereitet bzw. umgesetzt.
- Admin-/Systempflege, Konfigurationspflege, Gebäudeliste, Dashboard und Triage im Verwaltungsbereich ausgebaut.
- Anzeigetexte, Hinweise, UX-Abstimmungen und Testunterlagen vorbereitet.
- Infrastruktur- und Integrationsvorbereitung begonnen, insbesondere Frontend-Deployments sowie Keycloak-/APISIX-/CIVITAS/CORE-Themen.

Hinweis:

- Sanierungskosten und davon abhängige Amortisation wurden fachlich vorbereitet, aber nicht als MVP-Bestandteil vor der Sommerpause fest eingeplant; die Umsetzung wird in den Nachlauf nach der Sommerpause verschoben.
- Für den Vergleichswert wird ein bundesweiter statistischer Referenzwert herangezogen, da der Regensburger Datensatz keinen fachlich belastbaren Vergleich ermöglicht.

Ergebnis:

- Rechenkern, Bürger-Abschlussfunktionen und Verwaltungsbereich wurden gegenüber Release 2 deutlich erweitert. Release 3 bildet damit den Übergang vom ersten nutzbaren Bürgerangebot zu einem administrierbaren MVP-Stand mit Ergebnisdarstellung, Sanierungslogik, Exportvorbereitung und Testvorbereitung.


Zugeordnete Anforderungen:

- Fachliche Anforderungen: [FA-31](../requirements/02-functional-requirements.md#fa-31), [FA-32](../requirements/02-functional-requirements.md#fa-32), [FA-33](../requirements/02-functional-requirements.md#fa-33), [FA-34](../requirements/02-functional-requirements.md#fa-34), [FA-37](../requirements/02-functional-requirements.md#fa-37), [FA-38](../requirements/02-functional-requirements.md#fa-38), [FA-42](../requirements/02-functional-requirements.md#fa-42), [FA-43](../requirements/02-functional-requirements.md#fa-43), [FA-44](../requirements/02-functional-requirements.md#fa-44), [FA-45](../requirements/02-functional-requirements.md#fa-45), [FA-46](../requirements/02-functional-requirements.md#fa-46), [FA-47](../requirements/02-functional-requirements.md#fa-47), [FA-48](../requirements/02-functional-requirements.md#fa-48), [FA-49](../requirements/02-functional-requirements.md#fa-49), [FA-50](../requirements/02-functional-requirements.md#fa-50), [FA-51](../requirements/02-functional-requirements.md#fa-51), [FA-52](../requirements/02-functional-requirements.md#fa-52), [FA-53](../requirements/02-functional-requirements.md#fa-53), [FA-54](../requirements/02-functional-requirements.md#fa-54), [FA-55](../requirements/02-functional-requirements.md#fa-55), [FA-57](../requirements/02-functional-requirements.md#fa-57), [FA-68](../requirements/02-functional-requirements.md#fa-68), [FA-69](../requirements/02-functional-requirements.md#fa-69), [FA-74](../requirements/02-functional-requirements.md#fa-74), [FA-82](../requirements/02-functional-requirements.md#fa-82), [FA-86](../requirements/02-functional-requirements.md#fa-86), [FA-87](../requirements/02-functional-requirements.md#fa-87), [FA-88](../requirements/02-functional-requirements.md#fa-88), [FA-90](../requirements/02-functional-requirements.md#fa-90)
- Technische Anforderungen: [TA-32](../requirements/03-technical-requirements.md#ta-32), [TA-33](../requirements/03-technical-requirements.md#ta-33), [TA-34](../requirements/03-technical-requirements.md#ta-34), [TA-36](../requirements/03-technical-requirements.md#ta-36), [TA-39](../requirements/03-technical-requirements.md#ta-39), [TA-43](../requirements/03-technical-requirements.md#ta-43), [TA-44](../requirements/03-technical-requirements.md#ta-44), [TA-46](../requirements/03-technical-requirements.md#ta-46), [TA-47](../requirements/03-technical-requirements.md#ta-47), [TA-48](../requirements/03-technical-requirements.md#ta-48), [TA-49](../requirements/03-technical-requirements.md#ta-49), [TA-50](../requirements/03-technical-requirements.md#ta-50), [TA-51](../requirements/03-technical-requirements.md#ta-51), [TA-62](../requirements/03-technical-requirements.md#ta-62), [TA-76](../requirements/03-technical-requirements.md#ta-76), [TA-77](../requirements/03-technical-requirements.md#ta-77), [TA-78](../requirements/03-technical-requirements.md#ta-78), [TA-79](../requirements/03-technical-requirements.md#ta-79), [TA-80](../requirements/03-technical-requirements.md#ta-80), [TA-81](../requirements/03-technical-requirements.md#ta-81), [TA-83](../requirements/03-technical-requirements.md#ta-83), [TA-85](../requirements/03-technical-requirements.md#ta-85)
---

<a id="release-4"></a>

## Release 4 - Integration, Stabilisierung, Datenpipeline und Testvorbereitung

**Entwicklungszeitraum:** 11.05.2026 bis 18.06.2026

Änderung gegenüber Stand 2026-03-13:

- Bisheriger Stand: Release 4 enthielt Amortisation, Feedback-Funktion, Gebäudeeinfärbung und Quartiersanalyse.
- Neuer Stand: Release 4 wurde tatsächlich vor allem für Integration, Stabilisierung, Backend-/Admin-Anbindung, Datenpipeline, Testvorbereitung und Förderprogramm-Anbindung genutzt. Sanierungskosten, Amortisation, Quartiersanalyse sowie Solar/PV/Geothermie werden auf den Nachlauf nach der Sommerpause verschoben.

Bearbeitet / umgesetzt:

- Admin-Backend, Admin-Authentifizierung, Backend-/Admin-Frontend-Anbindung und Build-/Deployment-Pipelines umgesetzt bzw. stabilisiert.
- Bürger-Frontend weiterentwickelt, insbesondere UI-Korrekturen, Labels, Tooltips/Dialoge, i18n, mobile Prüfung und Adresssuche/Geocoder.
- Offline-Enrichment und Datenpipeline erweitert, insbesondere angrenzende Gebäude, Gebäudealtersklassen, Adressdatenbank und Pipeline-Debugging.
- Förderprogramm-Anbindung über Nanostores vorbereitet und mit Backend, Datenbank, Admin-Frontend und Bürger-Frontend angebunden.
- CIVITAS/CORE-, Staging-, RustFS-/S3- und Deployment-Themen bearbeitet.
- Fragebögen, Testing mit Expert:innen und Bürger:innen sowie Auswertung erster Rückmeldungen vorbereitet und begleitet.
- Matomo recherchiert und als mögliches Analyse-/Tracking-Thema geprüft.

Hinweis:

- BKI-Daten sind im aktuellen Zeitplan nicht verfügbar. Der Auftraggeber hat entschieden, stattdessen einen alternativen Kostenkatalog für Sanierungsmaßnahmen durch den unterbeauftragten Energieberater anfertigen zu lassen; der dazugehörige Nachtrag ist derzeit in Klärung.
- Sanierungskosten und die daraus folgende Amortisationsdarstellung werden nach der Sommerpause auf Basis der Nachtragsklärung und des alternativen Kostenkatalogs weitergeführt.
- Quartiersanalyse sowie Solar/PV/Geothermie werden ebenfalls nach der Sommerpause eingeordnet, da sie nicht Teil der vor der Sommerpause abzusichernden MVP-Inbetriebnahme sind.
- Die Testphase ist kein separater Release-Block, sondern Teil der laufenden Entwicklung und Stabilisierung.

Zugeordnete Anforderungen:

- Fachliche Anforderungen: [FA-04](../requirements/02-functional-requirements.md#fa-04), [FA-05](../requirements/02-functional-requirements.md#fa-05), [FA-06](../requirements/02-functional-requirements.md#fa-06), [FA-35](../requirements/02-functional-requirements.md#fa-35), [FA-36](../requirements/02-functional-requirements.md#fa-36), [FA-56](../requirements/02-functional-requirements.md#fa-56), [FA-59](../requirements/02-functional-requirements.md#fa-59), [FA-60](../requirements/02-functional-requirements.md#fa-60), [FA-61](../requirements/02-functional-requirements.md#fa-61), [FA-62](../requirements/02-functional-requirements.md#fa-62), [FA-63](../requirements/02-functional-requirements.md#fa-63), [FA-64](../requirements/02-functional-requirements.md#fa-64), [FA-71](../requirements/02-functional-requirements.md#fa-71), [FA-72](../requirements/02-functional-requirements.md#fa-72), [FA-75](../requirements/02-functional-requirements.md#fa-75), [FA-76](../requirements/02-functional-requirements.md#fa-76), [FA-77](../requirements/02-functional-requirements.md#fa-77), [FA-85](../requirements/02-functional-requirements.md#fa-85), [FA-100](../requirements/02-functional-requirements.md#fa-100), [FA-101](../requirements/02-functional-requirements.md#fa-101), [FA-102](../requirements/02-functional-requirements.md#fa-102), [FA-103](../requirements/02-functional-requirements.md#fa-103), [FA-104](../requirements/02-functional-requirements.md#fa-104)
- Technische Anforderungen: [TA-12](../requirements/03-technical-requirements.md#ta-12), [TA-13](../requirements/03-technical-requirements.md#ta-13), [TA-71](../requirements/03-technical-requirements.md#ta-71), [TA-97](../requirements/03-technical-requirements.md#ta-97), [TA-98](../requirements/03-technical-requirements.md#ta-98), [TA-99](../requirements/03-technical-requirements.md#ta-99), [TA-100](../requirements/03-technical-requirements.md#ta-100), [TA-101](../requirements/03-technical-requirements.md#ta-101)

---

<a id="release-5"></a>

## Release 5 - Feature-Finalisierung und laufende Testphase

**Planungszeitraum:** ab 19.06.2026, Sprint 13 und Sprint 14 ab 23.06.2026

Ziel: Die Features finalisieren, die mit der aktuellen Datenlage vor der Sommerpause belastbar bearbeitet werden können, und Rückmeldungen aus der laufenden Testphase direkt in Feinschliff und Stabilisierung überführen.

Geplanter Umfang:

- Abschluss der mit aktueller Datenlage umsetzbaren Bürger- und Verwaltungsfunktionen.
- Feinschliff an Ergebnisdarstellung, Nutzerführung, Texten, Hinweisen und Fehlerbehandlung.
- Stabilisierung von Frontend, Backend, Admin-Bereich, Datenpipeline und Deployment.
- Fortführung der Testphase mit Expert:innen und Bürger:innen.
- Einarbeitung priorisierter Rückmeldungen aus Tests und Auftraggeber-Abstimmungen.
- Vorbereitung der Inbetriebnahme-Sprints.

Hinweis:

- Die Testphase ist Teil der laufenden Entwicklung und kein separater Release- oder Abnahmeblock.
- Nicht mehr vor der Sommerpause eingeplant sind Sanierungskosten, Amortisation, Quartiersanalyse sowie Solar/PV/Geothermie.

Ergebnis:

- Stabiler MVP-Kandidat für die Inbetriebnahme, dessen Umfang auf die vorliegende Datenlage und die vor der Sommerpause realistisch absicherbaren Funktionen begrenzt ist.

---

<a id="release-6-inbetriebnahme"></a>

## Release 6 / Inbetriebnahme vor der Sommerpause

**Planungszeitraum:** voraussichtlich Sprint 15 und optional Sprint 16 bis Ende Juli 2026

Ziel: Den MVP vor der Sommerpause in Betrieb nehmen und die Übergabe in einen nutzbaren Betriebszustand absichern.

Geplanter Umfang:

- Finales Deployment und produktionsnahe Konfiguration.
- Stabilisierung der Betriebsumgebung und relevanter Schnittstellen.
- Prüfung der Kernprozesse für Bürger-Frontend, Verwaltungsbereich, Datenpipeline und Export-/Datenübermittlungswege.
- Behebung kritischer Fehler aus Testphase und Inbetriebnahmeprüfung.
- Abstimmung mit den Ansprechpartnern beim Auftraggeber.
- Dokumentation der MVP-Grenzen, bekannten Einschränkungen und offenen Punkte für den Nachlauf.

Planungsannahme:

- Sprints 13, 14 und 15 können vor der Sommerpause sicher abgeschlossen werden.
- Sprint 16 ist abhängig vom konkreten Enddatum und von der Verfügbarkeit der Ansprechpartner beim Auftraggeber.
- Die letzten beiden tatsächlich verfügbaren Sprints vor der Sommerpause werden für die Inbetriebnahme reserviert. Bei Durchführung von Sprint 16 sind dies Sprint 15 und Sprint 16; falls Sprint 16 nicht vollständig nutzbar ist, wird die Inbetriebnahme entsprechend früher verdichtet.

Ergebnis:

- In Betrieb genommener MVP mit dokumentiertem Umfang, dokumentierten offenen Punkten und vorbereiteter Weiterarbeit nach der Sommerpause.

---

<a id="nachlauf-nach-der-sommerpause"></a>

## Nachlauf nach der Sommerpause

**Planungszeitraum:** 3 bis 4 Sprints nach der Sommerpause

Ziel: Rückmeldungen aus Testphase und Inbetriebnahme einarbeiten, offene Punkte schließen und fachliche Erweiterungen umsetzen, die bewusst aus dem MVP vor der Sommerpause herausgelöst wurden.

Geplanter Umfang:

- Anpassungen aus Expert:innen-, Bürger:innen- und Auftraggeber-Rückmeldungen.
- Umsetzung oder Neubewertung offener Punkte aus der MVP-Inbetriebnahme.
- Sanierungskosten und daraus abgeleitete Amortisationsdarstellung auf Basis des alternativen Kostenkatalogs, sofern der dazugehörige Nachtrag geklärt ist.
- Quartiersanalyse.
- Solar/PV/Geothermie, sofern Datenlage, fachliche Freigabe und Priorisierung dies zulassen.
- Weitere Stabilisierung, Dokumentation und Betriebsverbesserungen.

Hinweis:

- Die genannten Nachlauf-Themen sind nicht Voraussetzung für die MVP-Inbetriebnahme vor der Sommerpause.
- Solar/PV/Geothermie bleiben abhängig von belastbaren Datensätzen, fachlicher Freigabe und konkreter Priorisierung.
