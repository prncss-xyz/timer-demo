import { defineCollection, defineConfig } from '@content-collections/core'
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
	transform: (doc) => ({
		...doc,
		slug: doc._meta.path,
	}),
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

export default defineConfig({
	content: [blog, pages],
})
