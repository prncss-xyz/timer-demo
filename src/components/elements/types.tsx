import { StyleXStyles } from '@stylexjs/stylex'
import { ComponentProps } from 'react'

export type ElemProps<
	T extends
		| keyof React.JSX.IntrinsicElements
		| React.JSXElementConstructor<any>,
> = Omit<ComponentProps<T>, 'style'> & {
	style?: StyleXStyles
}
