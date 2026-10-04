import { describe, expect, test } from 'vitest';
import { addScripts } from '../src/index.ts';

const pkg = (scripts?: Record<string, string>) => JSON.stringify({ name: 'demo', scripts }, null, '\t') + '\n';

describe('addScripts', () => {
	test('adds faf and faf:agents', () => {
		const out = JSON.parse(addScripts(pkg({ dev: 'vite dev' }), true));
		expect(out.scripts).toEqual({ dev: 'vite dev', faf: 'faf auto', 'faf:agents': 'faf export --agents' });
	});

	test('leaves out faf:agents when not asked for', () => {
		const out = JSON.parse(addScripts(pkg({}), false));
		expect(out.scripts).toEqual({ faf: 'faf auto' });
	});

	test('creates scripts when package.json has none', () => {
		expect(JSON.parse(addScripts(pkg(), false)).scripts).toEqual({ faf: 'faf auto' });
	});

	test('never overwrites a script that already exists', () => {
		const out = JSON.parse(addScripts(pkg({ faf: 'my own' }), true));
		expect(out.scripts.faf).toBe('my own');
	});

	test('keeps the file indentation', () => {
		expect(addScripts(JSON.stringify({ name: 'demo' }, null, 2) + '\n', false)).toContain('\n  "name"');
		expect(addScripts(pkg({}), false)).toContain('\n\t"name"');
	});
});
