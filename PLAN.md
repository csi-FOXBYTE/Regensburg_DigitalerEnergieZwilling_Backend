# Backend — Near-term Feature Plan

Personal working notes. Not part of the shared project docs.

---

## Config Versioning

**Context**

The calculation core package (sibling repo `Regensburg_DigitalerEnergieZwilling_EnergyCalculationCore`) defines two central types:
- `Config` — the configuration shape for a calculation run
- `Input` — the input shape passed to the calculation function

The core package defines a default `Config`. The frontend currently uses that default directly. The goal is for the backend to take ownership of versioning and serving configs, so the frontend (and other consumers) fetch the active version from the backend rather than relying on the core default.

**Goal**

- Store named config versions in the database (one table, JSON/string column for the config payload)
- Track which version is the currently active one
- Expose an endpoint that serves the active config (consumed by frontend and eventually the calculation pipeline)
- Admin frontend gets endpoints to create new versions and promote one to active

**Open**

- The core package will add a `verify`/`validate` function for the config shape — integrate that on write once available
- Exact migration path from the frontend default config TBD

---

---

## JWT Signature Verification

**Context**

The backend currently uses `jwt.decode()` in `auth.service.ts` — it validates expiry/nbf but never verifies the token signature. The implicit assumption is that APISIX already verified the token before forwarding the request. This means anything that can reach the backend directly (inside the cluster, bypassing APISIX) can send a request with a forged `x-access-token` header and the backend will accept it.

**Goal**

Switch from `jwt.decode()` to `jwt.verify()` using Keycloak's RS256 public key:

1. On startup, fetch Keycloak's JWKS from `{keycloak_url}/realms/{realm}/protocol/openid-connect/certs` and cache the public key(s)
2. Use the cached key to call `jwt.verify()` instead of `jwt.decode()` in `verifyAccessToken()`
3. Refresh the JWKS cache periodically or on key-not-found (to handle Keycloak key rotation)
4. In `NODE_ENV=development`, fall back to the current decode-only behaviour since dev tokens are HS256 signed with the APISIX shared secret

**Complement with a Kubernetes NetworkPolicy** in the addon restricting backend pod ingress to APISIX only — defence in depth so the network layer also rejects direct access.

**Why deferred**

Low risk for now since the backend is not directly exposed (K8s service has no external ingress). Implement before any multi-tenant or sensitive data features land.

---

---

## Automated Image Version Pinning (Renovate)

**Context**

Image tags in the addon's `vars/software_references.yml` are currently floating (`dev`). Once versions are pinned, keeping them up to date manually is tedious.

**Goal**

Add a `renovate.json` to the addon repo with a `customManagers` regex that matches the `tag:` fields under each `registry`/`repository` entry in `software_references.yml`. Renovate checks GHCR for newer tags and opens a PR to update the file.

Configure two triggers in a GitHub Actions workflow:
- **Scheduled**: daily cron to catch new releases automatically
- **Manual**: `workflow_dispatch` to trigger on demand from the GitHub Actions UI

**Why deferred**

Requires version pinning to be in place first. No value while tags are floating.

---

_More features to be added._
