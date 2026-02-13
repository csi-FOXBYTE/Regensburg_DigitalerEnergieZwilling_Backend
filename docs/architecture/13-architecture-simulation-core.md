# Architektur - Simulationskern

## Inhaltsverzeichnis

1. [Ziel dieser Sicht](#ziel-dieser-sicht)
2. [Hinweis zum Reifegrad](#hinweis-zum-reifegrad)
3. [Verantwortlichkeiten](#verantwortlichkeiten)
4. [Laufzeit und Einbettung](#laufzeit-und-einbettung)
5. [Eingaben und Ausgaben](#eingaben-und-ausgaben)
6. [Eingabetiefe (Spektrum)](#eingabetiefe-spektrum)
7. [Defaultannahmen (konfigurierbar)](#defaultannahmen-konfigurierbar)
8. [Lüftung (Parameterbeispiele)](#lueftung-parameterbeispiele)
9. [Anlagentechnik (Detailgrad)](#anlagentechnik-detailgrad)
10. [Wärmebrücken (Hinweis)](#waermebruecken-hinweis)
11. [Offene Modellierungsfragen aus dem Grobkonzept](#offene-modellierungsfragen-aus-dem-grobkonzept)
12. [Diagramm](#diagramm)
13. [Versionierung und Nachvollziehbarkeit](#versionierung-und-nachvollziehbarkeit)
14. [Abgrenzung](#abgrenzung)

<a id="ziel-dieser-sicht"></a>
## Ziel dieser Sicht

Dieses Kapitel beschreibt Aufbau und Verwendung des Simulationskerns als gemeinsamen Rechenkern für Frontend und Backend.

---

<a id="hinweis-zum-reifegrad"></a>
## Hinweis zum Reifegrad

Der Simulationskern befindet sich noch nicht in einem finalen Stand. Inhalte und Schnittstellen dieses Kapitels können sich im weiteren Projektverlauf ändern.

---

<a id="verantwortlichkeiten"></a>
## Verantwortlichkeiten

- Berechnung von Energiebedarf, CO₂, Primärenergie, Kosten und Effizienzklassen.
- Umsetzung der Eingabelogik entlang eines kontinuierlichen Spektrums gemäß fachlichen Anforderungen.
- Deterministisches Verhalten bei identischer Konfiguration und Eingaben.

---

<a id="laufzeit-und-einbettung"></a>
## Laufzeit und Einbettung

- Implementiert als eigenständiges JavaScript-Modul.
- Ausführbar im Browser und in Node.js.
- Keine Abhängigkeit von Infrastruktur oder Datenbank.

---

<a id="eingaben-und-ausgaben"></a>
## Eingaben und Ausgaben

- Eingaben: Konfigurations-Snapshot (Version), Gebäudedaten/Potenziale, Nutzereingaben.
- Ausgaben: Ergebnisobjekte für Anzeige, Vergleich und Export.

---

<a id="eingabetiefe-spektrum"></a>
## Eingabetiefe (Spektrum)

- Ohne Nutzereingabe erfolgt die Vorbelegung über LOD2, Baualtersklasse und Standardannahmen.
- Mit jeder zusätzlichen manuellen Eingabe steigt die inhaltliche Genauigkeit der Berechnung.
- Bauteil-, Anlagen- und Nutzungsangaben können sukzessive ergänzt oder überschrieben werden.
- Bei umfassender manueller Eingabe sind detaillierte Sanierungsszenarien (Einzelmaßnahmen/Kombinationen) mit Vorher/Nachher-Vergleich möglich.

### Zuordnung der Grobkonzept-Datenstufen

Quelle: `30-01-26_-Übersicht Berechnung Grobkonzept.xlsx`

- Datenstufe 1 bildet das untere Spektrum-Ende ab: keine Nutzereingabe, nur LOD2 + Katalog + Annahmen.
- Datenstufe 2 bildet das obere Spektrum-Ende ab: maximale Nutzereingabe und Überschreibbarkeit.
- Die Kernlogik muss beide Enden mit demselben Rechenkern abbilden; Unterschiede liegen nur in den bereitgestellten Eingaben.

### Berechnungsdomänen aus der Arbeitsmappe

- Hülle: `Dach-Fenster`, `OGD`, `AW-Fenster`, `UGD` mit HT-Teilbilanzen (`HT = F * U * A`).
- Wärmebrücken: pauschaler Zuschlag über `dUWB * Ages`.
- Lüftung: Luftdichtheit und Luftwechsel als referenzierte Katalogwerte, nicht als direkte Nutzereingabe.
- Heizung: Systemart, Erzeugerart, Zusatzheizung, Heizflächenart und optionale Zusatzparameter.
- Kataloge: `Kat. 1 U-Wert` (Baualtersklassen/U-Werte), `Kat. Heizung` (Aufwandszahlen/Heizflächenzuschläge).
- Ergebnisgleichungen (Blatt `Formeln`): Transmissionswärmeverlust, Lüftungswärmeverlust, interne/solare Gewinne, Jahres-Heizwärmebedarf.

---

<a id="defaultannahmen-konfigurierbar"></a>
## Defaultannahmen (konfigurierbar)

- Fensteranteil am Fassadenbereich: Standardannahme (z.B. 40%), wenn nicht bekannt.
- Lüftungswärmeverlust (Bestand ohne Detailkenntnis): pauschaler Ansatz (z.B. 0,05 W/m²K).
- Wärmebrücken: pauschaler Zuschlag auf U-Werte, eingabeabhängig.

---

<a id="lueftung-parameterbeispiele"></a>
## Lüftung (Parameterbeispiele)

- Luftdichtheit wird als referenzierter Parameter aus Katalogwerten und Baualter modelliert (keine direkte Nutzereingabe).
- Für die Berechnung können interne Ausprägungen wie eher zugig / normal / sehr dicht verwendet werden.

---

<a id="anlagentechnik-detailgrad"></a>
## Anlagentechnik (Detailgrad)

- Ohne manuelle Eingaben arbeitet das System mit konfigurierten Standardannahmen.
- Mit manuellen Grundangaben (z.B. Baujahr, Energieträger) wird die Anlage grob vorbelegt.
- Mit weiterem Detaillierungsgrad können Erzeugerart, Heizflächenart und Zusatzheizung erfasst werden.
- Optional sind weitere berechnungsrelevante Anlagenparameter erfassbar.

---

<a id="waermebruecken-hinweis"></a>
## Wärmebrücken (Hinweis)

Typische Bereiche: Balkonanschlüsse, Deckenauflager auf Außenwänden, Fensteranschlüsse, Gebäudekanten/-ecken, Rollladenkästen, Attiken.

---

<a id="offene-modellierungsfragen-aus-dem-grobkonzept"></a>
## Offene Modellierungsfragen aus dem Grobkonzept

- Kostenfelder sind in mehreren Hüllen-Blättern nur als Platzhalter vorhanden; ein konsistentes Kostenmodell fehlt.
- Korrekturfaktor `F` ist nicht für alle Bauteile in gleicher Tiefe fachlich definiert.
- Das Heizungsblatt enthält teilweise generische Empfehlungstexte statt deterministischer Entscheidungsregeln.
- Einzelne Katalogbezeichner sind uneinheitlich/formal fehlerhaft und müssen vor produktiver Nutzung bereinigt werden.

---

<a id="diagramm"></a>
## Diagramm

![simulation-core-architecture.png](./attachments/simulation-core-architecture.png)

Quelle: `raw/simulation-core-architecture.puml`

---

<a id="versionierung-und-nachvollziehbarkeit"></a>
## Versionierung und Nachvollziehbarkeit

- Ergebnisse referenzieren die verwendete Konfigurationsversion.
- Reproduzierbarkeit durch unveränderliche Snapshots.

---

<a id="abgrenzung"></a>
## Abgrenzung

- Keine UI, keine Persistenz, keine Netzwerkanfragen.
- Potenzialdaten werden nicht berechnet, sondern als Eingabe genutzt.
