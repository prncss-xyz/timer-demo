import * as stylex from '@stylexjs/stylex'
import { allPosts } from 'content-collections'

import { MD } from '@/layouts/MD'
import { spaces } from '@/layouts/tokens.stylex'

const styles = stylex.create({
	container: {
		marginTop: spaces[6],
	},
})

export default async function PostPage({ slug }: { slug: string }) {
	const post = allPosts.find((p) => p._meta.path === slug)

	if (!post) {
		return (
			<div>
				<h1>Post not found</h1>
			</div>
		)
	}

	return (
		<div>
			<title>{post.title}</title>
			<div sx={styles.container}>
				<MD>{post.content}</MD>
			</div>
		</div>
	)
}

export const getConfig = async () => {
	return {
		render: 'static',
		staticPaths: allPosts.map((post) => post._meta.path),
	} as const
}
