import { readFile } from 'node:fs/promises'

import { describe, expect, test } from 'vitest'

import { mdToHtml, mdToText } from './createMD'

describe('mdToText', async () => {
	test('converts markdown to plain text', async () => {
		expect(await mdToText('# Hello **world**\n\n- one\n- two')).toBe(
			'Hello world\n\none\ntwo\n',
		)
	})
})

describe('mdToHtml', () => {
	test('wires dual-theme token variables to visible syntax colors', async () => {
		const [html, css] = await Promise.all([
			mdToHtml('```js\nconst x = 3\n```'),
			readFile('src/pages/syntax-highlighting.css', 'utf8'),
		])

		expect(html).toContain('<span')
		expect(html).toMatch(/<span[^>]*style="[^"]*--shiki-light:/)
		expect(html).toMatch(/<span[^>]*style="[^"]*--shiki-dark:/)
		expect(css).toMatch(/code\[data-theme\*=['"] ['"]\] span/)
		expect(css).toContain('color: var(--shiki-light)')
		expect(css).toContain('color: var(--shiki-dark)')
	})

	test('renders mermaid diagrams on the server using the site font', async () => {
		const html = await mdToHtml(
			'a test paragraph\n\n```mermaid\nflowchart TD\n  Start([Start]) --> Timer[Start the timer]\n  Timer --> Decide{Need a break?}\n  Decide -- Yes --> Pause[Pause]\n  Decide -- No --> Done[Done]\n```',
		)

		expect(html).toContain('<svg')
		expect(html).toContain('Start the timer')
		expect(html).toContain('font-family:Nunito,sans-serif')
		expect(html).not.toContain('font-family:arial,sans-serif')
		expect(html).not.toContain('<pre><code')
	})
})
