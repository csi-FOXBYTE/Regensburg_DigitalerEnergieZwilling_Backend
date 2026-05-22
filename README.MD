# Backend API

Node.js/TypeScript-Backend auf Fastify v5 mit `@csi-foxbyte/fastify-toab`, APISIX-geschuetzter Auth-/Rollenpruefung und BullMQ-UI.

## Basis-URL

Wichtig: Alle Requests in der lokalen Umgebung ueber

- `http://localhost:5000`

Die API wird intern auf Port `5000` gestartet, aber der externe Einstieg ist APISIX.
Von außen ist nur APISIX auf `localhost:5000` sichtbar.
Ist der User nicht authentifiziert, erfolgt der Login ueber Keycloak. Nach erfolgreichem Login setzt Keycloak ein verschluesseltes JWT-Token als Browser-Cookie; APISIX prueft dieses Cookie und schuetzt die Routen. Das Backend prueft keine JWT-Signatur.

## Zweck

Dieses Repo startet einen HTTP-Server mit:

- Auswertung von APISIX-geprueften Access-Token-Claims und Rollen
- TOAB-Controller/Service-Registrierung
- Swagger UI unter `/docs`
- BullMQ-Board unter `/bullMQ`
- zentralem Pino-Logging (inkl. `console.*`-Injection)

## Tech Stack

- Node.js (ESM)
- TypeScript
- Fastify 5
- Pino + pino-pretty
- `@csi-foxbyte/fastify-toab`
- BullMQ + Bull Board

## Projektstruktur (relevant)

- `src/index.ts`: App-Bootstrap, Fastify-Setup, Plugins, Listen
- `src/lib/pino.ts`: Logger-Setup + `injectPinoLogger`
- `src/auth/*`: Auth DTOs, Service, Controller, Middleware
- `src/test/test.controller.ts`: geschuetzte Test-Route
- `src/registries.ts`: autogenerierte TOAB Registries
- `scripts/create-dev-jwt.mjs`: Dev-JWT Generator
- `dev.ts`: lokaler Dev-Runner mit Watch + Restart
- `esbuild.ts`: Build/Dev-Build Funktionen

## Voraussetzungen

- Node.js 20+ (empfohlen aktuell LTS)
- pnpm 10+

## Installation

```bash
pnpm install
```

## Lokaler Start

```bash
pnpm dev
```

Der Dev-Runner:

- baut TypeScript nach `.dev/`
- watched `src/**`
- startet Node mit `NODE_ENV=development`
- startet bei Aenderungen neu

Interner App-Port ist `5000` (falls `PORT` nicht gesetzt ist). Externe Requests laufen ueber APISIX auf `http://localhost:5000`.

## Wichtige Endpunkte

- `GET /docs` -> Swagger UI
- `GET /bullMQ` -> Bull Board UI
- `GET /admin/api/auth/verify` -> gibt den vom Gateway geprueften Token-Payload zurueck
- `GET /api/admin/test/` -> geschuetzte Test-Route (Route durch APISIX geschuetzt, Backend-Rollenpruefung aktiv)

## Umgebungsvariablen (.env)

Aktuell sind keine verpflichtenden Auth-Umgebungsvariablen konfiguriert.
JWT/OIDC-Validierung, Signaturpruefung und Routenschutz erfolgen in APISIX. Grundlage ist das von Keycloak nach dem Login gesetzte verschluesselte JWT-Cookie im Browser.
Das Backend dekodiert den uebergebenen Token nur zur Auswertung von Claims/Rollen und vertraut produktiv ausschliesslich auf Gateway-geroutete Requests.
Optional fuer Rollenpruefung ueber `resource_access`:

```env
AUTH_RESOURCE_ACCESS_CLIENT_ID=digital-energy-twin
```

Wenn nicht gesetzt, wird standardmaessig `digital-energy-twin` verwendet.

## Dev-JWT fuer lokale Entwicklung erzeugen

Schnellstart:

```bash
pnpm jwt:dev
```

Raw Token:

```bash
pnpm jwt:dev --output raw
```

Beispiel mit eigenen Werten:

```bash
pnpm jwt:dev \
  --key dev_admin \
  --secret dev_admin-secret-change-me \
  --issuer http://localhost:8080/realms/dev \
  --audience account \
  --client-id digital-energy-twin \
  --roles admin,user \
  --ttl 3600
```

Hilfe:

```bash
pnpm jwt:dev --help
```

## Lokale API-Aufrufe mit Dev-Token

Produktiv werden Tokens durch APISIX/OIDC geprueft. Die folgenden Aufrufe dienen nur der lokalen Entwicklung der Backend-Middleware.

### 1) Mit Bearer bzw. x-access-token

```bash
TOKEN="$(pnpm -s jwt:dev --output raw)"

curl -i http://localhost:5000/admin/api/auth/verify \
  -H "x-access-token: ${TOKEN}"

curl -i http://localhost:5000/api/admin/test/ \
  -H "Authorization: Bearer ${TOKEN}"
```

## Logging

- `injectPinoLogger()` wird frueh in `src/index.ts` aufgerufen.
- `console.log/info/warn/error/debug` werden auf Pino gemappt.
- Mehrere `console`-Argumente werden zusammengefuehrt; `Error` wird als `err` strukturiert geloggt.
- Fastify nutzt dieselbe Logger-Instanz ueber `loggerInstance`.
- Das Backend schreibt seine Logs ausschliesslich auf `stdout`/`stderr`; das passt zum Container-Betrieb unter Kubernetes.
- Container-Logs können dadurch direkt von Promtail oder Grafana Alloy eingesammelt werden.

## Fehlerformat

Route-Fehler laufen ueber `routeErrorHandler` und werden als `AppError`-Response serialisiert:

```json
{
  "status": "UNAUTHORIZED",
  "code": 401,
  "message": "Access token is missing"
}
```

Im Development kann zusaetzlich `stack` enthalten sein.

## Hinweise zum Build

`pnpm build` nutzt `build.ts`.

## Dokumentation (fachlich/architektonisch)

Ausführliche System- und Architekturdocs liegen unter:

- `docs/README.md`
- `docs/system/*`
- `docs/architecture/*`
- `docs/requirements/*`
