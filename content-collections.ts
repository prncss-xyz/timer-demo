import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const posts = defineCollection({
	directory: 'src/posts',
	include: '**/*.md',
	name: 'posts',
	schema: z.object({
		date: z.string(),
		title: z.string(),
		content: z.string(),
	}),
})

export default defineConfig({
	content: [posts],
})
