import * as stylex from '@stylexjs/stylex'
import { allPosts } from 'content-collections'
import { Link } from 'waku'

import { Ul } from '@/layouts/elements/list'
import { spaces } from '@/layouts/tokens/spaces.stylex'

const styles = stylex.create({
	item: {
		marginBottom: spaces[5],
	},
	title: {
		margin: spaces.none,
		textDecoration: 'underline',
	},
})

export default async function PostsIndex() {
	// Sort posts by date from latest to oldest
	const sortedPosts = [...allPosts].sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime()
	})

	return (
		<div>
			<title>All Posts</title>
			<h1>Posts</h1>
			<Ul>
				{sortedPosts.map((post) => (
					<li key={post._meta.path} {...stylex.props([styles.item])}>
						<Link to={`/posts/${post._meta.path}`}>
							<h2 {...stylex.props([styles.title])}>{post.title}</h2>
						</Link>
						<div>{post.date}</div>
					</li>
				))}
			</Ul>
		</div>
	)
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
