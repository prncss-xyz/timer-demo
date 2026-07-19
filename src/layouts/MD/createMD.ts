import { Buffer } from 'node:buffer'

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

import { siteFontFamily, siteWebfontCssUrl } from '../../../fontConstants'
import { embedWebfontCss } from '../../utils/embedWebfontCss'
import { shikiThemes } from '../shiki'
import { rehypeListDepth } from './listDepth'

const svgDataUriPrefix = 'data:image/svg+xml,'

function prepareMermaidSvgDataUri(value: string, fontCss: string) {
	if (!value.startsWith(svgDataUriPrefix)) return value

	const svg = decodeURIComponent(value.slice(svgDataUriPrefix.length))
	const preparedSvg = svg
		.replace(/<svg\b(?![^>]*\bxml:space=)/, "<svg xml:space='preserve'")
		.replace(/(<svg\b[^>]*>)/, `$1<style>${fontCss}</style>`)
	return `${svgDataUriPrefix}${encodeURIComponent(preparedSvg)}`
}

function rehypePrepareMermaidSvg(fontCss: string) {
	type Node = {
		type: string
		tagName?: string
		properties?: Record<string, unknown>
		children?: Node[]
	}
	return () => (tree: Node) => {
		function visit(node: Node) {
			if (
				node.type === 'element' &&
				(node.tagName === 'img' || node.tagName === 'source')
			) {
				for (const property of ['src', 'srcset']) {
					const value = node.properties?.[property]
					if (typeof value === 'string') {
						node.properties![property] = prepareMermaidSvgDataUri(
							value,
							fontCss,
						)
					}
				}
			}
			for (const child of node.children ?? []) visit(child)
		}
		visit(tree)
	}
}

const mermaidFontCssPromises = new Map<string, Promise<string>>()
const mermaidCodeBlockPattern =
	/(?:^|\n)(`{3,}|~{3,})mermaid[^\n]*\n([\s\S]*?)\n\1(?=\n|$)/g

function getMermaidDiagramText(markdown: string) {
	const diagrams = [...markdown.matchAll(mermaidCodeBlockPattern)].map(
		(match) => match[2]!,
	)
	if (!diagrams.length) return
	return [...new Set(diagrams.join(''))].join('')
}

function getMermaidFontCss(diagramText: string) {
	const cssUrl = `${siteWebfontCssUrl}&text=${encodeURIComponent(diagramText)}`
	let promise = mermaidFontCssPromises.get(cssUrl)
	if (!promise) {
		promise = embedWebfontCss(cssUrl, siteFontFamily, diagramText)
		mermaidFontCssPromises.set(cssUrl, promise)
	}
	return promise
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

async function createParser(markdown: string) {
	const parser = createMdParser().use(rehypeSanitize).use(rehypeListDepth)
	const mermaidDiagramText = getMermaidDiagramText(markdown)
	if (mermaidDiagramText) {
		const mermaidFontCss = await getMermaidFontCss(mermaidDiagramText)
		const mermaidFontCssUrl = `data:text/css;base64,${Buffer.from(
			mermaidFontCss,
		).toString('base64')}`
		const mermaidConfig = {
			htmlLabels: false,
			fontFamily: siteFontFamily,
			themeVariables: {
				fontFamily: siteFontFamily,
			},
		}
		parser
			.use(rehypeMermaid, {
				strategy: 'img-svg',
				css: mermaidFontCssUrl,
				// `img-svg` is isolated from the page, so both themes need native SVG
				// labels and the explicitly loaded site font.
				mermaidConfig,
				dark: {
					...mermaidConfig,
					theme: 'dark',
				},
				launchOptions: {
					...(!process.env.CI && { executablePath: '/usr/bin/chromium' }),
				},
			})
			.use(rehypePrepareMermaidSvg(mermaidFontCss))
	}
	return parser.use(rehypePrettyCode, prettyCodeOptions)
}

async function getParser(components: Partial<Components>, markdown: string) {
	const parser = (await createParser(markdown)).use(rehypeReact, {
		Fragment: prod.Fragment,
		components,
		jsx: prod.jsx,
		jsxs: prod.jsxs,
	})
	return parser
}

export async function mdToHtml(md: string) {
	const result = await (await createParser(md)).use(rehypeStringify).process(md)
	return String(result)
}

export function createMD(defaultComponents: Partial<Components>) {
	return async function MD({ children }: { children: string }) {
		const parser = await getParser(defaultComponents, children)
		const { result } = await parser.process(children)
		return result
	}
}
