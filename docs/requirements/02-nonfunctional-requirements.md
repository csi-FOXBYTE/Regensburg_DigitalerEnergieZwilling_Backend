# Fachliche Anforderungen – Digitaler Energy Zwilling (DEZ)

## Ziel der fachlichen Anforderungen

Dieses Dokument beschreibt die **fachlichen Anforderungen** an den Digitaler Energy Zwilling (DEZ).  
Es beantwortet die Frage, **welche Funktionen und Nutzungsmöglichkeiten** das System aus Sicht der Anwender bereitstellen muss, unabhängig von der konkreten technischen Umsetzung.

Die fachlichen Anforderungen sind bewusst **indikativ** formuliert und bilden die Grundlage für die technische Ausgestaltung und Architekturentscheidungen.

Verbindlichkeit: **MUSS** = verpflichtend, **SOLL** = wünschenswert/nice-to-have, **KANN** = optional.

---

## Nutzerrollen

### Bürger (Eigentümer/Vermieter)

Bürger (Eigentümer/Vermieter) nutzen den Digitaler Energy Zwilling (DEZ) ohne Authentifizierung, um sich einen Überblick über energetische Potenziale einzelner Gebäude zu verschaffen und einfache Szenarien zu simulieren.  
Fokus liegt auf einer ersten Orientierung für Sanierungsentscheidungen.

### Stadtverwaltung / Fachpersonal

Fachpersonal nutzt den Digitaler Energy Zwilling (DEZ) über eine geschützte Administrationsoberfläche zur Pflege von Parametern, Qualitätssicherung und zur Sichtung von Nutzereingaben.

---

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

Hinweis: Solarthermiepotenziale sind derzeit nicht Bestandteil der fachlichen Anforderungen.

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

### Simulationsstufen (Bürger (Eigentümer/Vermieter))

**FA-11**  
Das System muss mindestens fünf Simulationsstufen mit steigender Eingabetiefe unterstützen (Stufe 0 bis Stufe 4).

**FA-12**  
Stufe 0 muss ohne Nutzereingaben auskommen und auf LOD2, Baualtersklasse und Standardannahmen basieren.

**FA-13**  
Stufe 1 muss mit Basisdaten (z.B. Baujahr) einen schnellen Erstwert liefern.

**FA-14**  
Stufe 2 muss bauteilspezifische Eingaben sowie die Auswahl einer Lüftungsart erlauben.

**FA-15**  
Stufe 3 muss detaillierte Eingaben ermöglichen; Förderparameter pro Maßnahme sollen optional erfassbar sein.

### Eingabematrix je Stufe (Spezifikation)

| Stufe | Pflichtangaben                                        | Optionale Angaben                                                                                                                                            |
| ----- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0     | keine                                                 | keine                                                                                                                                                        |
| 1     | Baujahr                                               | Energieträger, Jahresverbrauch oder Kosten, Warmwasser elektrisch (Ja/Nein), Personenanzahl (Klassen)                                                        |
| 2     | Bauteilzustände je Dach/Außenwand/Fenster/Kellerdecke | Lüftungsart, Heizflächenart, Erzeugerart, Baujahre je Bauteil                                                                                                |
| 3     | Überschreiben von Defaults je Bauteil                 | Dämmung ja/nein, Sanierungsjahr, Verglasungsart/Rahmen, Luftdichtheit, Vorlauftemperatur, Erzeugerleistung, Umwälzpumpe, Regelprinzip, technische Ausführung |
| 4     | Auswahl Sanierungsmaßnahmen                           | Kombinationen, Budget, Förderlogik (optional)                                                                                                                |

Hinweis: Alle Eingaben sind als „automatisch“, „manuell“ oder „geschätzt“ zu kennzeichnen.

---

### Berechnungslogik (fachlich)

**FA-16**  
Die Simulation muss Gebäudehülle, Lüftung, Warmwasser und Anlagentechnik berücksichtigen.

