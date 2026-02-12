# User Journey & UX-Leitplanken

## Persona (Beispiel)

Herr Meier ist Vermieter eines Mehrfamilienhauses aus den 1970er Jahren. Die Heizkosten steigen, Beschwerden häufen sich. Er möchte ohne hohe Initialkosten grob einschätzen, welche Sanierungen sinnvoll sind, wie groß Einsparungen ausfallen könnten und welche Förderprogramme grundsätzlich infrage kommen. Er erwartet eine einfache, verständliche Nutzung ohne Fachjargon und mit möglichst wenigen manuellen Eingaben.

---

## Nutzerreise (Phasen)

| Phase | Ziel | Ergebnis |
| --- | --- | --- |
| Awareness | Problem erkennen | Heizkosten steigen, Handlungsdruck entsteht |
| Consideration | Nutzen prüfen | Tool wirkt verlässlich und einfach |
| Onboarding | Gebäude finden | Gebäude wählen, Basisdaten prüfen |
| Simulation | Varianten testen | Maßnahmen vergleichen, Effekte verstehen |
| Review | Entscheidung stützen | Zusammenfassung, PDF-Export, nächste Schritte |

---

## Schritte & Aktionen (Kurzfassung)

| Schritt | Nutzeraktion | Systemantwort |
| --- | --- | --- |
| Einstieg | Website öffnen, Kurzbeschreibung lesen | Transparente Erklärung, Datenschutz-Hinweis |
| Gebäude finden | Adresse eingeben oder Karte nutzen | Treffer anzeigen, Daten vorbefüllen |
| Basisdaten | Daten prüfen und ergänzen | Plausibilitätschecks, Herkunftskennzeichnung |
| Varianten | Maßnahmen auswählen | Sofortige Vorher/Nachher-Vergleiche |
| Bewertung | Ergebnisse sichten | Zusammenfassung, Förderinfos, nächste Schritte |
| Export | PDF herunterladen | Report inkl. Gebäudedaten und Links |

---

## Ziele & Erwartungen

- Schnell verstehen, ob sich eine Sanierung lohnt.
- Möglichst wenig Eingaben, klare Aussagen und Vergleichbarkeit.
- Verlässlichkeit der Daten nachvollziehen können.
- Förderprogramme rein informativ sehen.
- Entscheidungsvorbereitung vor Beauftragung einer Energieberatung.

---

## Gefühle und Erwartungen

- Anfangs verunsichert und überfordert.
- Vorsichtiger Optimismus durch automatische Vorbefüllung.
- Interesse durch klare Vergleiche und sichtbare Einsparungen.
- Erleichterung, wenn nächste Schritte klar sind.

---

## Schmerzpunkte

- Unübersichtliche Kosten und zu viele Optionen.
- Fachbegriffe und Überladung von Informationen.
- Unklarheit über Datenherkunft und Aussagekraft.
- Misstrauen bei fehlender Transparenz.

---

## Chancen und UX-Ansätze

- Niederschwelliger Einstieg mit klarer „So funktioniert’s“-Erklärung.
- Sichtbare Sofortergebnisse (Einsparungen) bereits ohne oder mit wenigen manuellen Eingaben.
- Kennzeichnung der Datenherkunft: automatisch, manuell, geschätzt.
- Priorisierung der wichtigsten Daten, reduzierte Komplexität.
- Empfehlung „beste Maßnahme für Budget X“.
- Übersichtlicher Maßnahmenvergleich mit Einsparpotenzial und Kostenniveau.
- Verständliche Sprache, keine falschen Erwartungen.
- PDF mit Förderlinks und nächsten Schritten.

---

## Eingabetiefe (fachliche UX-Sicht)

Die Eingaben bewegen sich auf einem kontinuierlichen Spektrum von "keine Nutzereingabe" bis
"vollständig durch Nutzer definiert". Es gibt keine festen Stufen:
- Ohne Nutzereingabe werden Werte auf Basis von LOD2, Baualtersklasse und Standardannahmen vorbelegt.
- Mit jeder zusätzlichen manuellen Eingabe werden die Ergebnisse präziser und nachvollziehbarer.
- Bauteil-, Anlagen- und Nutzungsangaben können schrittweise ergänzt oder überschrieben werden.
- Bei umfassender manueller Eingabe sind detaillierte Varianten und Kombinationen von Maßnahmen vergleichbar.

---

## Eingabeumfang im Spektrum

