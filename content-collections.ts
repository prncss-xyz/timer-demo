import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const blog = defineCollection({
	directory: 'blog',
	include: '**/*.md',
	name: 'blog',
	schema: z.object({
		date: z.string(),
		title: z.string(),
		content: z.string(),
	}),
})

export default defineConfig({
	content: [blog],
})
