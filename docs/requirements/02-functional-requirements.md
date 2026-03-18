# Fachliche Anforderungen – Digitaler Energie Zwilling (DEZ)

## Inhaltsverzeichnis

1. [Ziel der fachlichen Anforderungen](#ziel-der-fachlichen-anforderungen)
2. [Nutzerrollen](#nutzerrollen)
3. [Fachliche Hauptfunktionen](#fachliche-hauptfunktionen)
4. [Fachliche Anforderungen an die Administration (Stadtverwaltung / Fachpersonal)](#fachliche-anforderungen-an-die-administration-stadtverwaltung-fachpersonal)
5. [Fachliche Abgrenzungen](#fachliche-abgrenzungen)
6. [Erweiterte Anforderungen](#erweiterte-anforderungen)
7. [Offene MVP-Klärung: Solarthermie, PV und Geothermie](#offene-mvp-klaerung-solarthermie-pv-und-geothermie)
8. [Nachnutzung und White-Labeling](#nachnutzung-und-white-labeling)
9. [Festlegung: Nutzungsdaten und Tracking](#festlegung-nutzungsdaten-und-tracking)
10. [Abnahmeprozess und Ansprechpartner](#abnahmeprozess-und-ansprechpartner)
11. [Priorisierung (implizit)](#priorisierung-implizit)
12. [Übergang zu technischen Anforderungen](#uebergang-zu-technischen-anforderungen)

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

Bürger (Eigentümer/Vermieter) nutzen den Digitaler Energie Zwilling (DEZ) ohne Authentifizierung, um sich einen Überblick über energetische Potenziale einzelner Gebäude zu verschaffen und einfache Szenarien zu berechnen.  
Fokus liegt auf einer ersten Orientierung für Sanierungsentscheidungen.

### Stadtverwaltung / Fachpersonal

Fachpersonal nutzt den Digitaler Energie Zwilling (DEZ) über einen geschützten administrativen Bereich zur Pflege von Parametern, Qualitätssicherung und zur Sichtung von Nutzereingaben.

---

<a id="fachliche-hauptfunktionen"></a>

## Fachliche Hauptfunktionen

### Visualisierung des Stadtmodells

<a id="fa-01"></a>

**FA-01**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System muss ein dreidimensionales Stadtmodell des Stadtgebiets Regensburg bereitstellen.

<a id="fa-02"></a>

**FA-02**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Gebäude müssen einzeln auswählbar sein.

<a id="fa-03"></a>

**FA-03**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Zu jedem Gebäude müssen energetische Potenziale visuell darstellbar sein.

---

### Anzeige energetischer Potenziale

<a id="fa-04"></a>

**FA-04**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Das System muss Solarpotenziale (PV) auf Gebäude- oder Dachflächenebene anzeigen können.

<a id="fa-05"></a>

**FA-05**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Das System muss Geothermiepotenziale gebäudebezogen anzeigen können.

<a id="fa-06"></a>

**FA-06**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Die Potenziale müssen für den Nutzer verständlich und vergleichbar dargestellt werden.

> ⚠️ **Hinweis:** Solarthermie ist als zusätzliche Sanierungsmaßnahme zur Warmwasserbereitung fachlich vorgesehen. Der konkrete MVP-Umfang bleibt in diesem Punkt in Klärung.

---

### Interaktive Berechnung (Bürger (Eigentümer/Vermieter))

<a id="fa-07"></a>

**FA-07**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Bürger müssen für ein ausgewähltes Gebäude einfache energetische Szenarien berechnen können.

<a id="fa-08"></a>

**FA-08**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Die Berechnung muss Eingabemöglichkeiten für typische Sanierungsmaßnahmen bieten, z.B.:

- Fenster
- Dämmung
- Heizungsart

<a id="fa-09"></a>

**FA-09**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Berechnungsergebnisse müssen unmittelbar oder mit minimaler Verzögerung dargestellt werden.

<a id="fa-10"></a>

**FA-10**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Berechnungsergebnisse müssen verständlich und nicht fachlich überladen präsentiert werden.

---

### Eingabetiefe-Spektrum (Bürger (Eigentümer/Vermieter))

<a id="fa-11"></a>

**FA-11**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System muss ein kontinuierliches Eingabetiefe-Spektrum unterstützen, von "keine Nutzereingabe" bis "vollständig durch Nutzer definiert", ohne feste Stufenlogik.

<a id="fa-12"></a>

**FA-12**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Am unteren Ende des Spektrums müssen Berechnungen ohne Nutzereingaben auskommen und auf LOD2, Baualtersklasse und Standardannahmen basieren.

<a id="fa-13"></a>

**FA-13**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Bei wenigen manuell ergänzten Angaben (z.B. Baujahr) müssen schnelle Erstwerte geliefert werden.

<a id="fa-14"></a>

**FA-14**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Mit zunehmender manueller Eingabetiefe müssen bauteilspezifische Eingaben möglich sein.

<a id="fa-15"></a>

**FA-15**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
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

### Konkretisierung aus dem Grobkonzept (Arbeitsmappe 26-03-06)

Quelle: `26-03-06_-Übersicht Berechnung Grobkonzept.xlsx`

Die aktualisierte Arbeitsmappe bestätigt das fachliche Ziel eines **stufenlosen Eingabetiefe-Spektrums**.
Die Begriffe **Datenstufe 1** und **Datenstufe 2** bezeichnen dabei ausschließlich die beiden fachlichen Referenz-Enden dieses Spektrums und **keine festen UI-Stufen**.

Interpretation für dieses Dokument:

- **Datenstufe 1** = keine Nutzereingabe; alle für die Berechnung verwendeten Kennwerte werden aus Basisdaten, Katalogwerten und Standardannahmen abgeleitet.
- **Datenstufe 2** = volle Nutzereingabe; alle dafür freigegebenen Werte wurden durch den Nutzer angepasst oder überschrieben.
- Alle Zwischenstände sind als kontinuierliche Kombination aus automatisch abgeleiteten und manuell überschriebenen Werten zu verstehen.

Für die fachliche Modellierung bedeutet das:

- Das System startet immer mit automatisch vorbelegten Werten.
- Nutzer wählen keine feste Datenstufe aus.
- Mit jeder zusätzlichen Eingabe verschiebt sich die Berechnung entlang des Spektrums in Richtung höherer Individualisierung.
- Nicht alle internen Rechengrößen sind Nutzereingaben; editierbar sind nur die fachlich freigegebenen Werte.

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
- Im Blatt `Kat. 2 Heizung` sind einzelne Bezeichnungen/Zeichen fehlerhaft oder uneinheitlich und müssen bereinigt werden, bevor sie als Normkatalog in die produktive Konfiguration übernommen werden.
- Die neue Arbeitsmappe enthält zusätzlich zentrale Struktur- und Rechenblätter (`Grobkonzept`, `Berechnungen`), die vor finaler Fachfreigabe noch systematisch gegen das Zielbild der Dokumentation abzugleichen sind.

---

### Berechnungslogik (fachlich)

<a id="fa-16"></a>

**FA-16**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Die Berechnung muss Gebäudehülle, Lüftung, Warmwasser und Anlagentechnik berücksichtigen.

<a id="fa-17"></a>

**FA-17**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Transmissionswärmeverluste über Dach, Außenwände, Fenster und Kellerdecke müssen über U-Werte modelliert werden.

<a id="fa-18"></a>

**FA-18**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Wärmebrücken müssen pauschal über einen Faktor auf den U-Wert berücksichtigt werden (eingabeabhängige Genauigkeit).

<a id="fa-19"></a>

**FA-19**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Lüftungswärmeverluste müssen über Luftdichtheitsklasse und Gebäudealter abbildbar sein.

<a id="fa-20"></a>

**FA-20**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Warmwasserbedarf muss bei geringer Eingabetiefe pauschal (Wohnfläche/Personen) und mit zunehmender Eingabetiefe expliziter erfassbar sein.

<a id="fa-21"></a>

**FA-21**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Die Anlagentechnik muss entlang des Eingabetiefe-Spektrums differenziert erfassbar sein (von Standardannahmen bis zu detaillierten Erzeuger- und Anlagenparametern).

<a id="fa-22"></a>

**FA-22**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Primärenergie muss als Vergleichsebene über einen Faktor (Vorkette) ausweisbar sein.

---

### Nutzerführung & Transparenz (Bürger (Eigentümer/Vermieter))

<a id="fa-23"></a>

**FA-23**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Vor der Nutzung muss transparent erklärt werden, welche Daten erhoben, verarbeitet und gespeichert werden.

<a id="fa-24"></a>

**FA-24**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Der Nutzen und die Grenzen des Tools müssen für Nutzer klar und verständlich erklärt werden.

<a id="fa-25"></a>

**FA-25**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Nutzer müssen Gebäude schnell über Adresse oder Auswahl in der Karte finden können.

<a id="fa-26"></a>

**FA-26**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Nutzer müssen sehen, welche Gebäudedaten automatisch übernommen wurden und welche ergänzt werden müssen; Korrekturen müssen möglich sein.

<a id="fa-27"></a>

**FA-27**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Für Eingabewerte muss ersichtlich sein, ob sie automatisch, manuell oder geschätzt sind.

<a id="fa-28"></a>

**FA-28**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System muss Hinweise geben, wenn Eingaben untypisch oder unvollständig sind.

<a id="fa-29"></a>

**FA-29**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Die Nutzerführung muss klare, leicht verständliche Formulierungen ohne Expertenjargon nutzen.

<a id="fa-30"></a>

**FA-30**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System muss Diagramme, Vergleiche und Visualisierungen bereitstellen, um komplexe Informationen schnell erfassbar zu machen.

---

### Ergebnisdarstellung & Export (Bürger (Eigentümer/Vermieter))

<a id="fa-31"></a>

**FA-31**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Nutzer müssen einzelne oder kombinierte Sanierungsmaßnahmen auswählen und vergleichen können.

<a id="fa-32"></a>

**FA-32**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System muss zeigen, wie sich der Energiebedarf je Maßnahme verändert.

<a id="fa-33"></a>

**FA-33**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System muss zeigen, wie sich die CO₂-Emissionen je Maßnahme verändern.

<a id="fa-34"></a>

**FA-34**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Die Energieeffizienzklasse vor und nach einer Maßnahme muss vergleichbar dargestellt werden.

<a id="fa-35"></a>

**FA-35**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Zu ausgewählten Maßnahmen müssen passende Förderprogramme (z.B. Links/Kategorien) angezeigt werden.

<a id="fa-36"></a>

**FA-36**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Das System muss eine technische Kostenschätzung ohne Förderung ausweisen.

<a id="fa-37"></a>

**FA-37**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System muss eine klare Zusammenfassung der Ergebnisse bereitstellen.

<a id="fa-38"></a>

**FA-38**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Nutzer müssen einen PDF-Report der Ergebnisse exportieren können; zusätzlich muss eine JSON-Datei des Reports angeboten werden. Eine Datei wird nur bei explizitem Export erzeugt. Details zu Inhalten siehe FA-74.

<a id="fa-39"></a>

**FA-39**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System muss konkrete Hinweise zu möglichen nächsten Schritten geben.

---

### Datenschutzfreundliche Nutzung

<a id="fa-40"></a>

**FA-40**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Bürger müssen den Digitaler Energie Zwilling (DEZ) nutzen können, ohne personenbezogene Daten zu übermitteln.

<a id="fa-41"></a>

**FA-41**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Die Durchführung einer Berechnung darf nicht zwingend eine Speicherung oder Übertragung von Nutzereingaben erfordern.

---

### Speicherung von Nutzereingaben (optional)

<a id="fa-42"></a>

**FA-42**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Bürger müssen optional die Möglichkeit haben, ihre Eingaben und Ergebnisse an das System zu übermitteln.

<a id="fa-43"></a>

**FA-43**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Übermittelte Nutzereingaben müssen eindeutig einem Gebäude zuordenbar sein.

---

<a id="fachliche-anforderungen-an-die-administration-stadtverwaltung-fachpersonal"></a>

## Fachliche Anforderungen an die Administration (Stadtverwaltung / Fachpersonal)

### Zugriff & Rollen

<a id="fa-44"></a>

**FA-44**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Fachpersonal muss sich im internen Bereich des Systems anmelden können, um administrative Funktionen zu nutzen.

---

### Konfigurationsmanagement

<a id="fa-45"></a>

**FA-45**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Fachpersonal muss Berechnungsparameter pflegen und anpassen können.

<a id="fa-46"></a>

**FA-46**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Änderungen an Berechnungsparametern müssen ohne Softwareanpassung möglich sein.

<a id="fa-47"></a>

**FA-47**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Berechnungsparameter müssen versionierbar sein.

---

### Triage und Qualitätssicherung

<a id="fa-48"></a>

**FA-48**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Fachpersonal muss übermittelte Nutzereingaben sichten können.

<a id="fa-49"></a>

**FA-49**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Nutzereingaben müssen klassifizierbar und kommentierbar sein.

<a id="fa-50"></a>

**FA-50**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Fachpersonal muss in der Lage sein, relevante Fälle für eine weitere Bearbeitung zu identifizieren.

<a id="fa-51"></a>

**FA-51**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Fachpersonal muss eine Übersicht aller eingegangenen Nutzereingaben sehen können.

<a id="fa-52"></a>

**FA-52**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Fachpersonal muss Nutzereingaben filtern können.

<a id="fa-53"></a>

**FA-53**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Fachpersonal muss mehrere Nutzereingaben zu einem Gebäude vergleichen können.

<a id="fa-54"></a>

**FA-54**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Fachpersonal muss Energieeffizienzklassen definieren und bearbeiten können.

<a id="fa-55"></a>

**FA-55**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Fachpersonal muss auswählbare Eingabeoptionen (z.B. Gebäudetypen, Heizungsarten) bearbeiten können.

<a id="fa-56"></a>

**FA-56**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Fachpersonal muss Förderprogramme (Links/Kategorien) pflegen können.

---

### Reporting & Export

<a id="fa-57"></a>

**FA-57**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Fachpersonal muss geprüfte Daten strukturiert bereitstellen können, damit sie verständlich und zuverlässig in der Wärmeplanung genutzt werden können.

<a id="fa-58"></a>

**FA-58**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Fachpersonal muss übermittelte Daten exportieren können, damit sie intern weiterverwendet werden können.

<a id="fa-59"></a>

**FA-59**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Fachpersonal muss Berichte pro Quartier generieren können.

---

### Quartiersanalyse & Planung

<a id="fa-60"></a>

**FA-60**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Fachpersonal muss Quartiere nach energetischen Kennzahlen vergleichen können.

<a id="fa-61"></a>

**FA-61**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Fachpersonal muss Hotspots mit besonders hohem Energiebedarf identifizieren können.

<a id="fa-62"></a>

**FA-62**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Fachpersonal muss die Möglichkeiten für erneuerbare Energien visuell darstellen können, um geeignete Flächen zu identifizieren.

<a id="fa-63"></a>

**FA-63**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Fachpersonal muss erkennen können, welche Quartiere den größten Bedarf haben, um Prioritäten für die Wärmeplanung zu setzen.

<a id="fa-64"></a>

**FA-64**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Fachpersonal muss aus der Analyse Empfehlungen ableiten können, welche Maßnahmen sinnvoll sind.

---

<a id="fachliche-abgrenzungen"></a>

## Fachliche Abgrenzungen

<a id="fa-65"></a>

**FA-65**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Der Digitaler Energie Zwilling (DEZ) ersetzt keine individuelle Energieberatung.

<a id="fa-66"></a>

**FA-66**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Berechnungsergebnisse stellen keine förderfähigen Berechnungen dar.

<a id="fa-67"></a>

**FA-67**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System liefert keine rechtsverbindlichen Aussagen.

---

<a id="erweiterte-anforderungen"></a>

## Erweiterte Anforderungen

<a id="fa-68"></a>

**FA-68**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Das System muss eine anonymisierte Datenerfassung unterstützen; personenbezogene Eingaben sind auf das notwendige Minimum zu begrenzen (z.B. Personenanzahl als Klassen 1–5 bzw. >5).

<a id="fa-69"></a>

**FA-69**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Personenbezogene Angaben sollen, wenn fachlich nicht zwingend erforderlich, nur in klassifizierter oder aggregierter Form erfasst werden.

<a id="fa-70"></a>

**FA-70**  
*Release-Zuordnung:* [Release 1](../roadmap/mvp-definition.md#release-1-plattformaufbau)  
Der Bürgerbereich muss ohne Registrierung nutzbar sein; der aktuelle Bearbeitungszustand muss für Wiederbesuche standardmäßig über einen notwendigen Cookie persistiert werden.

<a id="fa-71"></a>

**FA-71**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Nach Abschluss einer Berechnung soll ein Feedback-Formular automatisch angeboten werden; zusätzlich soll ein Feedback-Button jederzeit verfügbar sein.

<a id="fa-72"></a>

**FA-72**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Fehler müssen über klare, „sprechende“ Fehlermeldungen kommuniziert werden (z.B. „Eingabedaten ungültig“, „Bitte Seite neu laden“, „Kontaktieren Sie Support“).

<a id="fa-73"></a>

**FA-73**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Die Benutzeroberfläche muss barrierefrei gemäß § 4 BGG konzipiert sein und vollständig responsiv für Desktop, Tablet und Mobile sein.

<a id="fa-74"></a>

**FA-74**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
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

<a id="fa-75"></a>

**FA-75**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Das System soll eine Sanierungsvariante auf Basis eines Nutzerbudgets vorschlagen können (Ziel: maximale Energiebedarfsreduktion).

<a id="fa-76"></a>

**FA-76**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Das System muss jährliche und monatliche Kosten für Wärme- und Stromversorgung ausweisen sowie Gesamtenergiekosten und Einsparungen (absolut und relativ).

<a id="fa-77"></a>

**FA-77**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Das System muss Varianten für PV und Geothermie (jeweils mehrere Ausprägungen) sowie einen optionalen Energiespeicher berücksichtigen und den Einfluss auf Eigenverbrauch und Kosten darstellen.
Für Energiespeicher sind Dimensionierungen für Haushalte mit und ohne Wärmepumpe vorzusehen; Obergrenzen nach DGS (−20%) sind zu berücksichtigen.

<a id="fa-78"></a>

**FA-78**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Nutzer müssen Energiequelle, Energiepreis und Stromart angeben können; Standardwerte sind vorzubelegen (z.B. Erdgas, 0,09 €/kWh; Strom 0,30 €/kWh).

<a id="fa-79"></a>

**FA-79**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System muss Energieeffizienzklassen (A+ bis H) ausweisen und Gebäude verpflichtend farblich nach Effizienz kategorisieren.

<a id="fa-80"></a>

**FA-80**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
CO₂-Emissionen müssen BISKO-konform berechnet und ausgewiesen werden.

<a id="fa-81"></a>

**FA-81**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Für alle automatisch abgeleiteten Werte muss die Datenherkunft in UI und Export nachvollziehbar sein (z.B. LOD2, Normtabellen, Baualtersklassen).

<a id="fa-82"></a>

**FA-82**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Nutzer sollen ihre Eingaben jederzeit abbrechen und bei Wiederbesuch automatisch aus dem Cookie wieder aufnehmen können; wenn eine Speicherung im Backend explizit ausgelöst wurde, muss zusätzlich eine Wiederherstellung vom Server möglich sein.

<a id="fa-83"></a>

**FA-83**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System soll einen klaren Einstieg („So funktioniert’s“) mit Hinweis auf Datenquellen sowie Aussagekraft und Grenzen der Ergebnisse bieten.

<a id="fa-84"></a>

**FA-84**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System soll eine Übersicht der Maßnahmen mit relativem Einsparpotenzial und Kostenniveau bieten und eine Empfehlung für „beste Maßnahme bei Budget X“ ableiten können.

<a id="fa-85"></a>

**FA-85**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Die Herleitung von Empfehlungen soll nachvollziehbar dargestellt werden (z.B. verwendete Eingaben, Annahmen und Datenquellen).

<a id="fa-86"></a>

**FA-86**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Die Verwaltung muss Nutzereingaben je Gebäude gruppiert sehen und mehrere Datensätze vergleichen können.

<a id="fa-87"></a>

**FA-87**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Jeder Nutzerdatensatz muss einen Status besitzen (neu, in Prüfung, freigegeben, unplausibel) und die Statusänderung muss nachvollziehbar sein.

<a id="fa-88"></a>

**FA-88**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Die Verwaltung muss Datensätze filtern und sortieren können (z.B. Adresse, Datum, Vollständigkeit, Status).

<a id="fa-89"></a>

**FA-89**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Exporte für die Wärmeplanung müssen als strukturierte Formate (mindestens JSON und CSV) bereitgestellt werden.

<a id="fa-90"></a>

**FA-90**  
*Release-Zuordnung:* [Release 3](../roadmap/mvp-definition.md#release-3)  
Systempflege-Änderungen (z.B. Kataloge) müssen mit Rollen/Rechten geschützt und für Nutzer klar erkennbar sein.

<a id="fa-91"></a>

**FA-91**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Am unteren Ende des Spektrums muss das Ergebnis einen groben Wärmebedarf und eine grobe Effizienzklasse liefern.

<a id="fa-92"></a>

**FA-92**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Bei wenigen manuell ergänzten Angaben muss eine Einordnung/Benchmark des Gebäudes geliefert werden (z.B. Skala, Ampel oder Tacho).

<a id="fa-93"></a>

**FA-93**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Mit zunehmender manueller Eingabetiefe sollen bauteilbezogene Sanierungseffekte und eine einfache Notwendigkeitsprüfung je Bauteil möglich sein.

<a id="fa-94"></a>

**FA-94**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Bei hoher manueller Eingabetiefe sollen Unsicherheiten sichtbar gemacht und Eingaben "Ich weiß es nicht" unterstützt werden.

<a id="fa-95"></a>

**FA-95**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Am oberen Ende des Spektrums sollen Variantenvergleiche (Energiebedarf, Kostenband, CO₂-Reduktion) und eine Empfehlung möglich sein.

<a id="fa-96"></a>

**FA-96**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Baualtersklassen müssen als klar definiertes Raster bereitgestellt werden (z.B. bis 1918, 1919–1948, 1949–1957, 1958–1968, 1969–1978, 1979–1983, 1984–1994, 1995–2001, 2002–2006, ab 2007).

<a id="fa-97"></a>

**FA-97**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System soll Live-Ergebnisse nach Änderungen anzeigen (z.B. Energiebedarf, Kosten, Effizienzklasse), ohne expliziten „Berechnen“-Schritt.

<a id="fa-98"></a>

**FA-98**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Mit zunehmender manueller Eingabetiefe müssen Heizungsdetails auf Basis von Baujahr und Erzeugerart erfasst werden können (z.B. Heizflächenart, Zusatzheizung).

<a id="fa-99"></a>

**FA-99**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Bei hoher manueller Eingabetiefe müssen weitere berechnungsrelevante Anlagenparameter optional erfasst werden können.

---

<a id="offene-mvp-klaerung-solarthermie-pv-und-geothermie"></a>

## Offene MVP-Klärung: Solarthermie, PV und Geothermie

<a id="fa-100"></a>

**FA-100**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Solarthermie muss als zusätzliche Sanierungsmaßnahme zur bestehenden Heizung für die Warmwasserbereitung auswählbar sein.

<a id="fa-101"></a>

**FA-101**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Die Umsetzung von Solarthermie ist fachlich gewünscht, hat jedoch gegenüber anderen Maßnahmen einen geringeren Detailgrad; der verbindliche Umfang für die MVP-Phase muss noch abgestimmt werden.

<a id="fa-102"></a>

**FA-102**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
PV muss in zwei Darstellungen in der Sanierungsempfehlung unterstützt werden:  
Darstellung 1 dimensioniert PV-Anlage und Speicher für den Betrieb einer Wärmepumpe inkl. energetischer und finanzieller Effekte.

<a id="fa-103"></a>

**FA-103**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Darstellung 2 muss die maximale Ausnutzung der für PV geeigneten Flächen abbilden und das Potenzial für Haushaltsstrom, KFZ-Ladung oder vergleichbare Verbräuche kommunizieren.

<a id="fa-104"></a>

**FA-104**  
*Release-Zuordnung:* [Release 4](../roadmap/mvp-definition.md#release-4)  
Das Geothermiepotenzial muss über eine Abfrage des Geothermiedatensatzes in folgender Reihenfolge eingeschätzt werden: Grundwasser, Erdreich, Luft. Da aktuell kein Datensatz vorliegt, ist der fachliche Umfang für die MVP-Phase weiterhin in Klärung.

<a id="fa-105"></a>

**FA-105**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System muss aus dem MasterPortal heraus über einen verpflichtenden Einstiegspunkt erreichbar sein; hierfür muss im MasterPortal mindestens ein Link auf die DEZ-Plattform bereitgestellt werden.

> **Begründung (fachlich):** Der Link-Out unterstützt einen niedrigschwelligen Zugang per direkter URL, bessere Auffindbarkeit (inkl. Landingpages), direktes Teilen per Link/QR sowie eine DEZ-spezifische Nutzerführung.

---

<a id="nachnutzung-und-white-labeling"></a>

## Nachnutzung und White-Labeling

<a id="fa-106"></a>

**FA-106**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Das System muss fachlich so nutzbar sein, dass neben Regensburg auch weitere Kommunen mit eigenen Datenbeständen betrieben werden können.

<a id="fa-107"></a>

**FA-107**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Für jede Kommune muss ein eigenes Profil nutzbar sein, das mindestens Name, Branding, Texte, Basiskartenbezug und lokale Datenquellen beschreibt.

<a id="fa-108"></a>

**FA-108**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Regensburg-spezifische Inhalte (z.B. Vergleiche gegen den lokalen Gebäudebestand, lokale Begriffe, lokale Förderbezüge) müssen als kommunenspezifischer Profilinhalt austauschbar sein.

<a id="fa-109"></a>

**FA-109**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Die Nutzerführung und Kernfunktionen (Gebäudeauswahl, Berechnung, Maßnahmenvergleich, Ergebnisdarstellung) müssen über alle Kommunen hinweg fachlich gleichartig bleiben.

<a id="fa-110"></a>

**FA-110**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Für den Datenimport neuer Kommunen muss eine fachlich nachvollziehbare Zuordnung auf ein einheitliches Zielmodell möglich sein, damit die gleichen Ergebniskategorien bereitgestellt werden können.

<a id="fa-111"></a>

**FA-111**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Wenn erweiterte Fachdaten (z.B. CityGML Energy ADE) vorliegen, sollen diese fachlich vorrangig genutzt werden; fehlen sie, muss die Anwendung weiterhin mit den Basisdaten arbeitsfähig bleiben.

<a id="fa-112"></a>

**FA-112**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Für automatisch übernommene oder transformierte Werte muss die Herkunft für Fachpersonal nachvollziehbar sein (Quelle der Kommune, verwendetes Profil, ggf. Fallback).

<a id="fa-113"></a>

**FA-113**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Die Einführbarkeit in weiteren Kommunen soll ohne fachliche Neudefinition der Kernlogik möglich sein; kommunenspezifische Unterschiede sollen primär über Profile und Konfigurationen abgebildet werden.

<a id="fa-114"></a>

**FA-114**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Eine DEZ-Instanz soll fachlich immer genau eine Kommune abbilden; die Nachnutzung für weitere Kommunen erfolgt über getrennte Deployments und nicht über eine gleichzeitige Mehrkommunen-Nutzung in derselben Instanz.

---

<a id="festlegung-nutzungsdaten-und-tracking"></a>

## Festlegung: Nutzungsdaten und Tracking

<a id="fa-115"></a>

**FA-115**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Für Nutzungsanalysen wird Matomo verbindlich eingesetzt.

<a id="fa-116"></a>

**FA-116**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Nutzungsdatenanalysen dürfen fachlich nur nach expliziter Einwilligung (Opt-in) erfolgen.

<a id="fa-117"></a>

**FA-117**  
*Release-Zuordnung:* [Release 2](../roadmap/mvp-definition.md#release-2)  
Der konkrete fachliche Umfang für Tracking (Metriken, Auswertungsziele, Berichtskreise) ist vor produktiver Aktivierung verbindlich festzulegen.

---

<a id="abnahmeprozess-und-ansprechpartner"></a>

## Abnahmeprozess und Ansprechpartner

<a id="fa-118"></a>

**FA-118**  
*Release-Zuordnung:* Nicht im aktuellen Releaseplan zugeordnet.  
Für den Abnahmeprozess sind bei der Stadt Regensburg jeweils ein fachlicher und ein technischer Projektleiter als Ansprechpartner benannt.

---

<a id="priorisierung-implizit"></a>

## Priorisierung (implizit)

- Kernfunktionen für Bürger (Eigentümer/Vermieter) (Visualisierung, Berechnung) haben höchste Priorität.
- Administrative Funktionen dienen der Qualitätssicherung und Weiterentwicklung.
- Erweiterte Analyse- oder Beratungsfunktionen sind nicht Bestandteil der initialen fachlichen Anforderungen.

---

<a id="uebergang-zu-technischen-anforderungen"></a>

## Übergang zu technischen Anforderungen

Die in diesem Dokument beschriebenen fachlichen Anforderungen werden in den **Technischen Anforderungen** konkretisiert.  
Dort wird festgelegt, **wie** diese Funktionen technisch umzusetzen sind und welche nicht-funktionalen Randbedingungen einzuhalten sind.
