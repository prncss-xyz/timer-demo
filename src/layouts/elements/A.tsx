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

type BoxProps = Omit<ElemProps<'a'>, 'style'> & { style?: stylex.StyleXStyles }

export function A({ children, href, style, ...rest }: BoxProps) {
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
