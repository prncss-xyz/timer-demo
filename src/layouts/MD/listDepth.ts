import type { Plugin } from 'unified'

type Node = Root | Element | Parent

type Parent = {
	children?: Node[]
	type: string
}

type Root = Parent & {
	type: 'root'
}

type Element = Parent & {
	properties?: Record<string, unknown>
	tagName: string
	type: 'element'
}

const listTags = new Set(['ol', 'ul'])

function isElement(node: Node): node is Element {
	return node.type === 'element'
}

function isListElement(node: Node): node is Element {
	return isElement(node) && listTags.has(node.tagName)
}

function countListAncestors(ancestors: Node[]) {
	return ancestors.filter(isListElement).length
}

function visitListElements(node: Node, ancestors: Node[]) {
	if (isListElement(node)) {
		node.properties = {
			...node.properties,
			'data-depth': countListAncestors(ancestors),
		}
	}

	for (const child of node.children ?? []) {
		visitListElements(child, [...ancestors, node])
	}
}

export const rehypeListDepth: Plugin<[], Root> = () => {
	return (tree: Root) => {
		visitListElements(tree, [])
	}
}
