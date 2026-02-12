# Dokumentation

![Docs](https://img.shields.io/badge/docs-internal-2ea44f)

Diese Dokumentation beschreibt System, Anforderungen und Architektur des Digitaler Energy Zwilling (DEZ).
DEZ steht hier für **Digitaler Energy Zwilling** und nicht für das Donau Einkaufszentrum.
Sie dient als zentrale Referenz für fachliche Entscheidungen, technische Umsetzung und Betrieb.
Die Gliederung folgt der Nummerierung der Dateien im Ordner `docs/`.

## Schreibweise & Begriffe

- **3D Tiles** (nicht „3D-Tiles“)
- **CO₂** (nicht „CO2“)
- **Solarpotenzial (PV)**, **Geothermiepotenzial**, **Solarthermie**
- **Eingabetiefe (kontinuierliches Spektrum)** von "keine Nutzereingabe" bis "vollständig durch Nutzer definiert"
- **Bürger (Eigentümer/Vermieter)**, **Stadtverwaltung / Fachpersonal**

## Grundlagen

- **00** [Technisches Konzept](legacy/00-technical-concept.md) (historisch, wird nicht mehr genutzt)

## System

- **01** [Systemüberblick – Digitaler Energy Zwilling (DEZ)](system/01-system-overview.md)
- **02** [User Journey & UX-Leitplanken](system/02-user-journey-ux.md)
- **03** [Sicherheitskonzept](system/03-security-concept.md)

## Anforderungen

- **02** [Fachliche Anforderungen – Digitaler Energy Zwilling (DEZ)](requirements/02-functional-requirements.md)
- **03** [Technische Anforderungen – Digitaler Energy Zwilling (DEZ)](requirements/03-technical-requirements.md)

## Architektur

- **04** [Architekturübersicht – Digitaler Energy Zwilling (DEZ)](architecture/04-architecture-overview.md)
- **05** [Architektur – C4 Kontext Diagramm](architecture/05-architecture-c4-context.md)
- **06** [Architektur – C4 Container Diagramm](architecture/06-architecture-c4-container.md)
- **07** [Architektur – C4 Component Diagramm](architecture/07-architecture-c4-components.md)
- **08** [Datenmodell und API-Sicht](architecture/08-data-model-api-view.md)
- **09** [Runtime-Flows und Ops-Sicht](architecture/09-runtime-flows-ops-view.md)
- **10** [Offline-Datenpipeline](architecture/10-architecture-offline-data-pipeline.md)
- **11** [Frontend](architecture/11-architecture-frontend.md)
- **12** [Backend](architecture/12-architecture-backend.md)
- **13** [Simulationskern](architecture/13-architecture-simulation-core.md)
- **14** [Deployment (Civitas Core)](architecture/14-architecture-deployment.md)

## Anleitungen

- [Civitas-Core Setup](instructions/setup-civitas-core.md)

## Prozesse

- [Definition of Ready / Done](process/dor-dod.md)
- [Projektplanung (Entwurf)](process/project-planning.md)

## Open Source & Förderkulisse Checkliste

- Veröffentlichung des finalen Releases auf **OpenCoDE** (keine Beta-/Zwischenstände).
- Erfüllung der OpenCoDE-Qualitätskriterien: CVE-Management, automatisierte Tests, Bug-/Security-Kontaktstellen, SBOM, Release Notes, benannte verantwortliche Person, Projektbeschreibung.
- Pflichtdateien im Repository: `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `LICENSE`, `README.md`, `SECURITY.md`, `publiccode.yml`.
- SPDX-Header + Urheberrechtsvermerk in **jeder** Datei.
- Lizenzwahl in Abstimmung mit Auftraggeber (permissiv vs. Copyleft) inkl. Lizenz-Compliance; CLA/DCO einplanen.
- Dokumentation nach Open-Source-Guidelines der Förderkulisse (Installationsanleitung, Schnittstellenbeschreibung, Benutzer-/Admin-Handbuch).
- Vendor-Lock-in vermeiden: portabel, keine proprietären Secrets/Abhängigkeiten.
- Datentausch über offene Standards; Liste der verwendeten Standards im Code führen.
- Security-Grundsätze im Contribution/Release-Prozess (Secret-Scanning, abgesicherte Releases, Vieraugenprinzip).
