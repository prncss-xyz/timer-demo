import { allBlogs } from 'content-collections'
import { Link } from 'waku'

import { Col } from '@/layouts/Box'
import { H1, H2 } from '@/layouts/elements/Heading'
import { globalMessages } from '@/messages'

// Sort posts by date from latest to oldest
const sortedBlogs = allBlogs.toSorted((a, b) => {
	return new Date(b.date).getTime() - new Date(a.date).getTime()
})

export default async function PostsIndex() {
	return (
		<div>
			<title>{globalMessages.blog}</title>
			<H1 pb={7}>{globalMessages.blog}</H1>
			<Col as='ul' gap={6}>
				{sortedBlogs.map((post) => (
					<Link to={`/blog/${post._meta.path}`}>
						<Col key={post._meta.path} as='li'>
							<H2 textAlign='left'>{post.title}</H2>
							<div>{post.date}</div>
						</Col>
					</Link>
				))}
			</Col>
		</div>
	)
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
