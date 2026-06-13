import * as stylex from '@stylexjs/stylex'
import { Link } from 'waku'

import { fontSizes, fontWeights } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = stylex.create({
	base: {
		fontSize: fontSizes[2],
		fontWeight: fontWeights.bold,
	},
})

type BoxProps = ElemProps<'a'>

export function A({ children, href, sx, ...rest }: BoxProps) {
	if (href && (href.startsWith('/') || href.startsWith('.')))
		return (
			<Link
				children={children}
				to={href as any}
				{...rest}
				{...stylex.props(styles.base, sx)}
			/>
		)
	return (
		<a
			children={children}
			href={href}
			target='_blank'
			{...rest}
			{...stylex.props(styles.base, sx)}
		/>
	)
}
