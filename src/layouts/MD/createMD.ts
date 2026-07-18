import { toString as hastToString } from 'hast-util-to-string'
import * as prod from 'react/jsx-runtime'
import rehypeMermaid from 'rehype-mermaid'
import rehypePrettyCode, {
	type Options as PrettyCodeOptions,
} from 'rehype-pretty-code'
import rehypeReact, { type Components } from 'rehype-react'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import breaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import parse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { createHighlighter } from 'shiki'
import { unified } from 'unified'

import { siteFontFamily } from '../../../fontConstants'
import { shikiThemes } from '../shiki'
import { rehypeListDepth } from './listDepth'

/**
 * Mermaid's flowchart text path emits each word after the first as
 * `<tspan> word</tspan>` (leading space, no `xml:space` on the tspan), so the
 * word separator lives in leading whitespace that some SVG renderers strip
 * under default `xml:space` (the flowchart path, unlike mermaid's gitGraph
 * path, never sets `xml:space="preserve"`). When the diagram is embedded via
 * `<img src="data:image/svg+xml,...">` (`img-svg` strategy) the SVG is parsed
 * by the viewer's XML parser, so words can run together. Stamp
 * `xml:space='preserve'` onto the SVG root of every mermaid `<img>` data URI so
 * the leading spaces are preserved in any renderer. No-op for non-SVG imgs and
 * for SVGs that already declare `xml:space`.
 */
function rehypeMermaidSvgXmlSpacePreserve() {
	type Node = {
		type: string
		tagName?: string
		properties?: { src?: unknown } & Record<string, unknown>
		children?: Node[]
	}
	return (tree: Node) => {
		function visit(node: Node) {
			if (node.type === 'element' && node.tagName === 'img') {
				const src = node.properties?.src
				if (
					typeof src === 'string' &&
					src.startsWith('data:image/svg+xml,') &&
					!src.includes('xml:space')
				) {
					node.properties!.src = src.replace(
						/(%3[cC]svg)/,
						"$1 xml:space='preserve'",
					)
				}
			}
			for (const child of node.children ?? []) visit(child)
		}
		visit(tree)
	}
}

const highlighter = createHighlighter({
	langs: [
		'tsx',
		'typescript',
		'javascript',
		'jsx',
		'json',
		'bash',
		'css',
		'html',
		'markdown',
		'diff',
	],
	themes: ['github-light', 'github-dark'],
})

const prettyCodeOptions = {
	defaultLang: {
		block: 'txt',
		inline: 'txt',
	},
	getHighlighter: () => highlighter,
	keepBackground: false,
	theme: shikiThemes,
} satisfies PrettyCodeOptions

function createMdParser() {
	return unified().use(parse).use(remarkGfm).use(breaks).use(remarkRehype, {})
}

const toTextParser = createMdParser()

export async function mdToText(children: string) {
	const tree = await toTextParser.run(toTextParser.parse(children))
	return hastToString(tree)
}

function createParser() {
	const parser = createMdParser()
		.use(rehypeSanitize)
		.use(rehypeListDepth)
		.use(rehypeMermaid, {
			strategy: 'img-svg',
			mermaidConfig: {
				// `img-svg` loads the diagram through `<img src="data:image/svg+xml,...">`,
				// an isolated SVG document whose HTML-in-`<foreignObject>` labels do not
				// render. Disabling `htmlLabels` makes mermaid emit native `<text>` /
				// `<tspan>` labels that render in any SVG context. (With `inline-svg`
				// `htmlLabels: true` works because the SVG shares the page's HTML
				// rendering context, but `img-svg` needs the safer path.)
				htmlLabels: false,
				fontFamily: siteFontFamily,
				themeVariables: {
					fontFamily: siteFontFamily,
				},
			},
			launchOptions: {
				...(!process.env.CI && { executablePath: '/usr/bin/chromium' }),
			},
		})
		.use(rehypeMermaidSvgXmlSpacePreserve)
		.use(rehypePrettyCode, prettyCodeOptions)
	return parser
}

function getParser(components: Partial<Components>) {
	const parser = createParser().use(rehypeReact, {
		Fragment: prod.Fragment,
		components,
		jsx: prod.jsx,
		jsxs: prod.jsxs,
	})
	return parser
}

export async function mdToHtml(md: string) {
	const result = await createParser().use(rehypeStringify).process(md)
	return String(result)
}

export function createMD(defaultComponents: Partial<Components>) {
	return async function MD({ children }: { children: string }) {
		const parser = getParser(defaultComponents)
		const { result } = await parser.process(children)
		return result
	}
}
