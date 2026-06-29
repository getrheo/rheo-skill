# @getrheo/rheo-skill

Source and build tooling for the **`rheo`** agent skill — a single, self-contained
skill with two sub-skills:

- **`rheo/rheo-best-practices`** — how to install and wire the Rheo SDK (React Native,
  Expo, SwiftUI), integrations, auth, and implementation best practices. Pure
  guidance, no scripts.
- **`rheo/rheo-flow-import`** — how to analyze an existing mobile flow and export it as
  a compliant Rheo `FlowManifest`, plus self-contained `node` scripts (audit,
  scaffold, validate, audit-publish, normalize, summary, profile).

## The deliverable is `rheo/`

The installable artifact is the [`rheo/`](rheo) directory. It is fully
self-contained: the rheo-flow-import scripts run with **plain `node`** and need **no
`pnpm install`**, because the validation/scaffold engine, `zod`, `@getrheo/contracts`,
and `@getrheo/flow-runtime` are bundled into
`rheo/rheo-flow-import/scripts/lib/rheo-cli.mjs` at build time.

```text
rheo/
├── SKILL.md                      # router → rheo-best-practices / rheo-flow-import
├── rheo-best-practices/
│   ├── SKILL.md
│   ├── references/               # install-* , integrations, implement-workflow, troubleshooting
│   └── examples/               # install snippets
└── rheo-flow-import/
    ├── SKILL.md
    ├── references/               # import-workflow, flow-spec, capabilities (generated), manifest-rules,
    │                             #   layer-schema-pitfalls, publish-gates, *-source-patterns, carousel/font/i18n/animation
    ├── examples/                 # valid manifests + flow-spec.example.json
    └── scripts/
        ├── *.mjs                 # thin wrappers (import runCli from lib)
        └── lib/rheo-cli.mjs      # GENERATED self-contained bundle (committed)
```

## Source layout (this package)

- `src/` — TypeScript engine (CLI, audit analyzers, scaffold, publish gates,
  validation, profile fetch). Source of truth for the bundle.
- `scripts/build-skill.ts` — esbuild bundler → `rheo/rheo-flow-import/scripts/lib/rheo-cli.mjs`.
- `src/capabilities/generateCapabilities.ts` — regenerates
  `rheo/rheo-flow-import/references/capabilities.md` from `@getrheo/contracts`.
- `test/` — vitest suite (scaffold structure, publish gates, validation,
  capabilities drift, bundle smoke test).

## Commands

```bash
pnpm --filter @getrheo/rheo-skill build          # gen:capabilities + bundle (run before committing)
pnpm --filter @getrheo/rheo-skill gen:capabilities
pnpm --filter @getrheo/rheo-skill bundle
pnpm --filter @getrheo/rheo-skill test
pnpm --filter @getrheo/rheo-skill typecheck
pnpm --filter @getrheo/rheo-skill validate:examples
pnpm --filter @getrheo/rheo-skill validate:skill-format   # agentskills.io frontmatter (skills-ref)
```

`validate:skill-format` installs the official [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref) validator into a local `.venv-skills-ref` (gitignored) and checks `rheo/`, `rheo/rheo-best-practices/`, and `rheo/rheo-flow-import/`. Requires Python 3.11+. Set `SKILLS_REF_SKIP=1` to skip (e.g. environments without Python). The same check runs in `pnpm test` via `test/skillFormat.test.ts`.

> Run `build` after any change under `src/` or to `@getrheo/contracts` /
> `@getrheo/flow-runtime`. When rheo-skill paths change, CI runs `build` and fails if
> `rheo-cli.mjs` or `capabilities.md` are not committed (`rheo-skill.yml`).

## Manifest profile

rheo-flow-import fetches the latest LLM-friendly Manifest Agent Profile from
`https://docs.getrheo.io/docs/md/developer-guide/agent-manifest-profile`, falling
back to `rheo/rheo-flow-import/references/manifest-agent-profile-fallback.md` offline.

## Compatibility

- Manifest schema version: `7`
- Supported SDK surfaces: React Native / Expo and SwiftUI
- Requires Node.js 20+
