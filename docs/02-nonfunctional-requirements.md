# Fachliche Anforderungen – Digital Energy Twin

## Ziel der fachlichen Anforderungen

Dieses Dokument beschreibt die **fachlichen Anforderungen** an den Digital Energy Twin.  
Es beantwortet die Frage, **welche Funktionen und Nutzungsmöglichkeiten** das System aus Sicht der Anwender bereitstellen muss, unabhängig von der konkreten technischen Umsetzung.

Die fachlichen Anforderungen sind bewusst **indikativ** formuliert und bilden die Grundlage für die technische Ausgestaltung und Architekturentscheidungen.

---

## Nutzerrollen

### Bürger
Bürger nutzen den Digital Energy Twin ohne Authentifizierung, um sich einen Überblick über energetische Potenziale einzelner Gebäude zu verschaffen und einfache Szenarien zu simulieren.

### Stadtverwaltung / Fachpersonal
Fachpersonal nutzt den Digital Energy Twin über eine geschützte Administrationsoberfläche zur Pflege von Parametern, Qualitätssicherung und zur Sichtung von Nutzereingaben.

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
Das System muss Solarthermiepotenziale auf Gebäude- oder Dachflächenebene anzeigen können.

**FA-05**  
Das System muss Geothermiepotenziale gebäudebezogen anzeigen können.

**FA-06**  
Die Potenziale müssen für den Nutzer verständlich und vergleichbar dargestellt werden.

---

### Interaktive Simulation (Bürger)

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

### Datenschutzfreundliche Nutzung

**FA-11**  
Bürger müssen den Digital Energy Twin nutzen können, ohne personenbezogene Daten anzugeben.

**FA-12**  
Die Durchführung einer Simulation darf nicht zwingend eine Speicherung oder Übertragung von Nutzereingaben erfordern.

---

### Speicherung von Nutzereingaben (optional)

**FA-13**  
Bürger müssen optional die Möglichkeit haben, ihre Eingaben und Ergebnisse an das System zu übermitteln.

**FA-14**  
Übermittelte Nutzereingaben müssen eindeutig einem Gebäude zuordenbar sein.

---

## Fachliche Anforderungen an die Administration

### Konfigurationsmanagement

**FA-15**  
Fachpersonal muss Simulationsparameter pflegen und anpassen können.

**FA-16**  
Änderungen an Simulationsparametern müssen ohne Softwareanpassung möglich sein.

**FA-17**  
Simulationsparameter müssen versionierbar sein.

---

### Triage und Qualitätssicherung

**FA-18**  
Fachpersonal muss übermittelte Nutzereingaben sichten können.

**FA-19**  
Nutzereingaben müssen klassifizierbar oder kommentierbar sein.

**FA-20**  
Fachpersonal muss in der Lage sein, relevante Fälle für eine weitere Bearbeitung zu identifizieren.

---

## Fachliche Abgrenzungen

**FA-21**  
Der Digital Energy Twin ersetzt keine individuelle Energieberatung.

**FA-22**  
Simulationsergebnisse stellen keine förderfähigen Berechnungen dar.

**FA-23**  
Das System liefert keine rechtsverbindlichen Aussagen.

---

## Priorisierung (implizit)

- Kernfunktionen für Bürger (Visualisierung, Simulation) haben höchste Priorität.
- Administrative Funktionen dienen der Qualitätssicherung und Weiterentwicklung.
- Erweiterte Analyse- oder Beratungsfunktionen sind nicht Bestandteil der initialen fachlichen Anforderungen.

---

## Übergang zu technischen Anforderungen

Die in diesem Dokument beschriebenen fachlichen Anforderungen werden in den **Technischen Anforderungen** konkretisiert.  
Dort wird festgelegt, **wie** diese Funktionen technisch umzusetzen sind und welche nicht-funktionalen Randbedingungen einzuhalten sind.
