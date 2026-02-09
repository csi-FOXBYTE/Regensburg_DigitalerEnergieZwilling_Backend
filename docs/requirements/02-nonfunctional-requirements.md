# Fachliche Anforderungen – Digitaler Energy Zwilling (DEZ)

## Ziel der fachlichen Anforderungen

Dieses Dokument beschreibt die **fachlichen Anforderungen** an den Digitaler Energy Zwilling (DEZ).  
Es beantwortet die Frage, **welche Funktionen und Nutzungsmöglichkeiten** das System aus Sicht der Anwender bereitstellen muss, unabhängig von der konkreten technischen Umsetzung.

Die fachlichen Anforderungen sind bewusst **indikativ** formuliert und bilden die Grundlage für die technische Ausgestaltung und Architekturentscheidungen.

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
Das System muss mindestens drei Simulationsstufen mit steigender Eingabetiefe unterstützen (Quick-Start, Verbesserung, Expertenmodus).

**FA-12**  
Stufe 1 muss mit Basisdaten (z.B. Baujahr) und automatisch abgeleiteten LOD2-Werten einen schnellen Erstwert liefern.

**FA-13**  
Stufe 2 muss bauteilspezifische Eingaben (Flächen, Baujahr je Bauteil) sowie die Auswahl einer Lüftungsart erlauben.

**FA-14**  
Stufe 3 muss detaillierte Eingaben (Schichtaufbau, spezifische U-Werte) und individuelle Maßnahmenvarianten erlauben.

**FA-15**  
Optional müssen Förderparameter pro Maßnahme in der Stufe 3 erfasst werden können.

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
Nutzer müssen einen PDF-Report der Ergebnisse exportieren können; eine Datei wird nur bei explizitem Export erzeugt.

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

## Priorisierung (implizit)

- Kernfunktionen für Bürger (Eigentümer/Vermieter) (Visualisierung, Simulation) haben höchste Priorität.
- Administrative Funktionen dienen der Qualitätssicherung und Weiterentwicklung.
- Erweiterte Analyse- oder Beratungsfunktionen sind nicht Bestandteil der initialen fachlichen Anforderungen.

---

## Übergang zu technischen Anforderungen

Die in diesem Dokument beschriebenen fachlichen Anforderungen werden in den **Technischen Anforderungen** konkretisiert.  
Dort wird festgelegt, **wie** diese Funktionen technisch umzusetzen sind und welche nicht-funktionalen Randbedingungen einzuhalten sind.
