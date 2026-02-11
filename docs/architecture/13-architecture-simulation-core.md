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

- Ohne Nutzereingabe erfolgt die Vorbelegung ueber LOD2, Baualtersklasse und Standardannahmen.
- Mit jeder zusaetzlichen manuellen Eingabe steigt die inhaltliche Genauigkeit der Berechnung.
- Bauteil-, Anlagen- und Nutzungsangaben koennen sukzessive ergaenzt oder ueberschrieben werden.
- Bei umfassender manueller Eingabe sind detaillierte Sanierungsszenarien (Einzelmassnahmen/Kombinationen) mit Vorher/Nachher-Vergleich moeglich.

---

## Defaultannahmen (konfigurierbar)

- Fensteranteil am Fassadenbereich: Standardannahme (z.B. 40%), wenn nicht bekannt.
- Lüftungswärmeverlust (Bestand ohne Detailkenntnis): pauschaler Ansatz (z.B. 0,05 W/m²K).
- Wärmebrücken: pauschaler Zuschlag auf U-Werte, eingabeabhängig.

---

## Lüftung (Parameterbeispiele)

- Luftdichtheit wird als referenzierter Parameter aus Katalogwerten und Baualter modelliert (keine direkte Nutzereingabe).
- Fuer die Berechnung koennen interne Auspraegungen wie eher zugig / normal / sehr dicht verwendet werden.

---

## Anlagentechnik (Detailgrad)

- Ohne manuelle Eingaben arbeitet das System mit konfigurierten Standardannahmen.
- Mit manuellen Grundangaben (z.B. Baujahr, Energietraeger) wird die Anlage grob vorbelegt.
- Mit weiterem Detaillierungsgrad koennen Erzeugerart, Heizflaechenart und Regelungsart erfasst werden.
- Optional sind weitere Detailparameter wie Vorlauftemperatur, Erzeugerleistung, Umwaelzpumpe, Regelprinzip und technische Ausfuehrung erfassbar.

Regelungsarten (Auswahl): Raumtemperaturregelung, witterungsgeführte Regelung, Differenzregelung.  
Regelprinzip: stetig, 2‑Punkt/3‑Punkt.  
Technische Ausführung: hydraulisch, Smart‑Regelung.

---

## Wärmebrücken (Hinweis)

Typische Bereiche: Balkonanschlüsse, Deckenauflager auf Außenwänden, Fensteranschlüsse, Gebäudekanten/-ecken, Rollladenkästen, Attiken.

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
