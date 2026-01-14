# Technische Anforderungen – Digital Energy Twin

## Ziel der technischen Anforderungen

Dieses Dokument beschreibt die **technischen Anforderungen** an den Digital Energy Twin.  
Es legt verbindlich fest, **welche technischen Eigenschaften, Randbedingungen und Qualitätsmerkmale** das System erfüllen muss, um die fachlichen Anforderungen korrekt, sicher und wartbar umzusetzen.

Die technischen Anforderungen dienen als:
- Grundlage für Architektur- und Technologieentscheidungen
- Referenz für Implementierung und Reviews
- Basis für Abnahme und Qualitätssicherung

---

## 1. Architektur & Grundprinzipien

**TA-01**  
Das System muss als webbasierte Anwendung ohne lokale Installation nutzbar sein.

**TA-02**  
Das System muss eine klare technische Trennung zwischen öffentlichem Nutzerbereich und administrativem Bereich umsetzen.

**TA-03**  
Öffentliche Funktionen müssen ohne Authentifizierung nutzbar sein.

**TA-04**  
Administrative Funktionen müssen serverseitig geschützt und nur nach erfolgreicher Authentifizierung erreichbar sein.

---

## 2. Frontend & Auslieferung

**TA-05**  
Das Frontend muss vollständig als statische Webanwendung erzeugt werden.

**TA-06**  
Zur Erzeugung des statischen Frontends muss ein Static-Site-Generator eingesetzt werden.

**TA-07**  
Zur Laufzeit darf keine serverseitige Renderlogik erforderlich sein.

**TA-08**  
Das Frontend muss mindestens zwei klar getrennte UI-Bereiche bereitstellen:
- einen öffentlichen Client
- eine administrative Benutzeroberfläche

**TA-09**  
Der HTML-Code der administrativen Benutzeroberfläche darf erst nach erfolgreicher Authentifizierung ausgeliefert werden.

---

## 3. 3D-Visualisierung & Tiles

**TA-10**  
Die 3D-Visualisierung muss auf dem Standard 3D Tiles basieren.

**TA-11**  
3D Tiles müssen vollständig offline vorverarbeitet werden.

**TA-12**  
Solarthermie- und Geothermiepotenziale müssen als statische Attribute direkt in den 3D Tiles abgelegt sein.

**TA-13**  
Zur Laufzeit dürfen keine Solar- oder Geothermiepotenziale berechnet werden.

**TA-14**  
3D Tiles dürfen nicht vom Backend ausgeliefert werden.

**TA-15**  
3D Tiles müssen über ein dediziertes Gateway bereitgestellt werden.

---

## 4. Datenpipeline (Offline)

**TA-16**  
Das System muss eine eigenständige Offline-Datenpipeline zur Verarbeitung von Geodaten unterstützen.

**TA-17**  
Die Datenpipeline muss folgende Schritte abbilden können:
- Konvertierung von CityGML zu CityJSON  
- Verarbeitung von Solar- und Geothermiedaten  
- Anreicherung der Gebäudedaten mit Potenzialattributen  
- Erzeugung von 3D Tiles  

**TA-18**  
Die Datenpipeline muss unabhängig vom Laufzeitsystem betreibbar sein.

---

## 5. Simulationskern

**TA-19**  
Der Simulationskern muss als eigenständiges JavaScript-Modul implementiert sein.

**TA-20**  
Der Simulationskern muss sowohl im Browser als auch in einer Node.js-Umgebung lauffähig sein.

**TA-21**  
Die Simulation muss vollständig clientseitig ausführbar sein.

**TA-22**  
Für die Durchführung einer Simulation dürfen keine Nutzereingaben zwingend an den Server übertragen werden.

**TA-23**  
Eine serverseitige Ausführung der Simulation darf optional für administrative oder technische Zwecke möglich sein.

---

## 6. Datenschutz & Privacy-by-Design

**TA-24**  
Das System muss eine datenschutzfreundliche Nutzung ohne Übertragung personenbezogener Nutzereingaben ermöglichen.

**TA-25**  
Die Speicherung von Nutzereingaben muss optional und explizit durch den Nutzer ausgelöst werden.

**TA-26**  
Simulation und Datenspeicherung müssen technisch voneinander entkoppelt sein.

---

## 7. Konfigurationsmanagement

**TA-27**  
Simulationsparameter müssen ohne Codeänderung anpassbar sein.

**TA-28**  
Simulationskonfigurationen müssen versionierbar sein.

**TA-29**  
Jede Konfiguration muss eindeutig einer Version oder einem zeitlichen Gültigkeitsbereich zugeordnet sein.

**TA-30**  
Für den öffentlichen Client muss eine veröffentlichte, versionierte Konfigurationsdatei bereitgestellt werden.

**TA-31**  
Simulationsergebnisse müssen anhand der verwendeten Konfigurationsversion reproduzierbar sein.

---

## 8. Backend & API

**TA-32**  
Das Backend muss Schnittstellen zur Verwaltung von Simulationskonfigurationen bereitstellen.

**TA-33**  
Das Backend muss Schnittstellen zur optionalen Speicherung von Nutzereingaben bereitstellen.

**TA-34**  
Das Backend muss administrative Funktionen zur Sichtung und Triage von Nutzereingaben unterstützen.

**TA-35**  
Öffentliche und administrative API-Endpunkte müssen technisch getrennt und unterschiedlich abgesichert sein.

---

## 9. Persistenz & Datenhaltung

**TA-36**  
Nutzereingaben müssen persistent in einer relationalen Datenbank gespeichert werden.

**TA-37**  
Die Datenbank muss räumliche Erweiterungen für Geoabfragen unterstützen.

**TA-38**  
Statische Potenzialdaten dürfen nicht in der Datenbank gespeichert werden.

**TA-39**  
Konfigurationsdaten müssen in der Datenbank als zentrale Quelle gepflegt werden.

---

## 10. Betrieb & Qualität

**TA-40**  
Das System muss für eine spike-basierte Nutzung mit mehreren tausend parallelen Nutzern ausgelegt sein.

**TA-41**  
Das System muss Mechanismen zur Beobachtbarkeit wie Logging, Metriken und Tracing unterstützen.

**TA-42**  
Das System muss containerisierbar sein und in einer orchestrierten Umgebung betrieben werden können.

---

## Abgrenzung

Dieses Dokument beschreibt **was technisch erforderlich ist**, nicht jedoch die konkrete Implementierung.  
Details zur Architektur, zu Komponenten und Datenflüssen werden in den Architekturkapiteln beschrieben.