Die detaillierten Eingabefelder inkl. Pflicht-/Optionaleingaben entlang des Spektrums sind in den Anforderungen beschrieben:
`docs/requirements/02-functional-requirements.md` und `docs/requirements/03-technical-requirements.md`.

Bezug zur Arbeitsmappe `30-01-26_-Übersicht Berechnung Grobkonzept.xlsx`:
- Datenstufe 1 steht für das untere Ende des Spektrums (keine Nutzereingabe).
- Datenstufe 2 steht für das obere Ende des Spektrums (maximale Nutzereingabe).
- Beide Begriffe sind nur Spektrum-Enden und keine separaten UI-Stufen.

Hinweis: Alle Eingaben sind als „automatisch“, „manuell“ oder „geschätzt“ zu kennzeichnen.

---

## Informationsarchitektur (Module)

- Gebäude & Grunddaten (Adresse, Gebäudetyp, Wohnfläche, Baualtersklasse)
- Eingabetiefe & Eingabedetails (kontinuierliches Spektrum inkl. Erklärung)
- Gebäudehülle (Dach, Außenwand, Fenster, Kellerdecke)
- Lüftung (Luftdichtheit/Alter)
- Warmwasser & Nutzung (pauschal vs. Personenanzahl)
- Anlagentechnik (Energieträger, Alter, Erzeugerart)
- Anlagentechnik (Detailgrad entlang des Spektrums: Regelungsart, Vorlauftemperatur, Erzeugerleistung, Heizflächen)
- Ergebnisse (Wärmebedarf, Primärenergie, Effizienzklasse, CO₂)
- Sanierungsmaßnahmen (Vorschläge, Varianten, Wunschsanierung)
- Kosten & Fördermittel (Kostenspannen, Förderhinweise)

---

## Datenquellen & Kennzeichnung

- Automatisch abgeleitet: LOD2-Geometrie, Baualtersklassen, Standardannahmen.
- Manuell: Nutzereingaben zu Bauteilen, Anlagen und Kostenparametern.
- Geschätzt: Werte aus Katalogen/Normtabellen/Typologien, die anhand der aktuellen Eingaben referenziert werden; dies kann sowohl automatisch abgeleitete als auch manuell angepasste Eingaben betreffen.

---

## Baualtersklassen

Das Raster der Baualtersklassen ist in den fachlichen Anforderungen festgelegt (siehe `docs/requirements/02-functional-requirements.md`, FA-96).

---

## Auswahlbeispiele (UI)

- Luftdichtheit (Lüftung): wird über allgemeine Annahmen (Katalog, Baualter) referenziert; keine direkte Nutzereingabe.
- Sanierungsmaßnahmen: Dach, Außenwand, Fenster, Kellerdecke, Heizung, PV, Solarthermie, Geothermie, Energiespeicher.
- Regelungsart (Heizung): Raumtemperaturregelung, witterungsgeführte Regelung, Differenzregelung.
- Regelprinzip: stetig, 2‑Punkt/3‑Punkt.
- Technische Ausführung: hydraulisch, Smart‑Regelung.
- PV-Darstellung 1: PV + Speicher für Wärmepumpenbetrieb (Energie/Kosten-Effekt).
- PV-Darstellung 2: maximale geeignete PV-Fläche für Strompotenziale (z.B. Haushalt/KFZ).
- Solarthermie: zusätzliche Warmwasser-Unterstützung zur bestehenden Heizung.

---

## Screen-Flow (vereinfacht)

1. Landingpage mit Kurzbeschreibung und Datenschutz-Hinweis.
2. Gebäude finden über Karte oder Adresse.
3. Basisdaten anzeigen, prüfen und korrigieren.
4. Maßnahmen/PV/Solarthermie/Geothermie auswählen, Varianten vergleichen.

Hinweis MVP: Der finale Umfang für Solarthermie, die zwei PV-Darstellungen und die Geothermie-Bewertung ist in der MVP-Phase noch zu klären.
5. Zusammenfassung, Wirtschaftlichkeit, Förderinfos, nächste Schritte.
6. PDF-Export, optionaler Löschhinweis (falls Daten gespeichert wurden).

---

## User Stories (Vermieter)

