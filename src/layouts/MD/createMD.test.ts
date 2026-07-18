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

		// `img-svg` embeds the diagram as `<img src="data:image/svg+xml,...">`, so the
		// SVG payload is URL-encoded inside the data URI rather than inlined.
		expect(html).toContain('<img')
		expect(html).toMatch(/src="data:image\/svg\+xml,/)
		// Labels must be rendered as native SVG `<text>`/`<tspan>` (htmlLabels:false),
		// never as HTML inside `<foreignObject>` — which is invisible under `<img>`.
		expect(html).not.toContain('foreignObject')
		// Mermaid's flowchart path omits `xml:space` on its word-tspans, so the
		// leading-space word separators can be stripped under default `xml:space`
		// when the SVG is parsed as an `<img>` data URI. Verify the SVG root is
		// stamped `xml:space='preserve'` so words stay separated in any renderer.
		// (rehype-stringify HTML-escapes `'` as `&#x27;`, so accept either form.)
		expect(html).toMatch(/xml:space=(&#x27;|')preserve(&#x27;|')/)
		expect(html).toContain('font-family:Nunito')
		expect(html).not.toContain('font-family:arial,sans-serif')
		expect(html).not.toContain('<pre><code')
	})
})
