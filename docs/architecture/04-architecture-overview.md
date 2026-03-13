# Architekturübersicht – Digitaler Energie Zwilling (DEZ)

## Inhaltsverzeichnis

1. [Ziel der Architektur](#ziel-der-architektur)
2. [Architekturprinzipien](#architekturprinzipien)
3. [Security by Design in der Architektur](#security-by-design-in-der-architektur)
4. [Zentrale Systembausteine](#zentrale-systembausteine)
5. [Einordnung im Gesamtsystem](#einordnung-im-gesamtsystem)

<a id="ziel-der-architektur"></a>
## Ziel der Architektur

Die Architektur des Digitaler Energie Zwilling (DEZ) verfolgt das Ziel, eine **performante, skalierbare und datenschutzfreundliche Webanwendung** bereitzustellen, die Bürgern (Eigentümern/Vermietern) einen niedrigschwelligen Zugang zu energetischen Potenzialen von Gebäuden ermöglicht und gleichzeitig der Stadtverwaltung / dem Fachpersonal Werkzeuge zur Konfiguration, Qualitätssicherung und Triage bereitstellt.

Zentrale Leitprinzipien der Architektur sind:
- **Privacy-by-Design**
- **Trennung von statischen und dynamischen Daten**
- **Offline-Vorverarbeitung komplexer Geodaten**
- **Klare Abgrenzung von Public- und Admin-Funktionalitäten**
- **Modularität und Erweiterbarkeit**

---

<a id="architekturprinzipien"></a>
## Architekturprinzipien

### Statische Daten statt Laufzeitberechnung

Alle rechenintensiven und allgemein gültigen Daten (z.B. Solarpotenziale (PV) und Geothermiepotenziale) werden **offline vorverarbeitet** und als **statische Attribute direkt in die 3D Tiles eingebettet**.  
Zur Laufzeit findet keine Neuberechnung dieser Potenziale statt.

Dies reduziert:
- die Komplexität des Laufzeitsystems
- die Serverlast
- die Fehleranfälligkeit

---

### Clientseitige Berechnung als Standard

Der Berechnungskern ist als **eigenständiges JavaScript-Modul** konzipiert und kann vollständig im Browser ausgeführt werden.  
Damit ist es möglich, energetische Berechnungen durchzuführen, **ohne Nutzereingaben an einen Server zu übertragen**.

Diese Architekturentscheidung dient insbesondere:
- dem Datenschutz
- der Transparenz gegenüber Bürgern (Eigentümern/Vermietern)
- der Reduktion von Backend-Abhängigkeiten

Eine serverseitige Ausführung der Berechnung ist optional vorgesehen, z.B. für administrative Zwecke oder zukünftige Erweiterungen.

---

### Klare Trennung von Bürger- und Admin-Bereich (Stadtverwaltung / Fachpersonal)

Die Anwendung unterscheidet strikt zwischen:
- einem **öffentlichen Client** für Bürger (Eigentümer/Vermieter)
- einem **administrativen Bereich** für Stadtverwaltung / Fachpersonal

Der Admin-Bereich wird **serverseitig geschützt** und erst nach erfolgreicher Authentifizierung ausgeliefert.  
Der öffentliche Client ist jederzeit ohne Anmeldung erreichbar.

Diese Trennung erfolgt nicht nur logisch, sondern auch technisch auf Ebene der HTML-Auslieferung.

---

### Statische Auslieferung des Frontends

Das Frontend wird vollständig als **statische Webanwendung** erzeugt.  
Ein Static-Site-Generator wird ausschließlich zur Build-Zeit eingesetzt.  
Zur Laufzeit existiert keine serverseitige Renderlogik.

Die interaktiven Teile der Anwendung werden über klar abgegrenzte Client-Komponenten realisiert.

---

### Nachnutzung und White-Labeling

Die Architektur trennt **Kernlogik** von **kommunenspezifischen Profilen**.
Kernkomponenten (Berechnungskern, Backend-Services, Pipeline-Orchestrierung) bleiben unverändert,
während Branding, Texte, Datenquellen und Mapping-Regeln über versionierte Profile ausgetauscht werden.

Kernprinzipien:
- Regensburg-spezifische Inhalte sind zu kapseln und nicht in Kernkomponenten zu hartcodieren.
- Für jede Kommune wird ein eigenes Daten-Mapping auf ein kanonisches Zielschema geführt.
- Optionale Erweiterungsstandards wie **CityGML Energy ADE** werden über dieselbe Mapping-Schicht integriert.
- Pro Deployment bedient eine DEZ-Instanz genau eine Kommune; weitere Kommunen werden über getrennte Deployments angebunden.

Damit kann dieselbe Plattform für weitere Kommunen und angrenzende Use Cases betrieben werden,
ohne die Systemarchitektur pro Kommune neu aufzubauen (vgl. TA-122 bis TA-129).

---

<a id="security-by-design-in-der-architektur"></a>
## Security by Design in der Architektur

Security by Design wird nicht als separates Add-on verstanden, sondern als feste Architekturinvariante:

- **Single Entry Point**: Externe Zugriffe erfolgen ausschließlich über APISIX; interne Dienste sind nicht direkt öffentlich erreichbar (TA-103, TA-59).
- **Trust-Boundary Public/Admin**: Öffentliche und administrative Pfade sind technisch getrennt; Admin-HTML wird erst nach erfolgreicher Authentifizierung ausgeliefert (TA-02, TA-04, TA-09).
- **Missbrauchsschutz bei Public Write**: Altcha, Rate Limiting, serverseitige Validierung und Server-Recompute wirken als kombinierte Schutzkette (TA-47 bis TA-51, TA-62).
- **Datenminimierung und Angriffsflächenreduktion**: Statische Potenziale liegen in Tiles statt in der Datenbank; das Backend liefert keine großen Tile-Daten aus (TA-14, TA-38).
- **Konfigurationsintegrität**: Veröffentlicht werden unveränderliche, versionierte Snapshots; Berechnungsergebnisse bleiben reproduzierbar (TA-43 bis TA-46, TA-31).
- **Plattformhärtung**: Secrets-Management, TLS, Non-Root-Container und auditierbare Security-Events sind verbindlich (TA-60, TA-61, TA-63, TA-64).

Abgrenzung: Das Sicherheitskonzept in `docs/system/03-security-concept.md` beschreibt Ziele, BSI-Bezug und Maßnahmenrahmen.  
Die Architekturdokumente konkretisieren, **wo** diese Kontrollen technisch verankert sind.

---

<a id="zentrale-systembausteine"></a>
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
- Verwaltung und Veröffentlichung von Berechnungskonfigurationen
- Persistenz von Nutzereingaben
- Administrative Triage-Funktionen
- Optionale serverseitige Berechnung

Das Backend ist **nicht** für die Auslieferung großer statischer Datenmengen zuständig.

---

### 3D Tiles & Gateway

3D Tiles werden:
- offline erzeugt
- mit allen relevanten Potenzialattributen angereichert
- über APISIX bereitgestellt (direkter Zugriff auf den externen Datendienst oder optional über ein Tiles Gateway)

Die Tiles enthalten zusätzlich Adressen aus LOD2, optionale Texturen zur Solarpotenzial-Visualisierung
und Vegetationsobjekte (Bäume) für die 3D-Darstellung.

Das optionale Tiles Gateway entkoppelt die Auslieferung der Tiles vom Backend und kann bei Bedarf zusätzliche Proxy-Funktionen übernehmen.

---

### Datenhaltung

- **3D Tiles**: enthalten ausschließlich statische, allgemein gültige Daten
- **Datenbank**: enthält Nutzereingaben, Triage-Informationen und Konfigurationsdaten
- Es findet keine doppelte Datenhaltung statischer Potenziale statt

---

<a id="einordnung-im-gesamtsystem"></a>
## Einordnung im Gesamtsystem

Die Architektur ist bewusst so gestaltet, dass:
- ein funktionsfähiger MVP mit überschaubarem Aufwand realisiert werden kann
- spätere Erweiterungen (z.B. komplexere Berechnungen, zusätzliche Datenquellen) möglich bleiben
- Datenschutz- und Sicherheitsanforderungen frühzeitig berücksichtigt werden
- die Integration in das MasterPortal im MVP als reiner Link-Out auf den öffentlichen DEZ-Client umgesetzt werden kann (ohne API- oder SSO-Kopplung)

Architekturgründe für den separaten DEZ-Betrieb mit Link-Out:
- **Performanz**: Schlanke, statische DEZ-Auslieferung ohne Laufzeit-Overhead einer tiefen Portalintegration.
- **Verfügbarkeit**: DEZ kann unabhängig vom Geo-/Masterportal betrieben und bereitgestellt werden.
- **Unabhängiger Release-Zyklus**: DEZ-Änderungen und Fixes sind ohne gekoppelte Portal-Deployments ausrollbar.
- **Betriebliche Entkopplung von Consent/Tracking**: DEZ-spezifische Datenschutz- und Analytics-Logik bleibt isoliert steuerbar.
- **Skalierbarkeit/Nachnutzung**: Das eigenständige Deployment-Modell lässt sich für weitere Kommunen einfacher wiederverwenden.

Die folgenden Kapitel vertiefen die Architektur auf Container- und Komponentenebene sowie die Datenpipeline im Detail.
