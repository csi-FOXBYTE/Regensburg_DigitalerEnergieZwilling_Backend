# Datenschutzhinweise für das öffentliche Sanierungstool

> **Status:** Entwurf, Stand 24. Juli 2026  
> **Geltungsbereich:** Öffentlicher/bürgerseitiger Teil des Digitalen Energie Zwillings (DEZ)  
> **Freigabe:** Vor Veröffentlichung durch Betreiber, zuständige Dienststelle und behördlichen Datenschutzbeauftragten zu prüfen. Eckige Klammern kennzeichnen noch zu ergänzende oder verbindlich festzulegende Angaben.

## 1. Verantwortlicher

Verantwortlich für die Verarbeitung personenbezogener Daten im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:

Stadt Regensburg  
Postfach 11 06 43  
93019 Regensburg  
Telefon: +49 941 507-0  
E-Mail: stadt_regensburg@regensburg.de

Zuständige Dienststelle für das Sanierungstool:

Stadt Regensburg  
Amt für Stadtentwicklung, Abteilung Entwicklungsplanung  
Neues Rathaus  
D.-Martin-Luther-Straße 1  
93047 Regensburg  
Postanschrift: Postfach 11 06 43, 93019 Regensburg  
Telefon: +49 941 507-1661  
E-Mail: [Funktionspostfach für das Sanierungstool ergänzen]

## 2. Behördlicher Datenschutzbeauftragter

Den behördlichen Datenschutzbeauftragten der Stadt Regensburg erreichen Sie unter:

Behördlicher Datenschutzbeauftragter der Stadt Regensburg  
Postfach 11 06 43  
93019 Regensburg  
Hausanschrift: Maximilianstraße 13, 93047 Regensburg  
Telefon: +49 941 507-2114  
E-Mail: datenschutz@regensburg.de

## 3. Überblick

Das Sanierungstool kann ohne Registrierung und ohne Benutzerkonto verwendet werden. Sie wählen ein Gebäude aus und können dessen energetische Eigenschaften anpassen, Sanierungsmaßnahmen vergleichen und einen Bericht erzeugen.

Die Berechnung erfolgt grundsätzlich in Ihrem Browser. Ihre Eingaben werden dabei zunächst nur auf Ihrem Endgerät gespeichert. Eine Übermittlung Ihrer Gebäude- und Berechnungsdaten an die Stadt Regensburg erfolgt nur, wenn Sie der freiwilligen Bereitstellung ausdrücklich zustimmen.

Unabhängig davon fallen beim Aufruf des Angebots technisch erforderliche Verbindungs- und Protokolldaten an. Die Kartenansicht lädt Geodaten aus der CIVITAS/CORE-Umgebung der Stadt Regensburg und die konfigurierte Basiskarte aus [städtische oder externe Bereitstellung ergänzen]. Einzelheiten finden Sie in den folgenden Abschnitten.

## 4. Aufruf der Webseite und technische Protokolldaten

### Welche Daten werden verarbeitet?

Beim Aufruf der Webseite sowie der zugehörigen Programmierschnittstellen können insbesondere folgende Daten verarbeitet werden:

- IP-Adresse des aufrufenden Geräts,
- Datum und Uhrzeit des Zugriffs,
- aufgerufene Adresse einschließlich Pfad und gegebenenfalls URL-Parameter,
- HTTP-Methode, Statuscode und übertragene Datenmenge,
- zuvor besuchte Seite beziehungsweise Referrer, soweit vom Browser übermittelt,
- Browsertyp, Betriebssystem und User-Agent,
- Hostname sowie technische Angaben zur Weiterleitung an interne Dienste,
- Informationen über Fehler, Antwortzeiten und sicherheitsrelevante Ereignisse.

Die Anfragen durchlaufen den Webserver des öffentlichen Clients und das Web/API-Gateway Apache APISIX. Das Backend basiert auf Node.js, Fastify und Pino. Die Anwendung wird containerisiert in der CIVITAS/CORE-Umgebung der Stadt Regensburg auf Kubernetes betrieben. Technischer Betreiber dieser Umgebung ist [zuständige Stelle der Stadt Regensburg oder beauftragter Betriebsdienstleister mit Kontaktdaten ergänzen]. Protokolle werden innerhalb der CIVITAS/CORE-Umgebung der Stadt Regensburg über [eingesetzte Log-Aggregation und Zielsystem ergänzen] zusammengeführt.

