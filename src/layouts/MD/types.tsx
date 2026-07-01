import * as stylex from '@stylexjs/stylex'
import { ComponentProps } from 'react'

export type ElemProps<
	T extends
		| keyof React.JSX.IntrinsicElements
		| React.JSXElementConstructor<any>,
> = ComponentProps<T>

export type ReElemProps<
	T extends
		| keyof React.JSX.IntrinsicElements
		| React.JSXElementConstructor<any>,
> = Omit<ElemProps<T>, 'style' | 'classname'> & {
	style?: stylex.StyleXStyles
}
