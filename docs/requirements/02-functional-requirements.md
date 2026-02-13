# Fachliche Anforderungen – Digitaler Energie Zwilling (DEZ)

## Inhaltsverzeichnis

1. [Ziel der fachlichen Anforderungen](#ziel-der-fachlichen-anforderungen)
2. [Nutzerrollen](#nutzerrollen)
3. [Fachliche Hauptfunktionen](#fachliche-hauptfunktionen)
4. [Fachliche Anforderungen an die Administration (Stadtverwaltung / Fachpersonal)](#fachliche-anforderungen-an-die-administration-stadtverwaltung-fachpersonal)
5. [Fachliche Abgrenzungen](#fachliche-abgrenzungen)
6. [Erweiterte Anforderungen](#erweiterte-anforderungen)
7. [Offene MVP-Klärung: Solarthermie, PV und Geothermie](#offene-mvp-klaerung-solarthermie-pv-und-geothermie)
8. [Priorisierung (implizit)](#priorisierung-implizit)
9. [Übergang zu technischen Anforderungen](#uebergang-zu-technischen-anforderungen)

<a id="ziel-der-fachlichen-anforderungen"></a>

## Ziel der fachlichen Anforderungen

Dieses Dokument beschreibt die **fachlichen Anforderungen** an den Digitaler Energie Zwilling (DEZ).  
Es beantwortet die Frage, **welche Funktionen und Nutzungsmöglichkeiten** das System aus Sicht der Anwender bereitstellen muss, unabhängig von der konkreten technischen Umsetzung.

Die fachlichen Anforderungen sind bewusst **indikativ** formuliert und bilden die Grundlage für die technische Ausgestaltung und Architekturentscheidungen.

Verbindlichkeit: **MUSS** = verpflichtend, **SOLL** = wünschenswert/nice-to-have, **KANN** = optional.

---

<a id="nutzerrollen"></a>

## Nutzerrollen

### Bürger (Eigentümer/Vermieter)

Bürger (Eigentümer/Vermieter) nutzen den Digitaler Energie Zwilling (DEZ) ohne Authentifizierung, um sich einen Überblick über energetische Potenziale einzelner Gebäude zu verschaffen und einfache Szenarien zu simulieren.  
Fokus liegt auf einer ersten Orientierung für Sanierungsentscheidungen.

### Stadtverwaltung / Fachpersonal

Fachpersonal nutzt den Digitaler Energie Zwilling (DEZ) über einen geschützten administrativen Bereich zur Pflege von Parametern, Qualitätssicherung und zur Sichtung von Nutzereingaben.

---

<a id="fachliche-hauptfunktionen"></a>

## Fachliche Hauptfunktionen

### Visualisierung des Stadtmodells

**FA-01**  
Das System muss ein dreidimensionales Stadtmodell des Stadtgebiets Regensburg bereitstellen.

**FA-02**  
Gebäude müssen einzeln auswählbar sein.

**FA-03**  
Zu jedem Gebäude müssen energetische Potenziale visuell darstellbar sein.

---

### Anzeige energetischer Potenziale

**FA-04**  
Das System muss Solarpotenziale (PV) auf Gebäude- oder Dachflächenebene anzeigen können.

**FA-05**  
Das System muss Geothermiepotenziale gebäudebezogen anzeigen können.

**FA-06**  
Die Potenziale müssen für den Nutzer verständlich und vergleichbar dargestellt werden.

> ⚠️ **Hinweis:** Solarthermie ist als zusätzliche Sanierungsmaßnahme zur Warmwasserbereitung fachlich vorgesehen. Der konkrete MVP-Umfang bleibt in diesem Punkt in Klärung.

---

### Interaktive Simulation (Bürger (Eigentümer/Vermieter))

**FA-07**  
Bürger müssen für ein ausgewähltes Gebäude einfache energetische Szenarien simulieren können.

**FA-08**  
Die Simulation muss Eingabemöglichkeiten für typische Sanierungsmaßnahmen bieten, z.B.:

- Fenster
- Dämmung
- Heizungsart

**FA-09**  
Simulationsergebnisse müssen unmittelbar oder mit minimaler Verzögerung dargestellt werden.

**FA-10**  
Simulationsergebnisse müssen verständlich und nicht fachlich überladen präsentiert werden.

---

### Eingabetiefe-Spektrum (Bürger (Eigentümer/Vermieter))

**FA-11**  
Das System muss ein kontinuierliches Eingabetiefe-Spektrum unterstützen, von "keine Nutzereingabe" bis "vollständig durch Nutzer definiert", ohne feste Stufenlogik.

**FA-12**  
Am unteren Ende des Spektrums müssen Simulationen ohne Nutzereingaben auskommen und auf LOD2, Baualtersklasse und Standardannahmen basieren.

**FA-13**  
Bei wenigen manuell ergänzten Angaben (z.B. Baujahr) müssen schnelle Erstwerte geliefert werden.

**FA-14**  
Mit zunehmender manueller Eingabetiefe müssen bauteilspezifische Eingaben möglich sein.

**FA-15**  
Bei hoher manueller Eingabetiefe müssen detaillierte Eingaben möglich sein; Förderparameter pro Maßnahme sollen optional erfassbar sein.

### Eingabefelder entlang des Spektrums (Spezifikation)

| Orientierungsbereich im Spektrum (keine festen Stufen) | Pflichtangaben                                        | Optionale Angaben                                                                                                                                                                    |
| ------------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Ohne Nutzereingabe                                     | keine                                                 | keine                                                                                                                                                                                |
| Grundangaben                                           | Baujahr                                               | Energieträger, Jahresverbrauch oder Kosten, Warmwasser elektrisch (Ja/Nein), Personenanzahl (Klassen)                                                                                |
| Bauteile und Anlage                                    | Bauteilzustände je Dach/Außenwand/Fenster/Kellerdecke | Heizflächenart, Erzeugerart, Baujahre je Bauteil                                                                                                                                     |
| Detaillierung                                          | keine zusätzlichen globalen Pflichtangaben            | Überschreiben von Defaults je Bauteil, Dämmung ja/nein, Sanierungsjahr, Verglasungsart/Rahmen |
| Szenarien und Kombinationen                            | Auswahl mindestens einer Sanierungsmaßnahme           | Kombinationen, Budget, Förderlogik (optional)                                                                                                                                        |

> ⚠️ **Hinweis:** Die genannten Eingaben bilden keine festen Stufen. Sie können entlang eines kontinuierlichen Spektrums bedarfsorientiert kombiniert werden.
>
> Luftdichtheit wird nicht direkt durch Nutzer eingegeben, sondern aus allgemeinen Annahmen (Katalogwerte und Baualter) referenziert.
>
> Alle Eingaben sind als „automatisch“, „manuell“ oder „geschätzt“ zu kennzeichnen.

### Konkretisierung aus dem Grobkonzept (Arbeitsmappe 30-01-26)

Quelle: `30-01-26_-Übersicht Berechnung Grobkonzept.xlsx`

Interpretation für dieses Dokument:

- Datenstufe 1 = unteres Ende des Spektrums (keine Nutzereingabe, nur LOD2/Katalog/Standardannahmen).
- Datenstufe 2 = oberes Ende des Spektrums (maximale Nutzereingabe, inkl. Überschreibungen und Detailparameter).

| Domäne                      | Unteres Ende (keine Nutzereingabe)                                                   | Oberes Ende (maximale Nutzereingabe)                                                            | Geplante Sanierungsmaßnahmen                                                           |
| --------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Dach und Dachfenster        | Flächen aus LOD, U-Werte über Baujahr/Baualtersklasse (Kat. 1), Standardfaktoren     | Manuelle Flächenangaben, manuelle U-Werte bzw. schichtbasierte Ermittlung, Konstruktionsangaben | Dachdämmung/Komplettsanierung (Richtwert U=0,14), Dachfenstertausch (Richtwert U=1,00) |
| OGD                         | Grundfläche aus LOD, U-Wert über Baujahr/Baualtersklasse, Standardkonstruktion       | Manuelle Flächenangabe, schichtbasierte U-Wert-Ermittlung, Detaillierung der Konstruktion       | OGD-Dämmung/Komplettsanierung (Richtwert U=0,14)                                       |
| Außenwand und Fenster/Türen | Außenwand/Fensterflächen über LOD-Annahmen, U-Werte aus Baujahr/Baualtersklasse      | Manuelle Flächen/U-Werte, konstruktive Detaillierung (Rahmen/Glas/Schichten)                    | AW-Dämmung bzw. Austausch (Richtwert U=0,20), Fenstertausch (Richtwert U=0,95)         |
| UGD                         | Fläche aus LOD-Grundfläche, U-Wert aus Baujahr/Baualtersklasse, Standardkonstruktion | Manuelle Flächen/U-Werte und Konstruktionsdetails (z.B. Decke/Boden gegen Erdreich)             | UGD-Dämmung (Richtwert U=0,25)                                                         |
| Heizung/Anlage              | Standardannahmen aus Baujahr, Energieträger- und Erzeuger-Katalog                    | Detaileingaben zu Systemart, Erzeugerart, Heizflächenart, Zusatzheizung und Randbedingungen     | Austausch-/Modernisierungsempfehlungen je Erzeugerart (inkl. erneuerbarer Optionen)    |

### Explizite offene Punkte aus dem Grobkonzept

Die folgenden Inhalte sind im aktuellen Tabellenstand als Platzhalter oder unklar definiert und müssen vor finaler Fachfreigabe konkretisiert werden:

- In den Blättern `OGD`, `AW-Fenster` und `UGD` sind Kosten explizit nur als "Platzhalter für Kosten" enthalten.
- Mehrere Ergebniszellen enthalten im Template `0` oder `#`; diese sind keine validierten Referenzwerte.
- Korrekturfaktor `F` ist für mehrere Bauteile nicht fachlich ausreichend hergeleitet bzw. dokumentiert.
- Im Blatt `Heizung` steht für mehrere Kombinationen nur "Sanierungsempfehlung", ohne nachvollziehbare Entscheidungsregel.
- Im Blatt `Heizung` ist der Fall `Fernwärme` nicht durchgängig mit konkreter Maßnahmenlogik ausgearbeitet.
- Im Blatt `Kat. Heizung` sind einzelne Bezeichnungen/Zeichen fehlerhaft oder uneinheitlich und müssen bereinigt werden, bevor sie als Normkatalog in die produktive Konfiguration übernommen werden.

---

### Berechnungslogik (fachlich)

**FA-16**  
Die Simulation muss Gebäudehülle, Lüftung, Warmwasser und Anlagentechnik berücksichtigen.

**FA-17**  
Transmissionswärmeverluste über Dach, Außenwände, Fenster und Kellerdecke müssen über U-Werte modelliert werden.

**FA-18**  
Wärmebrücken müssen pauschal über einen Faktor auf den U-Wert berücksichtigt werden (eingabeabhängige Genauigkeit).

**FA-19**  
Lüftungswärmeverluste müssen über Luftdichtheitsklasse und Gebäudealter abbildbar sein.

**FA-20**  
Warmwasserbedarf muss bei geringer Eingabetiefe pauschal (Wohnfläche/Personen) und mit zunehmender Eingabetiefe expliziter erfassbar sein.

**FA-21**  
Die Anlagentechnik muss entlang des Eingabetiefe-Spektrums differenziert erfassbar sein (von Standardannahmen bis zu detaillierten Erzeuger- und Anlagenparametern).

**FA-22**  
Primärenergie muss als Vergleichsebene über einen Faktor (Vorkette) ausweisbar sein.

---

### Nutzerführung & Transparenz (Bürger (Eigentümer/Vermieter))

**FA-23**  
Vor der Nutzung muss transparent erklärt werden, welche Daten erhoben, verarbeitet und gespeichert werden.

**FA-24**  
Der Nutzen und die Grenzen des Tools müssen für Nutzer klar und verständlich erklärt werden.

**FA-25**  
Nutzer müssen Gebäude schnell über Adresse oder Auswahl in der Karte finden können.

**FA-26**  
Nutzer müssen sehen, welche Gebäudedaten automatisch übernommen wurden und welche ergänzt werden müssen; Korrekturen müssen möglich sein.

**FA-27**  
Für Eingabewerte muss ersichtlich sein, ob sie automatisch, manuell oder geschätzt sind.

**FA-28**  
Das System muss Hinweise geben, wenn Eingaben untypisch oder unvollständig sind.

**FA-29**  
Die Nutzerführung muss klare, leicht verständliche Formulierungen ohne Expertenjargon nutzen.

**FA-30**  
Das System muss Diagramme, Vergleiche und Visualisierungen bereitstellen, um komplexe Informationen schnell erfassbar zu machen.

---

### Ergebnisdarstellung & Export (Bürger (Eigentümer/Vermieter))

**FA-31**  
Nutzer müssen einzelne oder kombinierte Sanierungsmaßnahmen auswählen und vergleichen können.

**FA-32**  
Das System muss zeigen, wie sich der Energiebedarf je Maßnahme verändert.

**FA-33**  
Das System muss zeigen, wie sich die CO₂-Emissionen je Maßnahme verändern.

**FA-34**  
Die Energieeffizienzklasse vor und nach einer Maßnahme muss vergleichbar dargestellt werden.

**FA-35**  
Zu ausgewählten Maßnahmen müssen passende Förderprogramme (z.B. Links/Kategorien) angezeigt werden.

**FA-36**  
Das System muss eine technische Kostenschätzung ohne Förderung ausweisen.

**FA-37**  
Das System muss eine klare Zusammenfassung der Ergebnisse bereitstellen.

**FA-38**  
Nutzer müssen einen PDF-Report der Ergebnisse exportieren können; zusätzlich muss eine JSON-Datei des Reports angeboten werden. Eine Datei wird nur bei explizitem Export erzeugt. Details zu Inhalten siehe FA-74.

**FA-39**  
Das System muss konkrete Hinweise zu möglichen nächsten Schritten geben.

---

### Datenschutzfreundliche Nutzung

**FA-40**  
Bürger müssen den Digitaler Energie Zwilling (DEZ) nutzen können, ohne personenbezogene Daten zu übermitteln.

**FA-41**  
Die Durchführung einer Simulation darf nicht zwingend eine Speicherung oder Übertragung von Nutzereingaben erfordern.

---

### Speicherung von Nutzereingaben (optional)

**FA-42**  
Bürger müssen optional die Möglichkeit haben, ihre Eingaben und Ergebnisse an das System zu übermitteln.

**FA-43**  
Übermittelte Nutzereingaben müssen eindeutig einem Gebäude zuordenbar sein.

---

<a id="fachliche-anforderungen-an-die-administration-stadtverwaltung-fachpersonal"></a>

## Fachliche Anforderungen an die Administration (Stadtverwaltung / Fachpersonal)

### Zugriff & Rollen

**FA-44**  
Fachpersonal muss sich im internen Bereich des Systems anmelden können, um administrative Funktionen zu nutzen.

---

### Konfigurationsmanagement

**FA-45**  
Fachpersonal muss Simulationsparameter pflegen und anpassen können.

**FA-46**  
Änderungen an Simulationsparametern müssen ohne Softwareanpassung möglich sein.

**FA-47**  
Simulationsparameter müssen versionierbar sein.

---

### Triage und Qualitätssicherung

**FA-48**  
Fachpersonal muss übermittelte Nutzereingaben sichten können.

**FA-49**  
Nutzereingaben müssen klassifizierbar und kommentierbar sein.

**FA-50**  
Fachpersonal muss in der Lage sein, relevante Fälle für eine weitere Bearbeitung zu identifizieren.

**FA-51**  
Fachpersonal muss eine Übersicht aller eingegangenen Nutzereingaben sehen können.

**FA-52**  
Fachpersonal muss Nutzereingaben filtern können.

**FA-53**  
Fachpersonal muss mehrere Nutzereingaben zu einem Gebäude vergleichen können.

**FA-54**  
Fachpersonal muss Energieeffizienzklassen definieren und bearbeiten können.

**FA-55**  
Fachpersonal muss auswählbare Eingabeoptionen (z.B. Gebäudetypen, Heizungsarten) bearbeiten können.

**FA-56**  
Fachpersonal muss Förderprogramme (Links/Kategorien) pflegen können.

---

### Reporting & Export

**FA-57**  
Fachpersonal muss geprüfte Daten strukturiert bereitstellen können, damit sie verständlich und zuverlässig in der Wärmeplanung genutzt werden können.

**FA-58**  
Fachpersonal muss übermittelte Daten exportieren können, damit sie intern weiterverwendet werden können.

**FA-59**  
Fachpersonal muss Berichte pro Quartier generieren können.

---

### Quartiersanalyse & Planung

**FA-60**  
Fachpersonal muss Quartiere nach energetischen Kennzahlen vergleichen können.

**FA-61**  
Fachpersonal muss Hotspots mit besonders hohem Energiebedarf identifizieren können.

**FA-62**  
Fachpersonal muss die Möglichkeiten für erneuerbare Energien visuell darstellen können, um geeignete Flächen zu identifizieren.

**FA-63**  
Fachpersonal muss erkennen können, welche Quartiere den größten Bedarf haben, um Prioritäten für die Wärmeplanung zu setzen.

**FA-64**  
Fachpersonal muss aus der Analyse Empfehlungen ableiten können, welche Maßnahmen sinnvoll sind.

---

<a id="fachliche-abgrenzungen"></a>

## Fachliche Abgrenzungen

**FA-65**  
Der Digitaler Energie Zwilling (DEZ) ersetzt keine individuelle Energieberatung.

**FA-66**  
Simulationsergebnisse stellen keine förderfähigen Berechnungen dar.

**FA-67**  
Das System liefert keine rechtsverbindlichen Aussagen.

---

<a id="erweiterte-anforderungen"></a>

## Erweiterte Anforderungen

**FA-68**  
Das System muss eine anonymisierte Datenerfassung unterstützen; personenbezogene Eingaben sind auf das notwendige Minimum zu begrenzen (z.B. Personenanzahl als Klassen 1–5 bzw. >5).

**FA-69**  
Personenbezogene Angaben sollen, wenn fachlich nicht zwingend erforderlich, nur in klassifizierter oder aggregierter Form erfasst werden.

**FA-70**  
Der Bürgerbereich muss ohne Registrierung nutzbar sein; der aktuelle Bearbeitungszustand muss für Wiederbesuche standardmäßig über einen notwendigen Cookie persistiert werden.

**FA-71**  
Nach Abschluss einer Berechnung soll ein Feedback-Formular automatisch angeboten werden; zusätzlich soll ein Feedback-Button jederzeit verfügbar sein.

**FA-72**  
Fehler müssen über klare, „sprechende“ Fehlermeldungen kommuniziert werden (z.B. „Eingabedaten ungültig“, „Bitte Seite neu laden“, „Kontaktieren Sie Support“).

**FA-73**  
Die Benutzeroberfläche muss barrierefrei gemäß § 4 BGG konzipiert sein und vollständig responsiv für Desktop, Tablet und Mobile sein.

**FA-74**  
Das System muss eine Reporting-Funktion bereitstellen: PDF-Report (max. 5 Seiten, CI/CD-konform) und JSON-Export für maschinelle Weiterverarbeitung.
Der Report muss mindestens enthalten:

- Projektinfo (Gebäudename/Projektname/Adresse)
- Übersicht der Gebäudedaten (inkl. Herkunftskennzeichnung)
- Zusammenfassung der Energieeffizienz-Analyse (aktuelle Klasse, Klasse nach Sanierung, Reduktion Energiebedarf, Reduktion CO₂)
- Strombedarf & Eigenverbrauch (ohne/mit Wärmepumpe, zusätzlicher Strombedarf Luft/Geothermie, Deckungsanteile, Eigennutzungsquote, Einsparungen durch Eigenverbrauch)
- Energiebedarf & Heizkosten (aktuell/neu, jährlich/monatlich, Einsparungen)
- CO₂-Emissionen (aktuell/neu, Einsparung in t CO₂-Äquivalent)
- Sanierungsszenarien je ausgewählter Maßnahme (Komponente, Zustand, Vorschlag, Energie- und Kosteneinsparung)
- Wirtschaftlichkeit (Investitionskosten Hülle/Energiesystem, Einsparungen, Amortisation, Förderungen)
- Sanierungsvorschlag basierend auf Budget (Maßnahmen, Kosten, erwartete Einsparungen)
- Erneuerbare Energien & Eigenversorgung (PV-, Geothermie- und Solarthermiebezug inkl. Erträge/Deckung, Kombination mit Wärmepumpe)
- Vergleich des Gebäudes im Regensburger Bestand (vor/nach Sanierung)
- Farbkodierte Visualisierung der Gebäude im 3D-Client
- Grafische Elemente (Diagramme, farbliche Gebäude-Darstellung)
- CI/CD-konformes Layout; ein IDML-Template kann vom Auftraggeber bereitgestellt werden
- Zusätzlich fünf Kennwerte, die im Projektverlauf definiert werden
- Liste relevanter Förderprogramme mit offiziellen Links
- Konkrete nächste Schritte
- Wenn Daten gespeichert wurden: Link/QR zur Löschanfrage

**FA-75**  
Das System soll eine Sanierungsvariante auf Basis eines Nutzerbudgets vorschlagen können (Ziel: maximale Energiebedarfsreduktion).

**FA-76**  
Das System muss jährliche und monatliche Kosten für Wärme- und Stromversorgung ausweisen sowie Gesamtenergiekosten und Einsparungen (absolut und relativ).

**FA-77**  
Das System muss Varianten für PV und Geothermie (jeweils mehrere Ausprägungen) sowie einen optionalen Energiespeicher berücksichtigen und den Einfluss auf Eigenverbrauch und Kosten darstellen.
Für Energiespeicher sind Dimensionierungen für Haushalte mit und ohne Wärmepumpe vorzusehen; Obergrenzen nach DGS (−20%) sind zu berücksichtigen.

**FA-78**  
Nutzer müssen Energiequelle, Energiepreis und Stromart angeben können; Standardwerte sind vorzubelegen (z.B. Erdgas, 0,09 €/kWh; Strom 0,30 €/kWh).

**FA-79**  
Das System muss Energieeffizienzklassen (A+ bis H) ausweisen und Gebäude verpflichtend farblich nach Effizienz kategorisieren.

**FA-80**  
CO₂-Emissionen müssen BISKO-konform berechnet und ausgewiesen werden.

**FA-81**  
Für alle automatisch abgeleiteten Werte muss die Datenherkunft in UI und Export nachvollziehbar sein (z.B. LOD2, Normtabellen, Baualtersklassen).

**FA-82**  
Nutzer sollen ihre Eingaben jederzeit abbrechen und bei Wiederbesuch automatisch aus dem Cookie wieder aufnehmen können; wenn eine Speicherung im Backend explizit ausgelöst wurde, muss zusätzlich eine Wiederherstellung vom Server möglich sein.

**FA-83**  
Das System soll einen klaren Einstieg („So funktioniert’s“) mit Hinweis auf Datenquellen sowie Aussagekraft und Grenzen der Ergebnisse bieten.

**FA-84**  
Das System soll eine Übersicht der Maßnahmen mit relativem Einsparpotenzial und Kostenniveau bieten und eine Empfehlung für „beste Maßnahme bei Budget X“ ableiten können.

**FA-85**  
Die Herleitung von Empfehlungen soll nachvollziehbar dargestellt werden (z.B. verwendete Eingaben, Annahmen und Datenquellen).

**FA-86**  
Die Verwaltung muss Nutzereingaben je Gebäude gruppiert sehen und mehrere Datensätze vergleichen können.

**FA-87**  
Jeder Nutzerdatensatz muss einen Status besitzen (neu, in Prüfung, freigegeben, unplausibel) und die Statusänderung muss nachvollziehbar sein.

**FA-88**  
Die Verwaltung muss Datensätze filtern und sortieren können (z.B. Adresse, Datum, Vollständigkeit, Status).

**FA-89**  
Exporte für die Wärmeplanung müssen als strukturierte Formate (mindestens JSON und CSV) bereitgestellt werden.

**FA-90**  
Systempflege-Änderungen (z.B. Kataloge) müssen mit Rollen/Rechten geschützt und für Nutzer klar erkennbar sein.

**FA-91**  
Am unteren Ende des Spektrums muss das Ergebnis einen groben Wärmebedarf und eine grobe Effizienzklasse liefern.

**FA-92**  
Bei wenigen manuell ergänzten Angaben muss eine Einordnung/Benchmark des Gebäudes geliefert werden (z.B. Skala, Ampel oder Tacho).

**FA-93**  
Mit zunehmender manueller Eingabetiefe sollen bauteilbezogene Sanierungseffekte und eine einfache Notwendigkeitsprüfung je Bauteil möglich sein.

**FA-94**  
Bei hoher manueller Eingabetiefe sollen Unsicherheiten sichtbar gemacht und Eingaben "Ich weiß es nicht" unterstützt werden.

**FA-95**  
Am oberen Ende des Spektrums sollen Variantenvergleiche (Energiebedarf, Kostenband, CO₂-Reduktion) und eine Empfehlung möglich sein.

**FA-96**  
Baualtersklassen müssen als klar definiertes Raster bereitgestellt werden (z.B. bis 1918, 1919–1948, 1949–1957, 1958–1968, 1969–1978, 1979–1983, 1984–1994, 1995–2001, 2002–2006, ab 2007).

**FA-97**  
Das System soll Live-Ergebnisse nach Änderungen anzeigen (z.B. Energiebedarf, Kosten, Effizienzklasse), ohne expliziten „Berechnen“-Schritt.

**FA-98**  
Mit zunehmender manueller Eingabetiefe müssen Heizungsdetails auf Basis von Baujahr und Erzeugerart erfasst werden können (z.B. Heizflächenart, Zusatzheizung).

**FA-99**  
Bei hoher manueller Eingabetiefe müssen weitere berechnungsrelevante Anlagenparameter optional erfasst werden können.

---

<a id="offene-mvp-klaerung-solarthermie-pv-und-geothermie"></a>

## Offene MVP-Klärung: Solarthermie, PV und Geothermie

**FA-100**  
Solarthermie muss als zusätzliche Sanierungsmaßnahme zur bestehenden Heizung für die Warmwasserbereitung auswählbar sein.

**FA-101**  
Die Umsetzung von Solarthermie ist fachlich gewünscht, hat jedoch gegenüber anderen Maßnahmen einen geringeren Detailgrad; der verbindliche Umfang für die MVP-Phase muss noch abgestimmt werden.

**FA-102**  
PV muss in zwei Darstellungen in der Sanierungsempfehlung unterstützt werden:  
Darstellung 1 dimensioniert PV-Anlage und Speicher für den Betrieb einer Wärmepumpe inkl. energetischer und finanzieller Effekte.

**FA-103**  
Darstellung 2 muss die maximale Ausnutzung der für PV geeigneten Flächen abbilden und das Potenzial für Haushaltsstrom, KFZ-Ladung oder vergleichbare Verbräuche kommunizieren.

**FA-104**  
Das Geothermiepotenzial muss über eine Abfrage des Geothermiedatensatzes in folgender Reihenfolge eingeschätzt werden: Grundwasser, Erdreich, Luft. Da aktuell kein Datensatz vorliegt, ist der fachliche Umfang für die MVP-Phase weiterhin in Klärung.

**FA-105**  
Das System muss aus dem MasterPortal heraus über einen verpflichtenden Einstiegspunkt erreichbar sein; hierfür muss im MasterPortal mindestens ein Link auf die DEZ-Plattform bereitgestellt werden.

---

<a id="priorisierung-implizit"></a>

## Priorisierung (implizit)

- Kernfunktionen für Bürger (Eigentümer/Vermieter) (Visualisierung, Simulation) haben höchste Priorität.
- Administrative Funktionen dienen der Qualitätssicherung und Weiterentwicklung.
- Erweiterte Analyse- oder Beratungsfunktionen sind nicht Bestandteil der initialen fachlichen Anforderungen.

---

<a id="uebergang-zu-technischen-anforderungen"></a>

## Übergang zu technischen Anforderungen

Die in diesem Dokument beschriebenen fachlichen Anforderungen werden in den **Technischen Anforderungen** konkretisiert.  
Dort wird festgelegt, **wie** diese Funktionen technisch umzusetzen sind und welche nicht-funktionalen Randbedingungen einzuhalten sind.