### Zwecke der technischen Verarbeitung

Die Daten werden verarbeitet, um

- die Webseite, 3D-Karte, Konfiguration und Programmierschnittstellen auszuliefern,
- einen stabilen und sicheren Betrieb zu gewährleisten,
- Angriffe, automatisierten Missbrauch und technische Störungen zu erkennen und abzuwehren,
- Fehler zu analysieren und die Verfügbarkeit des Dienstes zu überwachen.

### Rechtsgrundlage und Speicherdauer

Rechtsgrundlage ist Art. 6 Abs. 1 Buchst. e DSGVO in Verbindung mit Art. 4 Abs. 1 BayDSG, soweit die Verarbeitung für die Bereitstellung und Absicherung des kommunalen Informationsangebots erforderlich ist.

Die Protokolldaten werden für [konkrete Frist ergänzen] innerhalb der CIVITAS/CORE-Umgebung der Stadt Regensburg gespeichert und anschließend gelöscht oder anonymisiert. Eine längere Speicherung erfolgt nur, wenn dies zur Aufklärung eines konkreten Sicherheitsvorfalls oder zur Erfüllung gesetzlicher Pflichten erforderlich ist.

## 5. Lokale Speicherung im Browser

Das Sanierungstool verwendet im öffentlichen Bereich keine Anmelde-Cookies. Für die Wiederaufnahme Ihrer Bearbeitung werden Informationen im Local Storage Ihres Browsers gespeichert. Diese Informationen verbleiben grundsätzlich auf Ihrem Endgerät.

Folgende Einträge werden verwendet:

| Schlüssel | Inhalt und Zweck | Dauer |
| --- | --- | --- |
| `det_meta` | Kennung des zuletzt bearbeiteten Gebäudes und letzter Bearbeitungsschritt | Bis zum Zurücksetzen der Bearbeitung oder Löschen der Websitedaten |
| `det_building_data_<Gebäude-ID>` | Ausgewähltes Gebäude mit Adresse, Koordinaten und Gebäudemerkmalen; Kameraposition; eingegebene Gebäude-, Heizungs-, Strom- und Kostendaten; ausgewählte Sanierungsmaßnahmen; Bearbeitungsstand | Bis zum Löschen des Gebäudestands oder der Websitedaten, längstens [lokale Ablaufzeit ergänzen] |
| `map-help-seen` | Merkt, ob die Kartenhilfe bereits angezeigt wurde | Bis zum Löschen der Websitedaten, längstens [lokale Ablaufzeit ergänzen] |

Die Speicherung des Arbeitsstands erfolgt automatisch, nachdem ein Gebäude ausgewählt und die Dateneingabe begonnen wurde. Sie können die gespeicherten Daten über die Einstellungen Ihres Browsers löschen. Werden Browserdaten gemeinsam auf einem Gerät genutzt, können andere Benutzer dieses Geräts den gespeicherten Bearbeitungsstand möglicherweise aufrufen.

Die für die ausdrücklich gewünschte Wiederaufnahme der Bearbeitung erforderliche Speicherung und der Zugriff auf diese Informationen erfolgen auf Grundlage von § 25 Abs. 2 Nr. 2 TDDDG. Für nicht unbedingt erforderliche Speicherungen holen wir vorab eine Einwilligung nach § 25 Abs. 1 TDDDG ein.

## 6. Gebäudeauswahl, Adresssuche und 3D-Karte

### Adresssuche

Für die Adresssuche wird eine für das Sanierungstool aufbereitete Adressdatenbank aus dem S3-kompatiblen Datendienst der Stadt Regensburg in den Browser geladen. Die genaue Datenbanktechnologie, der interne Speicherort und die öffentliche Bereitstellungsroute werden über die CIVITAS/CORE-Konfiguration der Stadt Regensburg festgelegt: [Datenbankformat, Bucket/Objektpfad und öffentliche APISIX-Route ergänzen].

