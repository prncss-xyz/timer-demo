import { createHighlighter } from 'shiki'
// TODO: make it sync

import { Box, BoxProps } from '../Box'

const shikiThemes = {
	light: 'github-light',
	dark: 'github-dark',
}

const highlighterPromise = createHighlighter({
	langs: ['json'],
	themes: [shikiThemes.light, shikiThemes.dark],
})

export async function Json({
	u,
	...rest
}: { u: unknown } & Omit<BoxProps<'div'>, 'children'>) {
	const highlighter = await highlighterPromise
	const jsonStr = JSON.stringify(u, null, 2)

	const html = highlighter.codeToHtml(jsonStr, {
		lang: 'json',
		themes: shikiThemes,
		transformers: [
			{
				pre(node) {
					const currentClass = node.properties.className
					const currentClasses = Array.isArray(currentClass)
						? currentClass.map(String)
						: typeof currentClass === 'string'
							? currentClass.split(' ')
							: []
					node.properties.className = currentClasses
				},
			},
		],
	})

	return (
		<Box
			monospace
			fontSize={2}
			p={4}
			{...rest}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	)
}
