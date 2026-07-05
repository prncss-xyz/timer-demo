import {
	defineCollection,
	defineConfig,
	defineSingleton,
} from '@content-collections/core'
import { z } from 'zod'

const blog = defineCollection({
	directory: 'content/blog',
	include: '*.md',
	name: 'blog',
	schema: z.object({
		date: z.string(),
		draft: z.boolean().default(false),
		title: z.string(),
		content: z.string(),
		description: z.string().optional(),
	}),
	transform: (doc, { skip }) => {
		if (doc.draft) {
			return skip('draft post')
		}
		return {
			...doc,
			slug: doc._meta.path,
		}
	},
})

const pages = defineCollection({
	directory: 'content/pages',
	include: '*.md',
	name: 'pages',
	schema: z.object({
		title: z.string(),
		content: z.string(),
		description: z.string().optional(),
	}),
	transform: (doc) => ({
		...doc,
		slug: doc._meta.path,
	}),
})

const settings = defineSingleton({
	name: 'settings',
	filePath: 'content/settings.yaml',
	typeName: 'Settings',
	parser: 'yaml',
	schema: z.object({
		title: z.string(),
		description: z.string(),
	}),
})

export default defineConfig({
	content: [blog, pages, settings],
})