Die anschließende Eingabe und Suche nach einer Adresse erfolgt lokal im Browser; die einzelnen Suchbegriffe werden nicht an einen Suchdienst übertragen. Beim Abruf der Adressdatenbank werden in der CIVITAS/CORE-Umgebung der Stadt Regensburg technisch bedingt insbesondere Ihre IP-Adresse, Zeitpunkt, angeforderte Datei sowie Browser- und Verbindungsinformationen verarbeitet.

### 3D-Gebäude, Gelände und Basiskarte

Die Kartenansicht basiert auf Cesium/Resium. Die benötigten Geodaten werden aus dem S3-kompatiblen Datendienst der Stadt Regensburg geladen und über die für den DEZ konfigurierte APISIX-Route beziehungsweise das Tiles Gateway ausgeliefert:

| Inhalt | Technischer Endpunkt |
| --- | --- |
| Adressdatenbank | [öffentliche APISIX-Route und zugehörigen S3-Objektpfad der Stadt Regensburg ergänzen] |
| 3D-Gebäudemodell | [öffentliche APISIX-/Tiles-Gateway-Route und zugehörigen S3-Objektpfad der Stadt Regensburg ergänzen] |
| Geländemodell | [öffentliche APISIX-/Tiles-Gateway-Route und zugehörigen S3-Objektpfad der Stadt Regensburg ergänzen] |
| Basiskarte | [von der Stadt Regensburg konfigurierten Basiskartendienst und Endpunkt ergänzen] |

Bei jedem Abruf werden in der CIVITAS/CORE-Umgebung der Stadt Regensburg insbesondere IP-Adresse, Zeitpunkt, angeforderte Ressource, Referrer und User-Agent verarbeitet. Die Kartenansicht lädt abhängig von Ausschnitt und Zoomstufe mehrere einzelne Kacheln. Wird für die Basiskarte ein externer Dienst eingebunden, erhält auch dessen Betreiber diese technischen Verbindungsdaten.

Zweck ist die Anzeige des Stadtgebiets, die Gebäudeauswahl und die Vorbelegung von Gebäudemerkmalen. Rechtsgrundlage ist Art. 6 Abs. 1 Buchst. e DSGVO in Verbindung mit Art. 4 Abs. 1 BayDSG.

Die Verarbeitung erfolgt in der CIVITAS/CORE-Umgebung der Stadt Regensburg einschließlich des dort angebundenen S3-kompatiblen Datendienstes. Wird die Umgebung durch einen Auftragsverarbeiter betrieben, ist Empfänger [Betreiber, Anschrift, datenschutzrechtliche Rolle, Verarbeitungsort und Löschfrist ergänzen]. Sofern die konfigurierte Basiskarte von einem externen Dienst stammt, sind zusätzlich [Anbieter, Anschrift, Rolle, Verarbeitungsort, Rechtsgrundlage und Löschfrist ergänzen].

## 7. Energetische Berechnung

Die energetische Berechnung wird mit dem projektbezogenen Energie-Berechnungskern direkt im Browser durchgeführt. Dazu verarbeitet die Anwendung je nach Eingabetiefe insbesondere:

- Gebäude-ID, Gebäudeadresse und Koordinaten,
- Gebäudetyp, Baujahr beziehungsweise Baualtersklasse, Geschosszahl, Gebäudehöhe, Grund- und Wohnfläche,
- Merkmale von Dach, Dachfenstern, Außenwänden, Fenstern, oberster Geschossdecke und unterem Gebäudeabschluss,
- Heizsystem, Baualter des Heizsystems, Energieträger, Heizflächen, Gasanschluss und Speicher,
- Energieverbrauch, Strom- und Heizkosten sowie Grund- und Arbeitspreise,
- ausgewählte Sanierungsmaßnahmen,
- daraus berechnete Energiebedarfe, Kosten, CO₂-Werte und Effizienzklassen,
- verwendete Version der Berechnungskonfiguration.

