import 'react'

declare module 'react' {
	interface HTMLAttributes<T> {
		sx?:
			| import('@stylexjs/stylex').StyleXStyles
			| import('@stylexjs/stylex').StyleXStyles[]
	}
	interface SVGAttributes<T> {
		sx?:
			| import('@stylexjs/stylex').StyleXStyles
			| import('@stylexjs/stylex').StyleXStyles[]
	}
}
