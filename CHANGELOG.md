<!-- faf: doc=changelog | latest=v0.1.0 | canonical=project.faf | family=FAF -->

# Changelog

## [0.1.0] - 2026-10-04

**`npx sv add faf-sv` gives a Svelte or SvelteKit project its project.faf, written by faf-cli.** 5 tests.

### Added
- The `faf` add-on for the Svelte CLI (`sv`). It adds `faf-cli` (`^8.1.1`) to devDependencies and a `faf` script (`faf auto`), and with `agents` a `faf:agents` script (`faf export --agents`). Scripts that already exist are left alone.
- Two options, both on by default: `run` writes project.faf now, and `agents` also writes AGENTS.md. faf-cli runs through the project's own package runner (npx, pnpm dlx, bunx).
- faf-cli 8.1.1 reads SvelteKit 3 projects in full: SvelteKit, the adapter from `vite.config`, and the build as `Vite 8`.
