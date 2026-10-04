# faf-sv

A [Svelte CLI](https://svelte.dev/docs/cli) add-on that gives a Svelte or SvelteKit project a `project.faf`: AI context that coding agents read, in the IANA-registered [.faf](https://faf.one) format.

```bash
npx sv add faf-sv
```

It asks two questions (both default to yes):

| Option | What it does |
|---|---|
| `run` | Writes `project.faf` now, with [faf-cli](https://www.npmjs.com/package/faf-cli) |
| `agents` | Also writes `AGENTS.md`, and adds a `faf:agents` script |

To skip the questions:

```bash
npx sv add faf-sv="run:yes+agents:yes"
```

## What it changes

- `faf-cli` (`^8.1.1`) is added to `devDependencies`.
- `package.json` gets `"faf": "faf auto"` (and `"faf:agents": "faf export --agents"`). Scripts that already exist are left alone.
- With `run`, faf-cli writes `project.faf` (and `AGENTS.md` with `agents`) through your package manager's runner.

faf-cli reads the stack from the repo: SvelteKit, the adapter (from `vite.config` in SvelteKit 3 or `svelte.config.js` before it), TypeScript, Vite and the rest. Run `npm run faf` again whenever the stack changes.

## License

MIT
