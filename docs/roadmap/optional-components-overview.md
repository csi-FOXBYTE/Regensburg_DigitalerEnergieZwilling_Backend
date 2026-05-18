# Zentrale Übersicht optionaler Komponenten

Dieses Dokument bündelt alle derzeit identifizierten optionalen Komponenten und Erweiterungsbausteine des DEZ an einer Stelle.
Ziel ist, diese Komponenten im Projektverlauf sichtbar zu halten, ihren Entscheidungsbedarf transparent zu machen und die Umsetzbarkeit je Release oder Betriebsbedarf bewerten zu können.

## Zweck und Abgrenzung

In dieser Übersicht werden nur optionale oder bewusst offen gehaltene Komponenten geführt, die Auswirkungen auf Architektur, Betrieb, Datenfluss oder fachlichen Umfang haben.

Nicht Teil dieser Übersicht sind:

- einzelne optionale Eingabefelder innerhalb der Berechnungsmaske
- rein nutzerseitig optionale Bedienhandlungen wie ein manueller Export-Start, eine explizit ausgelöste Speicherung oder eine freiwillige Wiederherstellung
- optionale Bedieneraktionen bei feststehender Implementierung, z.B. ein freiwilliger Feedback-Einstieg
- fachliche Optionen innerhalb des regulären Funktionsumfangs, z.B. optional auswählbare Maßnahmen oder Zusatzmodule für Nutzer
- optionale Betriebs- oder Ausführungsformen innerhalb bereits implementierter Funktionen, z.B. ob ein Aktualisierungsrun im Einzelfall ausgeführt wird
- optionale Nutzung bereits vorgesehener Verarbeitungsschritte, wenn nicht die Implementierung des Schritts selbst zur Entscheidung steht
- verbindliche Systembausteine mit nur zustandsabhängiger Aktivierung, z.B. consent-gesteuertes Tracking
- bereits verbindlich eingeplante Kernkomponenten ohne gesonderten Entscheidungsbedarf

## Statuslogik

| Status | Bedeutung |
| --- | --- |
| Offen | Komponente ist dokumentiert, aber fachlich oder technisch noch nicht entschieden. |
| Beobachten | Komponente ist grundsätzlich denkbar, wird aber erst bei konkretem Bedarf oder Datenverfügbarkeit bewertet. |
| Geplant | Komponente ist als umsetzbarer Baustein vorgesehen, aber noch nicht umgesetzt. |
| Zurückgestellt | Komponente bleibt außerhalb des aktuellen Fokus und wird erst später erneut bewertet. |
| Entscheiden vor Umsetzung | Vor Implementierungsstart ist eine verbindliche Scope- oder Architekturentscheidung erforderlich. |

## Übersicht