- Als Vermieter möchte ich eine klare Erklärung, was das Tool kann, damit ich sofort verstehe, wie es mir hilft.
- Als Vermieter möchte ich mein Gebäude schnell über Adresse oder Karte finden, damit ich ohne Aufwand starten kann.
- Als Vermieter möchte ich fehlende Gebäudedaten einfach ergänzen, damit die Berechnung realistisch bleibt.
- Als Vermieter möchte ich Maßnahmen auswählen und vergleichen, damit ich Alternativen bewerten kann.
- Als Vermieter möchte ich sehen, welche Daten automatisch stammen, damit ich die Verlässlichkeit einschätzen kann.
- Als Vermieter möchte ich verständliche Ergebnisse und klare nächste Schritte, damit ich entscheiden kann.
- Als Vermieter möchte ich einen PDF-Report exportieren, um Ergebnisse weiterzugeben.

---

## Persona (Beispiel, Verwaltung)

Frau Städter arbeitet in der Stadtverwaltung und ist für die Pflege und Qualitätssicherung der Daten im Energie-Tool verantwortlich. Sie sichtet freiwillige Nutzereingaben, vergleicht mehrere Datensätze je Gebäude, wählt den plausibelsten Datensatz aus und veröffentlicht ihn. Zusätzlich pflegt sie Energieeffizienzklassen, Gebäudetypen und Heizarten und exportiert geprüfte Daten für die Wärmeplanung.

---

## Nutzerreise Verwaltung (Phasen)

| Phase | Ziel | Ergebnis |
| --- | --- | --- |
| Login | Zugang sichern | Zugriff auf Admin-Funktionen |
| Übersicht | Überblick gewinnen | Liste und Karte der Eingaben |
| Prüfung | Qualität sichern | Vergleich & Plausibilisierung |
| Freigabe | Daten veröffentlichen | Status „freigegeben“ |
| Systempflege | Grundlagen pflegen | Kataloge aktuell halten |
| Reporting | Export | Daten für Wärmeplanung |

---

## Schritte & Aktionen (Verwaltung)

| Schritt | Aktion | Systemantwort |
| --- | --- | --- |
| Login | Admin-Seite öffnen, anmelden | Rollenprüfung, Admin-Bereich |
| Übersicht | Liste/Karte der Eingaben | Filter, Sortierung, Status |
| Detail | Gebäudedatensätze öffnen | Vergleich mehrerer Eingaben |
| Plausibilisierung | Datensatz prüfen | Status „in Prüfung“, Notizen |
| Freigabe | Datensatz auswählen | Status „freigegeben“ + Audit-Log |
| Systempflege | Kataloge bearbeiten | Versionierung, Validierung |
| Reporting | Export (JSON/CSV/PDF) | Download mit Metadaten |

---

## Ziele & Erwartungen (Verwaltung)

- Verlässliche Datenbasis für Wärmeplanung herstellen.
- Plausible Datensätze schnell identifizieren.
- Systemweit konsistente Eingabeoptionen sicherstellen.
- Exporte strukturiert und nachvollziehbar bereitstellen.

---

## Schmerzpunkte (Verwaltung)

- Viele ähnliche Datensätze je Gebäude.
- Uneinheitliche Qualität der Eingaben.
- Unklare Rollen oder Rechte.
- Änderungen wirken systemweit.

---

## Chancen und UX-Ansätze (Verwaltung)

- Klar definierte Rollen und Berechtigungen.
- Gruppierung „alle Eingaben zu einem Gebäude“.
- Statuskennzeichnung: neu / in Prüfung / freigegeben / unplausibel.
- Audit-Log: Wer hat wann freigegeben?
- Strukturierte, filterbare Exporte (z.B. Stadtteil, Effizienzklasse).

---

## User Stories (Stadtverwaltung)

- Als Stadtverwalter/in möchte ich mich im internen Bereich anmelden können, damit ich Zugriff auf Verwaltungsfunktionen habe.
- Als Stadtverwalter/in möchte ich eine Übersicht aller Nutzereingaben sehen, damit ich erkenne, was geprüft werden muss.
- Als Stadtverwalter/in möchte ich mehrere Eingaben zu einem Gebäude vergleichen, um Unterschiede zu erkennen.
- Als Stadtverwalter/in möchte ich Datensätze als plausibel markieren und freigeben können, damit sie veröffentlicht werden.
- Als Stadtverwalter/in möchte ich unplausible Datensätze löschen können, damit die Datenbasis sauber bleibt.
- Als Stadtverwalter/in möchte ich Energieeffizienzklassen, Gebäudetypen und Heizarten pflegen, damit Eingaben konsistent bleiben.
- Als Stadtverwalter/in möchte ich geprüfte Daten exportieren, um sie in der Wärmeplanung weiterzuverwenden.
