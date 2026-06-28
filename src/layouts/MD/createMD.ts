import * as prod from 'react/jsx-runtime'
import rehypePrettyCode, {
	Options as PrettyCodeOptions,
} from 'rehype-pretty-code'
import rehypeReact, { Components } from 'rehype-react'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import breaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import parse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { createHighlighter } from 'shiki'
import { unified } from 'unified'

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
	theme: {
		dark: 'github-dark',
		light: 'github-light',
	},
} satisfies PrettyCodeOptions

function createParser() {
	const parser = unified()
		.use(parse)
		.use(remarkGfm)
		.use(breaks)
		.use(remarkRehype, {})
		.use(rehypeSanitize)
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