**FA-17**  
Transmissionswärmeverluste über Dach, Außenwände, Fenster und Kellerdecke müssen über U-Werte modelliert werden.

**FA-18**  
Wärmebrücken müssen pauschal über einen Faktor auf den U-Wert berücksichtigt werden (stufenabhängige Genauigkeit).

**FA-19**  
Lüftungswärmeverluste müssen über Luftdichtheitsklasse und Gebäudealter abbildbar sein; in Stufe 2 ist die Lüftungsart wählbar.

**FA-20**  
Warmwasserbedarf muss in Stufe 1 pauschal (Wohnfläche/Personen) und in höheren Stufen expliziter erfassbar sein.

**FA-21**  
Die Anlagentechnik muss stufig erfasst werden (Standardannahmen → Energieträger/Alter → Erzeugerart/Eigenschaften).

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
Nutzer müssen einen PDF-Report der Ergebnisse exportieren können; eine Datei wird nur bei explizitem Export erzeugt. Details zu Inhalten siehe FA-76.

**FA-39**  
Das System muss konkrete Hinweise zu möglichen nächsten Schritten geben.

---

### Datenschutzfreundliche Nutzung

**FA-40**  
Bürger müssen den Digitaler Energy Zwilling (DEZ) nutzen können, ohne personenbezogene Daten anzugeben.

**FA-41**  
Die Durchführung einer Simulation darf nicht zwingend eine Speicherung oder Übertragung von Nutzereingaben erfordern.

---

### Speicherung von Nutzereingaben (optional)

**FA-42**  
Bürger müssen optional die Möglichkeit haben, ihre Eingaben und Ergebnisse an das System zu übermitteln.

**FA-43**  
Übermittelte Nutzereingaben müssen eindeutig einem Gebäude zuordenbar sein.

---

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
Fachpersonal muss Datensätze als plausibel markieren und für die Veröffentlichung freigeben können.

**FA-55**  
Fachpersonal muss nicht plausible Datensätze löschen können.

---

### Systempflege & Kataloge

**FA-56**  
Fachpersonal muss Energieeffizienzklassen definieren und bearbeiten können.

**FA-57**  
Fachpersonal muss auswählbare Eingabeoptionen (z.B. Gebäudetypen, Heizungsarten) bearbeiten können.

**FA-58**  
Fachpersonal muss Förderprogramme (Links/Kategorien) pflegen können.

---

### Reporting & Export

**FA-59**  
Fachpersonal muss geprüfte Daten strukturiert bereitstellen können, damit sie verständlich und zuverlässig in der Wärmeplanung genutzt werden können.

**FA-60**  
Fachpersonal muss veröffentlichte Daten exportieren können, damit sie intern weiterverwendet werden können.

**FA-61**  
Fachpersonal muss Berichte pro Quartier generieren können.

---

### Quartiersanalyse & Planung

**FA-62**  
Fachpersonal muss Quartiere nach energetischen Kennzahlen vergleichen können.

**FA-63**  
Fachpersonal muss Hotspots mit besonders hohem Energiebedarf identifizieren können.

**FA-64**  
Fachpersonal muss die Möglichkeiten für erneuerbare Energien visuell darstellen können, um geeignete Flächen zu identifizieren.

**FA-65**  
Fachpersonal muss erkennen können, welche Quartiere den größten Bedarf haben, um Prioritäten für die Wärmeplanung zu setzen.

**FA-66**  
Fachpersonal muss aus der Analyse Empfehlungen ableiten können, welche Maßnahmen sinnvoll sind.

---

## Fachliche Abgrenzungen

**FA-67**  
Der Digitaler Energy Zwilling (DEZ) ersetzt keine individuelle Energieberatung.

**FA-68**  
Simulationsergebnisse stellen keine förderfähigen Berechnungen dar.

