import { allPosts } from 'content-collections'
import { Link } from 'waku'

import { Col } from '@/layouts/Box'
import { H1, H2 } from '@/layouts/elements/Heading'

export default async function PostsIndex() {
	// Sort posts by date from latest to oldest
	const sortedPosts = [...allPosts].sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime()
	})

	return (
		<div>
			<title>All Posts</title>
			<H1 pb={7}>Posts</H1>
			<Col as='ul' gap={6}>
				{sortedPosts.map((post) => (
					<Link to={`/posts/${post._meta.path}`}>
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
