import { allBlogs } from 'content-collections'

import { H1 } from '@/layouts/elements/Heading'
import { MD } from '@/layouts/MD'
import { globalMessages } from '@/messages'

export default async function BlogPage({ slug }: { slug: string }) {
	const blog = allBlogs.find((p) => p._meta.path === slug)

	if (!blog) {
		return (
			<div>
				<h1>{globalMessages.blogNotFound}</h1>
			</div>
		)
	}

	return (
		<>
			<title>{blog.title}</title>
			<H1>{blog.title}</H1>
			<MD>{blog.content}</MD>
		</>
	)
}

export const getConfig = async () => {
	return {
		render: 'static',
		staticPaths: allBlogs.map((blog) => blog._meta.path),
	} as const
}