| Komponente | Kategorie | Zweck / Nutzen | Primäre Referenzen | Frühester Bezug | Aktuelle Umsetzbarkeit | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Tiles Gateway | Laufzeit / Deployment | Optionaler Proxy für 3D Tiles, falls direkter Zugriff auf den Datendienst über APISIX betrieblich nicht ausreicht oder zusätzliche Proxy-Funktionen benötigt werden. | [TA-15](../requirements/03-technical-requirements.md#ta-15), [TA-105](../requirements/03-technical-requirements.md#ta-105), [C4 Container](../architecture/06-architecture-c4-container.md#tiles-gateway-optional), [Deployment](../architecture/14-architecture-deployment.md) | Release 1 | Hoch. Technisch klar abgegrenzt; Entscheidung hängt primär vom Zielbetrieb ab. | Beobachten |
| Serverseitige Berechnung | Laufzeit / Backend | Optionaler Berechnungspfad für Admin-Fälle, technische Fallbacks oder spätere Erweiterungen zusätzlich zur clientseitigen Standardberechnung. | [TA-23](../requirements/03-technical-requirements.md#ta-23), [C4 Komponenten](../architecture/07-architecture-c4-components.md), [Backend](../architecture/12-architecture-backend.md) | Release 1 | Mittel. Rechenkern ist grundsätzlich dafür ausgelegt, aber Nutzen, Lastbild und konkrete Triggerfälle müssen vor Ausbau konkretisiert werden. | Beobachten |
| Solarthermie-Erweiterung | Fachliche Erweiterung / Berechnung | Mögliche spätere Erweiterung für die Warmwasserbereitung; aktuell besteht dafür im Berechnungskern kein vorgesehener Rechenweg. | [FA-100](../requirements/02-functional-requirements.md#fa-100), [FA-101](../requirements/02-functional-requirements.md#fa-101), [TA-97](../requirements/03-technical-requirements.md#ta-97), [TA-98](../requirements/03-technical-requirements.md#ta-98) | Nach fachlicher und technischer Klärung | Niedrig. Ohne fachlich definierten Rechenweg und Core-Erweiterung ist eine belastbare Umsetzung derzeit nicht möglich. | Zurückgestellt |
| Einbindung von Solarpotenzial- und Geothermiedaten | Fachliche Erweiterung / Datenbasis | Einbindung statischer Potenzialdaten in den MVP, sofern belastbare Datensätze rechtzeitig bereitgestellt werden; ohne gesicherte Datenbereitstellung bleibt die Einbindung optional. | [FA-04](../requirements/02-functional-requirements.md#fa-04), [FA-05](../requirements/02-functional-requirements.md#fa-05), [FA-102](../requirements/02-functional-requirements.md#fa-102), [FA-103](../requirements/02-functional-requirements.md#fa-103), [FA-104](../requirements/02-functional-requirements.md#fa-104), [TA-12](../requirements/03-technical-requirements.md#ta-12), [TA-13](../requirements/03-technical-requirements.md#ta-13), [TA-99](../requirements/03-technical-requirements.md#ta-99), [TA-100](../requirements/03-technical-requirements.md#ta-100), [TA-101](../requirements/03-technical-requirements.md#ta-101) | Release 4 | Niedrig bis mittel. Technische Integration ist grundsätzlich möglich, aber belastbare Datenbereitstellung ist die zentrale Voraussetzung für eine MVP-Umsetzung. | Entscheiden vor Umsetzung |
| CityGML Energy ADE | Datenintegration / Nachnutzung | Der Standard ist aktuell nicht für die Umsetzung geeignet, da CityGML Energy ADE 1.0 nicht mit CityGML 3.0-Dateien kompatibel ist. | [TA-72](../requirements/03-technical-requirements.md#ta-72), [TA-125](../requirements/03-technical-requirements.md#ta-125), [Datenmodell](../architecture/08-data-model-api-view.md#aktueller-stand-citygml-energy-ade) | Derzeit kein Einsatz vorgesehen | Niedrig. Im aktuellen Stand nicht umsetzbar und daher kein geeigneter Eingabestandard für DEZ. | Zurückgestellt |
| Keycloak-STS-Anbindung für Datendienst-Credentials | Deployment / Security | Optionale Ausgabe kurzlebiger Credentials, falls der Datendienst OIDC-Föderation oder STS unterstützt. | [Offline-Datenpipeline](../architecture/10-architecture-offline-data-pipeline.md), [Deployment](../architecture/14-architecture-deployment.md) | Release 1 | Niedrig bis mittel. Abhängig von Fähigkeiten des Datendienstes; kein aktueller Muss-Baustein. | Zurückgestellt |
| Deep-Link-Erweiterung des MasterPortal-Link-Outs | Integration | Optionaler Query-Parameter zur Übergabe einer konkreten Gebäudeauswahl beim Einstieg aus dem MasterPortal. | [TA-106](../requirements/03-technical-requirements.md#ta-106), [FA-105](../requirements/02-functional-requirements.md#fa-105) | Release 2 | Hoch. Technisch einfach, aber abhängig von Abstimmung und Unterstützung auf MasterPortal-Seite. | Beobachten |

## Bewertungsregeln für den Projektverlauf

- Die Übersicht wird bei jedem Release-Wechsel gemeinsam mit der Roadmap geprüft.
- Jede Statusänderung muss mit einer Anpassung dieses Dokuments und, falls relevant, der [MVP-Roadmap](./mvp-definition.md) nachvollziehbar gemacht werden.
- Komponenten mit Status `Entscheiden vor Umsetzung` dürfen erst entwickelt werden, wenn Scope, Datenbasis und Abnahmekriterium dokumentiert sind.
- Komponenten mit Status `Zurückgestellt` bleiben sichtbar, werden aber nicht stillschweigend in den MVP übernommen.

## Offene Bewertungsfragen je Komponententyp

- Laufzeit- und Deployment-Komponenten: Welchen konkreten Betriebs- oder Lastfall lösen sie, der mit dem Basissystem nicht ausreichend abgedeckt ist?
- Fachliche Erweiterungen: Sind Datenbasis, Parametrisierung, Ergebnisdarstellung und fachliche Freigabe vor Implementierungsstart belastbar genug?
- Datenintegrationen: Liegen die erforderlichen Quelldaten, Mapping-Regeln und Provenance-Anforderungen je Kommune vollständig vor?
- Querschnittsmodule: Sind Datenschutz, Rollenmodell, Betriebsverantwortung und Monitoring vor produktiver Aktivierung geklärt?