**FA-69**  
Das System liefert keine rechtsverbindlichen Aussagen.

---

## Erweiterte Anforderungen

**FA-70**  
Das System muss eine anonymisierte Datenerfassung unterstützen; personenbezogene Eingaben sind auf das notwendige Minimum zu begrenzen (z.B. Personenanzahl als Klassen 1–5 bzw. >5).

**FA-71**  
Das System muss die Moduswahl und den Wechsel der Stufen klar kommunizieren (Einfach/Erweitert/Experten/Szenarien) und je Stufe kurz erklären, was sich ändert.

**FA-72**  
Der Bürgerbereich muss ohne Registrierung nutzbar sein; temporäre Zustände dürfen über Session-Cookies gehalten werden, eine optionale lokale Speicherung im Browser ist zulässig.

**FA-73**  
Nach Abschluss einer Berechnung soll ein Feedback-Formular automatisch angeboten werden; zusätzlich soll ein Feedback-Button jederzeit verfügbar sein.

**FA-74**  
Fehler müssen über klare, „sprechende“ Fehlermeldungen kommuniziert werden (z.B. „Eingabedaten ungültig“, „Bitte Seite neu laden“, „Kontaktieren Sie Support“).

**FA-75**  
Die Benutzeroberfläche muss barrierefrei gemäß § 4 BGG konzipiert sein und vollständig responsiv für Desktop, Tablet und Mobile sein.

**FA-76**  
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
- Erneuerbare Energien & Eigenversorgung (PV- und Geothermiepotenziale inkl. Erträge, Deckung, Kombination mit Wärmepumpe)
- Vergleich des Gebäudes im Regensburger Bestand (vor/nach Sanierung)
- Farbkodierte Visualisierung (optional)
- Grafische Elemente (Diagramme, farbliche Gebäude-Darstellung)
- CI/CD-konformes Layout; ein IDML-Template kann vom Auftraggeber bereitgestellt werden
- Zusätzlich fünf Kennwerte, die im Projektverlauf definiert werden
- Liste relevanter Förderprogramme mit offiziellen Links
- Konkrete nächste Schritte
- Wenn Daten gespeichert wurden: Link/QR zur Löschanfrage

**FA-77**  
Das System soll eine Sanierungsvariante auf Basis eines Nutzerbudgets vorschlagen können (Ziel: maximale Energiebedarfsreduktion).

**FA-78**  
Das System muss jährliche und monatliche Kosten für Wärme- und Stromversorgung ausweisen sowie Gesamtenergiekosten und Einsparungen (absolut und relativ).

**FA-79**  
Das System muss Varianten für PV und Geothermie (jeweils mehrere Ausprägungen) sowie einen optionalen Energiespeicher berücksichtigen und den Einfluss auf Eigenverbrauch und Kosten darstellen.
Für Energiespeicher sind Dimensionierungen für Haushalte mit und ohne Wärmepumpe vorzusehen; Obergrenzen nach DGS (−20%) sind zu berücksichtigen.

**FA-80**  
Nutzer müssen Energiequelle, Energiepreis und Stromart angeben können; Standardwerte sind vorzubelegen (z.B. Erdgas, 0,09 €/kWh; Strom 0,30 €/kWh).

**FA-81**  
Das System muss Energieeffizienzklassen (A+ bis H) ausweisen und Gebäude optional farblich nach Effizienz kategorisieren.

**FA-82**  
CO₂-Emissionen müssen BISKO-konform berechnet und ausgewiesen werden.

**FA-83**  
Für alle automatisch abgeleiteten Werte muss die Datenherkunft in UI und Export nachvollziehbar sein (z.B. LOD2, Normtabellen, Baualtersklassen).

**FA-84**  
Nutzer sollen ihre Eingaben jederzeit abbrechen und innerhalb der aktuellen Session wieder aufnehmen können; Varianten dürfen in der Session gemerkt werden.

