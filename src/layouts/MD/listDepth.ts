import type { Root, List } from 'mdast'
import type { Plugin } from 'unified'
import { visitParents } from 'unist-util-visit-parents'

export const remarkListDepth: Plugin<[], Root> = () => {
	return (tree: Root) => {
		visitParents(tree, 'list', (node: List, ancestors) => {
			// Count how many 'list' nodes are in the ancestors array to determine current depth
			const depth = ancestors.filter(
				(ancestor) => ancestor.type === 'list',
			).length

			// Initialize the data object if it doesn't exist
			node.data = node.data || {}
			node.data.hProperties =
				(node.data.hProperties as Record<string, any>) || {}

			// Inject data-depth attribute for rehype/react-markdown to consume
			node.data.hProperties['data-depth'] = depth
		})
	}
}
