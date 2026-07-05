import { allBlogs } from 'content-collections'
import { Link } from 'waku'

const page = getPage('blog')

import { PageMeta } from '@/components/PageMeta'
import { Col } from '@/layouts/Box'
import { H2 } from '@/layouts/elements/Heading'
import { MD } from '@/layouts/MD'
import { globalMessages } from '@/messages'
import { getPage } from '@/utils/getPage'

// Sort posts by date from latest to oldest
const sortedBlogs = allBlogs
	.filter(({ draft }) => import.meta.env.DEV || !draft)
	.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export default async function PostsIndex() {
	return (
		<div>
			<PageMeta {...page} />
			<MD>{page.content}</MD>
			<Col as='ul' gap={6}>
				{sortedBlogs.length
					? sortedBlogs.map((post) => (
							<li>
								<Link to={`/blog/${post._meta.path}`}>
									<Col key={post.slug}>
										<H2 textAlign='left'>{post.title}</H2>
										<div>{post.date}</div>
									</Col>
								</Link>
							</li>
						))
					: globalMessages.comingSoon}
			</Col>
		</div>
	)
}

export async function getConfig() {
	return {
		render: 'static',
	} as const
}
