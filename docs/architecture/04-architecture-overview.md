# Architekturübersicht – Digitaler Energy Zwilling (DEZ)

## Ziel der Architektur

Die Architektur des Digitaler Energy Zwilling (DEZ) verfolgt das Ziel, eine **performante, skalierbare und datenschutzfreundliche Webanwendung** bereitzustellen, die Bürgern (Eigentümern/Vermietern) einen niedrigschwelligen Zugang zu energetischen Potenzialen von Gebäuden ermöglicht und gleichzeitig der Stadtverwaltung / dem Fachpersonal Werkzeuge zur Konfiguration, Qualitätssicherung und Triage bereitstellt.

Zentrale Leitprinzipien der Architektur sind:
- **Privacy-by-Design**
- **Trennung von statischen und dynamischen Daten**
- **Offline-Vorverarbeitung komplexer Geodaten**
- **Klare Abgrenzung von Public- und Admin-Funktionalitäten**
- **Modularität und Erweiterbarkeit**

---

## Architekturprinzipien

### Statische Daten statt Laufzeitberechnung

Alle rechenintensiven und allgemein gültigen Daten (z.B. Solarpotenziale (PV) und Geothermiepotenziale) werden **offline vorverarbeitet** und als **statische Attribute direkt in die 3D Tiles eingebettet**.  
Zur Laufzeit findet keine Neuberechnung dieser Potenziale statt.

Dies reduziert:
- die Komplexität des Laufzeitsystems
- die Serverlast
- die Fehleranfälligkeit

---

### Clientseitige Simulation als Standard

Der Simulationskern ist als **eigenständiges JavaScript-Modul** konzipiert und kann vollständig im Browser ausgeführt werden.  
Damit ist es möglich, energetische Simulationen durchzuführen, **ohne Nutzereingaben an einen Server zu übertragen**.

Diese Architekturentscheidung dient insbesondere:
- dem Datenschutz
- der Transparenz gegenüber Bürgern (Eigentümern/Vermietern)
- der Reduktion von Backend-Abhängigkeiten

Eine serverseitige Ausführung der Simulation ist optional vorgesehen, z.B. für administrative Zwecke oder zukünftige Erweiterungen.

---

### Klare Trennung von Bürger- und Admin-Bereich (Stadtverwaltung / Fachpersonal)

Die Anwendung unterscheidet strikt zwischen:
- einem **öffentlichen Client** für Bürger (Eigentümer/Vermieter)
- einer **administrativen Oberfläche** für Stadtverwaltung / Fachpersonal

Die Admin-Oberfläche wird **serverseitig geschützt** und erst nach erfolgreicher Authentifizierung ausgeliefert.  
Der öffentliche Client ist jederzeit ohne Anmeldung erreichbar.

Diese Trennung erfolgt nicht nur logisch, sondern auch technisch auf Ebene der HTML-Auslieferung.

---

### Statische Auslieferung des Frontends

Das Frontend wird vollständig als **statische Webanwendung** erzeugt.  
Ein Static-Site-Generator wird ausschließlich zur Build-Zeit eingesetzt.  
Zur Laufzeit existiert keine serverseitige Renderlogik.

Die interaktiven Teile der Anwendung werden über klar abgegrenzte Client-Komponenten realisiert.

---

## Zentrale Systembausteine

### Frontend

- Statische HTML-Seiten als Einstiegspunkt
- Öffentlicher 3D-Client auf Basis von Cesium
- Administrativer Client für Konfigurations- und Triage-Aufgaben
- Gemeinsame UI-Komponenten für konsistentes Erscheinungsbild

---

### Backend

Das Backend übernimmt ausschließlich Aufgaben, die nicht sinnvoll clientseitig gelöst werden können:
- Authentifizierung und Autorisierung
- Verwaltung und Veröffentlichung von Simulationskonfigurationen
- Persistenz von Nutzereingaben
- Administrative Triage-Funktionen
- Optionale serverseitige Simulation

Das Backend ist **nicht** für die Auslieferung großer statischer Datenmengen zuständig.

---

### 3D Tiles & Gateway

3D Tiles werden:
- offline erzeugt
- mit allen relevanten Potenzialattributen angereichert
- über ein dediziertes Gateway bereitgestellt

Die Tiles enthalten zusätzlich Adressen aus LOD2, optionale Texturen zur Solarpotenzial-Visualisierung
und Vegetationsobjekte (Bäume) für die 3D-Darstellung.

Das Gateway entkoppelt die Auslieferung der Tiles vom Backend und ermöglicht eine skalierbare Bereitstellung.

---

### Datenhaltung

- **3D Tiles**: enthalten ausschließlich statische, allgemein gültige Daten
- **Datenbank**: enthält Nutzereingaben, Triage-Informationen und Konfigurationsdaten
- Es findet keine doppelte Datenhaltung statischer Potenziale statt

---

## Einordnung im Gesamtsystem

Die Architektur ist bewusst so gestaltet, dass:
- ein funktionsfähiger MVP mit überschaubarem Aufwand realisiert werden kann
- spätere Erweiterungen (z.B. komplexere Simulationen, zusätzliche Datenquellen) möglich bleiben
- Datenschutz- und Sicherheitsanforderungen frühzeitig berücksichtigt werden

Die folgenden Kapitel vertiefen die Architektur auf Container- und Komponentenebene sowie die Datenpipeline im Detail.