Ohne Ihre freiwillige Einwilligung zur Bereitstellung der Daten werden diese Angaben nicht an das Backend der Stadt übermittelt. Sie verbleiben im Local Storage und im Arbeitsspeicher Ihres Browsers.

Die Ergebnisse sind eine unverbindliche Orientierung und keine automatisierte Entscheidung mit rechtlicher oder ähnlich erheblicher Wirkung im Sinne des Art. 22 DSGVO.

## 8. Freiwillige Bereitstellung von Gebäude- und Berechnungsdaten

### Umfang der Übermittlung

Wenn Sie die Auswahl „Daten freiwillig bereitstellen“ aktivieren und anschließend den PDF-Bericht erzeugen, übermittelt die Anwendung an das Backend:

- die Gebäude-ID,
- die vollständige Gebäudeadresse,
- Längen- und Breitengrad,
- sämtliche für die Berechnung verwendeten Eingaben,
- die Version der Berechnungskonfiguration.

Das Backend validiert die Eingaben, berechnet die Ergebnisse erneut und speichert zusätzlich:

- die berechneten Ergebnis- und Energiekennwerte im NGSI-LD-Format,
- Einreichungs-ID und geheimen Lösch-Token,
- Bearbeitungsstatus,
- Erstellungs- und Änderungszeitpunkt,
- bei interner Bearbeitung gegebenenfalls Zuordnung zu einem berechtigten Mitarbeiter und eine Änderungshistorie.

Es werden im Bürgerbereich kein Name, kein Benutzerkonto und keine E-Mail-Adresse verlangt. Wegen des Bezugs zu einem konkreten Gebäude, dessen Adresse und Koordinaten sind die übermittelten Daten jedoch nicht vollständig anonym. Sie können personenbezogen sein, insbesondere wenn sie einem Eigentümer, Vermieter, Bewohner oder Einreichenden zugeordnet werden können.

### Zwecke der freiwilligen Bereitstellung

> **Ergänzungshinweis:** Die konkreten Zwecke der freiwilligen Datenbereitstellung sind von der Stadt Regensburg noch nicht abschließend definiert und freigegeben. Die folgende Aufzählung ist ein Arbeitsentwurf und muss vor Veröffentlichung durch die fachlich zuständige Stelle sowie den behördlichen Datenschutzbeauftragten bestätigt oder ersetzt werden.

Als mögliche Zwecke sind derzeit vorgesehen:

- Plausibilitätsprüfung und Qualitätssicherung,
- Verbesserung der Datengrundlage für Klimaschutz und kommunale Wärmeplanung,
- gebäude- und quartierbezogene interne Auswertungen,
- Weiterentwicklung der Berechnungsgrundlagen und des Sanierungstools.

Nur hierzu berechtigte Beschäftigte der Stadtverwaltung beziehungsweise entsprechend verpflichtete Auftragsverarbeiter erhalten Zugriff. Eingaben, Triage-Status und bürgerseitige Berechnungsergebnisse werden nach der Projektarchitektur nicht an den NGSI-LD-Broker Stellio exportiert.

### Rechtsgrundlage, Freiwilligkeit und Widerruf

Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1 Buchst. a und Art. 7 DSGVO. Die Einwilligung ist freiwillig. Wenn Sie nicht einwilligen, können Sie die Berechnung und den PDF-Export trotzdem verwenden.

Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Am einfachsten löschen Sie die Einreichung über den im PDF enthaltenen Löschlink. Alternativ wenden Sie sich unter Angabe der Einreichungs-ID oder des Löschlinks an [Kontaktstelle ergänzen]. Der Widerruf berührt nicht die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung.

### Speicherdauer

Einreichungen werden bis [fachlich und rechtlich freigegebene Regelfrist ergänzen] in der Produktivdatenbank der Stadt Regensburg gespeichert. Danach werden sie gelöscht oder so anonymisiert, dass kein Personenbezug mehr hergestellt werden kann. Datenbanktechnologie, Betriebsmodell und Speicherort sind [von der Stadt Regensburg eingesetzte Datenbanktechnologie, verantwortlichen Betreiber und Hostingort ergänzen]. Abgeleitete Gebäudedaten und Sicherungskopien werden [Lösch- beziehungsweise Anonymisierungsverfahren sowie Aufbewahrungsfristen der Produktivdatenbank und ihrer Sicherungskopien ergänzen].

