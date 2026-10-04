import { defineAddon, defineAddonOptions } from 'sv';

/** The faf-cli range this add-on installs. */
const FAF_CLI = '^8.1.1';

const options = defineAddonOptions()
	.add('agents', {
		question: 'Also write AGENTS.md for coding agents?',
		type: 'boolean',
		default: true
	})
	.add('run', {
		question: 'Write project.faf now?',
		type: 'boolean',
		default: true
	})
	.build();

/** Add the faf scripts to package.json, keeping any script already there. */
export function addScripts(content: string, agents: boolean): string {
	const pkg = JSON.parse(content);
	pkg.scripts ??= {};
	pkg.scripts.faf ??= 'faf auto';
	if (agents) {
		pkg.scripts['faf:agents'] ??= 'faf export --agents';
	}
	const indent = /^[ \t]+/m.exec(content)?.[0] ?? '\t';
	return JSON.stringify(pkg, null, indent) + '\n';
}

export default defineAddon({
	id: 'faf',
	shortDescription: 'project.faf: AI context for this project',
	homepage: 'https://faf.one',
	options,

	run: async ({ sv, options }) => {
		sv.devDependency('faf-cli', FAF_CLI);
		sv.file('package.json', (content) => addScripts(content, options.agents));

		if (options.run) {
			// faf-cli is not installed yet when add-ons run; execute() runs it
			// through the project's package runner (npx, pnpm dlx, bunx, ...).
			await sv.execute(['faf-cli', 'auto'], 'inherit');
			if (options.agents) {
				await sv.execute(['faf-cli', 'export', '--agents'], 'inherit');
			}
		}
	},

	nextSteps: ({ options }) => [
		options.run ? 'project.faf is written. Commit it.' : 'Run npm run faf to write project.faf.',
		'Run npm run faf again whenever the stack changes.',
		...(options.agents ? ['Run npm run faf:agents to refresh AGENTS.md.'] : [])
	]
});
