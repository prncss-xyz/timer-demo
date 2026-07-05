import { allBlogs, settings } from 'content-collections'
import { Feed } from 'feed'

import { mdToHtml, mdToText } from '@/layouts/MD/createMD'
import { basePath, baseUrl } from '@/meta'

const { title, description } = settings

export async function GET() {
	const feed = new Feed({
		title,
		description,
		id: baseUrl,
		link: `${baseUrl}${basePath}`,
		language: 'en',
		copyright: `All rights reserved ${new Date().getFullYear()}`,
		updated: new Date(),
		author: {
			name: title,
		},
	})

	const sortedBlogs = allBlogs.toSorted(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	)

	for (const post of sortedBlogs) {
		const url = `${baseUrl}${basePath}blog/${post._meta.path}`
		const [content, description] = await Promise.all([
			mdToHtml(post.content),
			mdToText(post.content),
		])
		feed.addItem({
			title: post.title,
			id: url,
			link: url,
			date: new Date(post.date),
			description,
			content,
		})
	}

	return new Response(feed.rss2(), {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
		},
	})
}

export async function getConfig() {
	return {
		render: 'static',
	} as const
}
