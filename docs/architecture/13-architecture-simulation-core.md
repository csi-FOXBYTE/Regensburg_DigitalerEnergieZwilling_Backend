# Architektur - Simulationskern

## Ziel dieser Sicht

Dieses Kapitel beschreibt Aufbau und Verwendung des Simulationskerns als gemeinsamen Rechenkern für Frontend und Backend.

---

## Hinweis zum Reifegrad

Der Simulationskern befindet sich noch nicht in einem finalen Stand. Inhalte und Schnittstellen dieses Kapitels können sich im weiteren Projektverlauf ändern.

---

## Verantwortlichkeiten

- Berechnung von Energiebedarf, CO₂, Primärenergie, Kosten und Effizienzklassen.
- Umsetzung der Eingabelogik entlang eines kontinuierlichen Spektrums gemäß fachlichen Anforderungen.
- Deterministisches Verhalten bei identischer Konfiguration und Eingaben.

---

## Laufzeit und Einbettung

- Implementiert als eigenständiges JavaScript-Modul.
- Ausführbar im Browser und in Node.js.
- Keine Abhängigkeit von Infrastruktur oder Datenbank.

---

## Eingaben und Ausgaben

- Eingaben: Konfigurations-Snapshot (Version), Gebäudedaten/Potenziale, Nutzereingaben.
- Ausgaben: Ergebnisobjekte für Anzeige, Vergleich und Export.

---

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

## Defaultannahmen (konfigurierbar)

- Fensteranteil am Fassadenbereich: Standardannahme (z.B. 40%), wenn nicht bekannt.
- Lüftungswärmeverlust (Bestand ohne Detailkenntnis): pauschaler Ansatz (z.B. 0,05 W/m²K).
- Wärmebrücken: pauschaler Zuschlag auf U-Werte, eingabeabhängig.

---

## Lüftung (Parameterbeispiele)

- Luftdichtheit wird als referenzierter Parameter aus Katalogwerten und Baualter modelliert (keine direkte Nutzereingabe).
- Für die Berechnung können interne Ausprägungen wie eher zugig / normal / sehr dicht verwendet werden.

---

## Anlagentechnik (Detailgrad)

- Ohne manuelle Eingaben arbeitet das System mit konfigurierten Standardannahmen.
- Mit manuellen Grundangaben (z.B. Baujahr, Energieträger) wird die Anlage grob vorbelegt.
- Mit weiterem Detaillierungsgrad können Erzeugerart, Heizflächenart und Regelungsart erfasst werden.
- Optional sind weitere Detailparameter wie Vorlauftemperatur, Erzeugerleistung, Umwälzpumpe, Regelprinzip und technische Ausführung erfassbar.

Regelungsarten (Auswahl): Raumtemperaturregelung, witterungsgeführte Regelung, Differenzregelung.  
Regelprinzip: stetig, 2‑Punkt/3‑Punkt.  
Technische Ausführung: hydraulisch, Smart‑Regelung.

---

## Wärmebrücken (Hinweis)

Typische Bereiche: Balkonanschlüsse, Deckenauflager auf Außenwänden, Fensteranschlüsse, Gebäudekanten/-ecken, Rollladenkästen, Attiken.

---

## Offene Modellierungsfragen aus dem Grobkonzept

- Kostenfelder sind in mehreren Hüllen-Blättern nur als Platzhalter vorhanden; ein konsistentes Kostenmodell fehlt.
- Korrekturfaktor `F` ist nicht für alle Bauteile in gleicher Tiefe fachlich definiert.
- Das Heizungsblatt enthält teilweise generische Empfehlungstexte statt deterministischer Entscheidungsregeln.
- Einzelne Katalogbezeichner sind uneinheitlich/formal fehlerhaft und müssen vor produktiver Nutzung bereinigt werden.

---

## Diagramm

![simulation-core-architecture.png](./attachments/simulation-core-architecture.png)

Quelle: `raw/simulation-core-architecture.puml`

---

## Versionierung und Nachvollziehbarkeit

- Ergebnisse referenzieren die verwendete Konfigurationsversion.
- Reproduzierbarkeit durch unveränderliche Snapshots.

---

## Abgrenzung

- Keine UI, keine Persistenz, keine Netzwerkanfragen.
- Potenzialdaten werden nicht berechnet, sondern als Eingabe genutzt.
