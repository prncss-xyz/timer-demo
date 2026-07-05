import { allBlogs } from 'content-collections'

import { PageMeta } from '@/components/PageMeta'
import { Box } from '@/layouts/Box'
import { MD } from '@/layouts/MD'
import { getOne } from '@/utils/getOne'

export default async function BlogPage({ slug }: { slug: string }) {
	const blog = getOne(allBlogs, (blog) => blog.slug === slug)
	return (
		<>
			<PageMeta {...blog} />
			<Box bg='translucent'>
				<MD>{blog.content}</MD>
			</Box>
		</>
	)
}

export async function getConfig() {
	return {
		render: 'static',
		staticPaths: allBlogs.map((blog) => blog._meta.path),
	} as const
}
