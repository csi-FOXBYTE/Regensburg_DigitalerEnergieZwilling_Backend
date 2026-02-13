# Documentation Extension Rules

These rules define how to extend and maintain the project documentation in `docs/`.

## Language and Style

- Primary language: **German** (use proper umlauts: ä/ö/ü/ß).
- Keep wording concise and factual; avoid marketing language.
- Use consistent role terms:
  - **Hauptzielgruppe (Bürger/Eigentümer/Vermieter)**
  - **Nebenzielgruppe (Stadtverwaltung/Fachpersonal)**

## Structure and Files

- `docs/README.md` is the table of contents; update it for any new or moved docs.
- Keep the existing folder structure:
  - `docs/system`, `docs/requirements`, `docs/architecture`, `docs/process`, `docs/legacy`
- New documents should follow the numbering scheme and be placed in the correct folder.
  - Use the next free number in sequence.
  - Do **not** renumber existing documents unless explicitly requested.

## Requirements Documents

- **Fachliche Anforderungen**: Use `FA-XX` with strictly sequential numbering.
- **Technische Anforderungen**: Use `TA-XX` with strictly sequential numbering.
- When adding requirements, update numbering only forward (no gaps, no renumber of existing IDs).

## Architecture Documents

- When adding diagrams:
  - Source files go to `raw/` under the same folder as the Markdown document (e.g. `docs/architecture/raw/*.puml` for architecture docs, `docs/system/raw/*.puml` for system docs).
  - Rendered PNGs go to `attachments/` under the same folder as the Markdown document (e.g. `docs/architecture/attachments/*.png`, `docs/system/attachments/*.png`).
  - If `raw/` or `attachments/` folders are missing, create them and place files there.
  - Reference both in the related Markdown doc.
- If you change a diagram source, **regenerate** the PNG.

## Legacy Docs

- `docs/legacy/*` is historical; avoid edits unless requested.
  - If edits are needed, keep existing content and add minimal clarifications.

## Quality Checks

- Read all documents in docs/ relevant to the modified topic or folder before making changes to ensure consistency and avoid duplicate or conflicting content. For minor typo fixes, a full review of all documents is not required.
- Verify changes for consistency with the current documentation set before finalizing.
- Validate links in modified docs.
- Ensure diagrams referenced in Markdown exist.
- Prefer consistent terminology across all docs touched.
- Introduce new domain terms only if necessary.
- If a new term is introduced, define it once and reuse it consistently.
- Keep changes minimal and scoped to the stated purpose.
- Avoid unrelated refactorings of documentation.
- If the project uses document metadata (e.g. status, version, owner), keep it up to date.
