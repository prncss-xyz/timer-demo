import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'

import { colors } from '@/layouts/tokens/colors.stylex'

import './reset.css'
import './fonts.css'
import './syntax-highlighting.css'

type RootElementProps = { children: ReactNode }

const styles = stylex.create({
	root: {
		backgroundColor: colors.background,
		color: colors.text,
	},
})

export default async function RootElement({ children }: RootElementProps) {
	return (
		<html lang='en' {...stylex.props(styles.root)}>
			<body>{children}</body>
		</html>
	)
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