## 9. Löschung einer freiwilligen Einreichung

Für jede gespeicherte Einreichung erzeugt das Backend einen zufälligen Lösch-Token. Der PDF-Bericht enthält einen Link zur Löschseite. Vor der Löschung werden der Token, [zusätzliches Abgleichsmerkmal, zum Beispiel Gebäudeadresse] und Ihre ausdrückliche Bestätigung geprüft.

Nach erfolgreicher Prüfung werden der Einreichungsdatensatz und daraus abgeleitete personenbezogene Gebäudedaten aus der Produktivdatenbank gelöscht. Zugehörige Sicherungskopien werden nach Ablauf des regulären Backupzyklus von [Frist ergänzen] überschrieben beziehungsweise gelöscht.

Bewahren Sie den Löschlink geschützt auf. Der Lösch-Token ist nicht mit einem Benutzerkonto verknüpft und kann bei Verlust nicht ohne Weiteres ersetzt werden.

## 10. PDF- und JSON-Export sowie Wiederherstellungslinks

Der PDF-Bericht wird mit `@react-pdf/renderer` in Ihrem Browser erzeugt und als Datei auf Ihr Endgerät heruntergeladen. Auch ein JSON-Export wird im Browser erzeugt. Ohne freiwillige Datenbereitstellung ist hierfür keine Übermittlung Ihrer Eingaben an das Backend erforderlich.

Der PDF-Bericht kann folgende vertrauliche Verknüpfungen enthalten:

- einen Wiederherstellungslink zu dem ausdrücklich gespeicherten Bearbeitungsstand,
- bei freiwilliger Einreichung einen Löschlink,
- bei freiwilliger Einreichung einen Link zum JSON-Export.

Wiederherstellungs- und Löschlinks enthalten jeweils einen zufälligen, nicht erratbaren Zugriffstoken. Die eigentlichen Eingabe- und Ergebnisdaten werden nicht in der URL transportiert. Wer einen solchen Link erhält, kann abhängig von dessen Funktion auf den gespeicherten Bearbeitungsstand zugreifen oder eine Löschung anstoßen.

Speichern Sie Bericht und Links daher geschützt und geben Sie sie nur an vertrauenswürdige Personen weiter.

## 11. Schutz vor automatisierten Zugriffen

Öffentliche Schreibzugriffe werden durch Rate Limiting und eine selbst gehostete Altcha-Challenge am APISIX-Gateway vor Missbrauch geschützt. Altcha lässt den Browser eine kleine Rechenaufgabe lösen; hierfür ist kein Konto erforderlich.

Dabei werden insbesondere IP-Adresse, Zeitpunkt, Challenge-Daten, Prüfergebnis und technische Anfragedaten verarbeitet. Zweck ist der Schutz der Anwendung und der gespeicherten Daten vor automatisierten Massenanfragen. Rechtsgrundlage ist Art. 6 Abs. 1 Buchst. e DSGVO in Verbindung mit Art. 4 Abs. 1 BayDSG. Die Challenge- und Rate-Limit-Daten werden für [konkrete Frist ergänzen] innerhalb der CIVITAS/CORE-Umgebung der Stadt Regensburg gespeichert.

## 12. Webanalyse mit Matomo

Wir verwenden Matomo zur statistischen Auswertung der Nutzung des Sanierungstools. Die Matomo-Instanz wird unter [interne Matomo-URL ergänzen] in der CIVITAS/CORE-Umgebung der Stadt Regensburg betrieben. Zuständig ist [zuständige Stelle der Stadt Regensburg oder beauftragter Betreiber ergänzen]. Eine Übermittlung der Analysedaten an Matomo Cloud findet nicht statt.

Matomo wird erst nach Ihrer vorherigen Einwilligung aktiviert. Ohne Einwilligung werden keine Matomo-Tracking-Skripte geladen und keine Analyseereignisse übermittelt. Sie können Ihre Entscheidung jederzeit über „Cookie-Einstellungen“ ändern.

