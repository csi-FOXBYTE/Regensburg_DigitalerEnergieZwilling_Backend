# Architektur - Simulationskern

## Ziel dieser Sicht

Dieses Kapitel beschreibt Aufbau und Verwendung des Simulationskerns als gemeinsamen Rechenkern für Frontend und Backend.

---

## Hinweis zum Reifegrad

Der Simulationskern befindet sich noch nicht in einem finalen Stand. Inhalte und Schnittstellen dieses Kapitels können sich im weiteren Projektverlauf ändern.

---

## Verantwortlichkeiten

- Berechnung von Energiebedarf, CO₂, Primärenergie, Kosten und Effizienzklassen.
- Umsetzung der Simulationsstufen und Eingabelogik gemäß fachlichen Anforderungen.
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

## Stufenmodell (0–4)

- **Stufe 0**: keine Nutzereingaben, Vorbelegung über LOD2, Baualtersklasse, Standardannahmen.
- **Stufe 1**: wenige Pflichtangaben (z.B. Baujahr), schnelle Erstwerte.
- **Stufe 2**: Bauteil- und Anlagenebene, einfache Qualitätsstufen je Bauteil.
- **Stufe 3**: Überschreiben von Defaults (z.B. Dämmung, Fensterdetails, Sanierungsjahr).
- **Stufe 4**: Sanierungsszenarien (Einzelmaßnahmen/Kombinationen) mit Vorher/Nachher-Vergleich.

---

## Defaultannahmen (konfigurierbar)

- Fensteranteil am Fassadenbereich: Standardannahme (z.B. 40%), wenn nicht bekannt.
- Lüftungswärmeverlust (Bestand ohne Detailkenntnis): pauschaler Ansatz (z.B. 0,05 W/m²K).
- Wärmebrücken: pauschaler Zuschlag auf U-Werte, stufenabhängig.

---

## Lüftung (Auswahlbeispiele)

- Fensterlüftung (kein Lüftungssystem)
- Lüftungsanlage ohne Wärmerückgewinnung
- Lüftungsanlage mit Wärmerückgewinnung
- „Weiß ich nicht“ → Standardannahme

Luftdichtheit (Stufe 3): eher zugig / normal / sehr dicht / „weiß ich nicht“.

---

## Anlagentechnik (Detailgrad)

- **Stufe 1**: Baujahr + grundlegender Energieträger, grobe Vorbelegung der Anlage.
- **Stufe 2**: Baujahr + Erzeugerart, Heizflächenart, grundlegende Regelungsart.
- **Stufe 3**: optionale Detailparameter wie Vorlauftemperatur, Erzeugerleistung, Umwälzpumpe, Regelprinzip, technische Ausführung.

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