**FA-85**  
Das System soll einen klaren Einstieg („So funktioniert’s“) mit Hinweis auf Datenquellen sowie Aussagekraft und Grenzen der Ergebnisse bieten.

**FA-86**  
Das System soll eine Übersicht der Maßnahmen mit relativem Einsparpotenzial und Kostenniveau bieten und eine Empfehlung für „beste Maßnahme bei Budget X“ ableiten können.

**FA-87**  
Wenn eine Adresse nicht eindeutig gefunden wird, soll ein alternativer Ablauf angeboten werden (z.B. manuelle Auswahl/Erweiterung), ohne dass eine Speicherung erzwungen wird.

**FA-88**  
Die Verwaltung muss Nutzereingaben je Gebäude gruppiert sehen und mehrere Datensätze vergleichen können.

**FA-89**  
Jeder Nutzerdatensatz muss einen Status besitzen (neu, in Prüfung, freigegeben, unplausibel) und die Statusänderung muss nachvollziehbar sein.

**FA-90**  
Die Verwaltung muss Datensätze filtern und sortieren können (z.B. Adresse, Datum, Vollständigkeit, Status).

**FA-91**  
Exporte für die Wärmeplanung müssen als strukturierte Formate (mindestens JSON und CSV) bereitgestellt werden.

**FA-92**  
Systempflege-Änderungen (z.B. Kataloge) müssen mit Rollen/Rechten geschützt und für Nutzer klar erkennbar sein.

**FA-93**  
Stufe 0 muss als Ergebnis einen groben Wärmebedarf und eine grobe Effizienzklasse liefern.

**FA-94**  
Stufe 1 muss eine Einordnung/Benchmark des Gebäudes liefern (z.B. Skala, Ampel oder Tacho).

**FA-95**  
Stufe 2 soll bauteilbezogene Sanierungseffekte und eine einfache Notwendigkeitsprüfung je Bauteil ermöglichen.

**FA-96**  
Stufe 3 soll Unsicherheiten sichtbar machen und Eingaben „Ich weiß es nicht“ unterstützen.

**FA-97**  
Stufe 4 soll Variantenvergleiche liefern (Energiebedarf, Kostenband, CO₂-Reduktion) und eine Empfehlung ermöglichen.

**FA-98**  
Baualtersklassen müssen als klar definiertes Raster bereitgestellt werden (z.B. bis 1918, 1919–1948, 1949–1957, 1958–1968, 1969–1978, 1979–1983, 1984–1994, 1995–2001, 2002–2006, ab 2007).

**FA-99**  
Das System soll Live-Ergebnisse nach Änderungen anzeigen (z.B. Energiebedarf, Kosten, Effizienzklasse), ohne expliziten „Berechnen“-Schritt.

**FA-100**  
In Stufe 2 müssen Heizungsdetails auf Basis von Baujahr und Erzeugerart erfasst werden können (z.B. Heizflächenart, grundlegende Regelungsart).

**FA-101**  
In Stufe 3 müssen detaillierte Anlagenparameter optional erfasst werden können (z.B. Vorlauftemperatur, Erzeugerleistung, Umwälzpumpe, Regelprinzip, technische Ausführung).

---

## Priorisierung (implizit)

- Kernfunktionen für Bürger (Eigentümer/Vermieter) (Visualisierung, Simulation) haben höchste Priorität.
- Administrative Funktionen dienen der Qualitätssicherung und Weiterentwicklung.
- Erweiterte Analyse- oder Beratungsfunktionen sind nicht Bestandteil der initialen fachlichen Anforderungen.

---

## Übergang zu technischen Anforderungen

Die in diesem Dokument beschriebenen fachlichen Anforderungen werden in den **Technischen Anforderungen** konkretisiert.  
Dort wird festgelegt, **wie** diese Funktionen technisch umzusetzen sind und welche nicht-funktionalen Randbedingungen einzuhalten sind.