Nach Ihrer Einwilligung werden [eingesetzte Cookies oder andere Speichertechniken mit Namen und Laufzeiten ergänzen] sowie folgende Daten verarbeitet:

- eine zufällig erzeugte Session-ID zur statistischen Zuordnung zusammengehöriger Nutzungsvorgänge,
- aufgerufene Seiten und Funktionen sowie vollständig bearbeitete Abschnitte des Sanierungschecks,
- Beginn und Abschluss des Sanierungschecks,
- PDF-Export, Aufruf des Beratungskontakts sowie Beginn und Abschluss der freiwilligen Datenbereitstellung,
- bestätigter Gebäudetyp und ausgewählte Sanierungsmaßnahmen als fachlich vorgegebene Kategorieschlüssel,
- Zeitpunkte, Verweildauer und technische Fehler,
- Browser-, Geräte- und Betriebssystemmerkmale in gekürzter Form.

An Matomo werden insbesondere keine Gebäude-ID, Adresse, Hausnummer, Koordinaten, Einreichungs- oder Löschkennung, Kontaktdaten, Freitexte, exakten Verbrauchs- oder Kostenwerte sowie keine vollständigen Eingabe-, Ergebnis- oder Einreichungsdaten übermittelt. Die eigentlichen Daten einer freiwilligen Gebäudedatenspende werden über einen von Matomo getrennten technischen Weg verarbeitet.

Gebäudetypen und Sanierungsmaßnahmen werden nur anhand festgelegter Kategorien ausgewertet. Berichte werden aggregiert erstellt. Die zugrunde liegenden Ereignisse können innerhalb einer eingewilligten Sitzung über die zufällige Session-ID zusammengeführt werden und werden deshalb nicht allein aufgrund der aggregierten Berichte als anonym behandelt.

Die IP-Adresse wird in Matomo nicht als Analysemerkmal oder Besucherkennung verwendet und nicht in die Analysedaten übernommen. Technisch erforderliche IP-Verarbeitungen auf Ebene von Webserver und APISIX richten sich ausschließlich nach Abschnitt 4.

Die Analysedaten werden für [Aufbewahrungsfrist ergänzen] gespeichert. Zugriff erhalten [berechtigte Rollen und Berichtsempfänger ergänzen].

Rechtsgrundlagen sind Art. 6 Abs. 1 Buchst. a DSGVO sowie, soweit Informationen auf dem Endgerät gespeichert oder ausgelesen werden, § 25 Abs. 1 TDDDG.

## 13. Schriftarten

Die für das Sanierungstool benötigten Schriftarten werden innerhalb der CIVITAS/CORE-Umgebung der Stadt Regensburg bereitgestellt. Beim Seitenaufruf wird deshalb keine Verbindung zu Google Fonts oder einem anderen externen Schriftanbieter hergestellt.

## 14. Feedback

Wenn Sie die Feedback-Funktion nutzen, verarbeiten wir die von Ihnen ausgewählte Kategorie, Ihre Nachricht und – nur wenn Sie eine Rückmeldung wünschen – Ihre freiwillig angegebene E-Mail-Adresse. Hinzu kommen Zeitpunkt und technisch erforderliche Verbindungsdaten.

Die Daten werden ausschließlich zur Bearbeitung des Feedbacks und zur Verbesserung des Sanierungstools verwendet. Rechtsgrundlage ist Art. 6 Abs. 1 Buchst. e DSGVO in Verbindung mit Art. 4 Abs. 1 BayDSG; soweit die Bearbeitung ausschließlich auf Ihrer freiwilligen Kontaktaufnahme beruht, Art. 6 Abs. 1 Buchst. a DSGVO.

Empfänger ist [zuständige Stelle beziehungsweise Ticketsystem in CIVITAS/CORE ergänzen]. Feedbackdaten werden nach Abschluss der Bearbeitung, spätestens nach [Löschfrist ergänzen], gelöscht. Die optionale E-Mail-Adresse wird nur für die gewünschte Rückmeldung verwendet.

