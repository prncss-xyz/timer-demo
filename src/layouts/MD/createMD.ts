import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

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

import { shikiThemes } from '../shiki'
import { siteFontFamily } from '../tokens/fontConstants'
import { rehypeListDepth } from './listDepth'

const mermaidFontCss = pathToFileURL(
	resolve('src/layouts/MD/mermaid-fonts.css'),
)

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
			css: mermaidFontCss,
			mermaidConfig: {
				fontFamily: siteFontFamily,
				themeVariables: {
					fontFamily: siteFontFamily,
				},
			},
			strategy: 'inline-svg',
			launchOptions: {
				...(!process.env.CI && { executablePath: '/usr/bin/chromium' }),
			},
		})
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
