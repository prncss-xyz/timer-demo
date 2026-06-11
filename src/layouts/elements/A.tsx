import { create, props } from '@stylexjs/stylex'
import { Link } from 'waku'

import { fontSizes } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = create({
	base: {
		fontSize: fontSizes[2],
		fontWeight: 'bold',
	},
})

type BoxProps = ElemProps<'a'>

export function A({ children, href, style, ...rest }: BoxProps) {
	if (href && (href.startsWith('/') || href.startsWith('.')))
		return (
			<Link
				children={children}
				to={href as any}
				{...rest}
				{...props(styles.base, style)}
			/>
		)
	return (
		<a
			children={children}
			href={href}
			target='_blank'
			{...rest}
			{...props(styles.base, style)}
		/>
	)
}