## 15. Empfänger und Auftragsverarbeiter

Innerhalb der Stadt Regensburg erhalten nur Stellen und Beschäftigte Zugriff, die diesen zur Erfüllung ihrer Aufgaben benötigen. Dies betrifft insbesondere die zuständige Dienststelle, berechtigte Fachadministratoren sowie den technischen Betrieb.

Als externe Empfänger beziehungsweise Auftragsverarbeiter kommen nach der aktuellen Architektur in Betracht:

- [zuständige Stelle der Stadt Regensburg oder vollständiger Name und Anschrift des beauftragten CIVITAS/CORE-Betreibers einschließlich datenschutzrechtlicher Rolle],
- [vollständiger Name und Anschrift des Entwicklungs- beziehungsweise Betriebsdienstleisters einschließlich vertraglicher Rolle],
- [Betreiber des S3-kompatiblen Datendienstes der Stadt Regensburg einschließlich Hostingort],
- [Betreiber und Technologie der Produktivdatenbank der Stadt Regensburg],
- [Anbieter beziehungsweise Betreiber der Kubernetes-, Backup- und Log-Plattform der Stadt Regensburg],
- [Betreiber des von der Stadt Regensburg konfigurierten Basiskartendienstes, sofern dieser nicht innerhalb ihrer CIVITAS/CORE-Umgebung bereitgestellt wird],
- [Betreiber der Matomo-Instanz innerhalb der CIVITAS/CORE-Umgebung der Stadt Regensburg].

Eine Offenlegung kann außerdem erfolgen, wenn die Stadt Regensburg hierzu gesetzlich verpflichtet ist. Eine Übermittlung freiwilliger Einreichungen an Stellio findet nicht statt.

## 16. Datenübermittlungen in Drittländer

Die DEZ-Kernkomponenten, die Produktivdatenbank, der S3-kompatible Datendienst, Sicherungskopien und die zentralen Protokolle werden in der CIVITAS/CORE-Umgebung der Stadt Regensburg verarbeitet. [Produktive Hostingregionen und Backupstandorte bestätigen.]

Eine Übermittlung personenbezogener Daten in Staaten außerhalb der Europäischen Union oder des Europäischen Wirtschaftsraums findet für die DEZ-Kernfunktionen nicht statt. Sofern für den von der Stadt Regensburg konfigurierten Basiskartendienst oder einen anderen Zusatzdienst ein Drittlandbezug besteht, werden [Empfänger, Staat, Rechtsgrundlage nach Art. 44 ff. DSGVO und geeignete Garantien ergänzen].

## 17. Pflicht zur Bereitstellung

Sie sind nicht verpflichtet, personenbezogene Daten bereitzustellen. Für die Nutzung der Webseite müssen lediglich die technisch erforderlichen Verbindungsdaten verarbeitet werden. Die freiwillige Einreichung von Gebäude- und Berechnungsdaten ist keine Voraussetzung für die Berechnung oder den PDF-Export.

## 18. Ihre Rechte

Soweit die gesetzlichen Voraussetzungen vorliegen, haben Sie insbesondere folgende Rechte:

- Auskunft über Ihre verarbeiteten personenbezogenen Daten nach Art. 15 DSGVO,
- Berichtigung unrichtiger Daten nach Art. 16 DSGVO,
- Löschung nach Art. 17 DSGVO,
- Einschränkung der Verarbeitung nach Art. 18 DSGVO,
- Datenübertragbarkeit nach Art. 20 DSGVO, soweit anwendbar,
- Widerspruch gegen eine Verarbeitung nach Art. 21 DSGVO, die auf Art. 6 Abs. 1 Buchst. e DSGVO beruht,
- Widerruf einer Einwilligung mit Wirkung für die Zukunft nach Art. 7 Abs. 3 DSGVO.

Da das Sanierungstool ohne Benutzerkonto genutzt wird, benötigen wir zur Zuordnung einer freiwilligen Einreichung in der Regel die Einreichungs-ID oder den Löschlink. Wir erheben nicht allein zur Identifikation zusätzliche personenbezogene Daten.

