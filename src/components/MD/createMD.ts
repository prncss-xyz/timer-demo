import * as prod from 'react/jsx-runtime'
import rehypeReact, { Components } from 'rehype-react'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import breaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import parse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

function createParser() {
	const parser = unified()
		.use(parse)
		.use(remarkGfm)
		.use(breaks)
		.use(remarkRehype, {})
		.use(rehypeSanitize)
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

const htmlParser = createParser()
export async function mdToHtml(md: string) {
	const result = htmlParser.use(rehypeStringify).process(md)
	return String(result)
}

export function createMD(defaultComponents: Partial<Components>) {
	return async function MD({ children }: { children: string }) {
		const parser = getParser(defaultComponents)
		const { result } = await parser.process(children)
		return result
	}
}
