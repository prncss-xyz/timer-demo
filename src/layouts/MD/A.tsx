import * as stylex from '@stylexjs/stylex'
import { Link } from 'waku'

import { fontSizes } from '../tokens/fontSizes.stylex'
import { fontWeights } from '../tokens/fontWeights.stylex'
import { type ReElemProps } from './types'

const styles = stylex.create({
	base: {
		fontSize: fontSizes[2],
		fontWeight: fontWeights.bold,
	},
})

export function A({ children, href, style, ...rest }: ReElemProps<'a'>) {
	if (href && (href.startsWith('/') || href.startsWith('.')))
		return (
			<Link
				children={children}
				to={href as any}
				{...rest}
				{...stylex.props([styles.base, style])}
			/>
		)
	return (
		<a
			children={children}
			href={href}
			target='_blank'
			{...rest}
			{...stylex.props([styles.base, style])}
		/>
	)
}