Zur Ausübung Ihrer Rechte wenden Sie sich an die unter Abschnitt 1 genannte zuständige Stelle oder an den behördlichen Datenschutzbeauftragten.

## 19. Beschwerderecht

Sie können sich gemäß Art. 77 DSGVO bei einer Datenschutzaufsichtsbehörde beschweren. Für die Stadt Regensburg als bayerische öffentliche Stelle ist zuständig:

Der Bayerische Landesbeauftragte für den Datenschutz  
Postfach 22 12 19  
80502 München  
Hausanschrift: Wagmüllerstraße 18, 80538 München  
Telefon: +49 89 212672-0  
E-Mail: poststelle@datenschutz-bayern.de  
Internet: https://www.datenschutz-bayern.de/

## 20. Sicherheit

Externe Zugriffe werden verschlüsselt über HTTPS bereitgestellt. Der öffentliche Bereich und der Verwaltungsbereich sind technisch getrennt. Administrative Zugriffe werden über Keycloak und APISIX geschützt; im öffentlichen Bereich ist keine Anmeldung erforderlich. Die Datenbank ist nicht direkt aus dem Internet erreichbar.

Trotz technischer und organisatorischer Schutzmaßnahmen kann eine Datenübertragung über das Internet nie vollständig risikofrei sein.

## 21. Datenquellen und Metadaten

Die folgende Übersicht dient zugleich der nach den Projektanforderungen vorgesehenen Transparenz über die verwendeten Datenquellen. Die Angaben orientieren sich in einem begrenzten Mindestumfang an DCAT-AP.de.

| Datenquelle/Distribution | `dct:title` | `dct:description` | `dct:publisher` | `dct:license` | `dct:accrualPeriodicity` | `dcat:distribution` |
| --- | --- | --- | --- | --- | --- | --- |
| 3D-Gebäudemodell | [Titel ergänzen] | LOD2-Gebäudegeometrien, Gebäude-IDs, Adressen und abgeleitete Gebäudemerkmale für Auswahl und Berechnung | [Herausgeber ergänzen] | [Lizenz ergänzen] | Zielzyklus nach Projektdokumentation: zwei Jahre; tatsächlichen Stand ergänzen | 3D Tiles aus [S3-Bucket/Objektpfad der Stadt Regensburg] über [öffentliche APISIX-/Tiles-Gateway-Route] |
| Adressdatenbank | [Titel ergänzen] | Für die lokale Adresssuche aufbereitete Gebäudeadressen mit Koordinaten | [Herausgeber ergänzen] | [Lizenz ergänzen] | [Aktualisierungsintervall ergänzen] | [Datenbankformat] aus [S3-Bucket/Objektpfad der Stadt Regensburg] über [öffentliche APISIX-Route] |
| Geländemodell | [Titel ergänzen] | Terrain-Daten für die dreidimensionale Kartenansicht | [Herausgeber ergänzen] | [Lizenz ergänzen] | [Aktualisierungsintervall ergänzen] | [Terrain-Format] aus [S3-Bucket/Objektpfad der Stadt Regensburg] über [öffentliche APISIX-/Tiles-Gateway-Route] |
| Basiskarte | [Titel und tatsächlichen Dienst bestätigen] | Hintergrundkarte der 3D-Ansicht | [Herausgeber ergänzen] | [Lizenz und Attribution bestätigen] | [Aktualisierungsintervall ergänzen] | [Distribution, Protokoll und von der Stadt Regensburg konfigurierten Endpunkt ergänzen] |
| Berechnungskonfiguration | DEZ-Berechnungskonfiguration | Versionierte Kataloge, Grenzwerte, Faktoren und Regeln für die energetische Berechnung | Stadt Regensburg | [Lizenz/Nutzungsbedingungen ergänzen] | Bei fachlicher Freigabe einer neuen Version | JSON über `GET /api/public/config/active` |

## 22. Aktualität dieser Datenschutzhinweise

Diese Datenschutzhinweise werden angepasst, wenn sich Funktionen, Datenflüsse, Empfänger oder Rechtsgrundlagen ändern.

Stand: 24. Juli 2026
