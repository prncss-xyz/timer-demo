import { ComponentProps } from 'react'

export type ElemProps<
	T extends
		| keyof React.JSX.IntrinsicElements
		| React.JSXElementConstructor<any>,
> = ComponentProps<T>
