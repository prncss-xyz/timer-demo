import * as stylex from '@stylexjs/stylex'

import { ElemProps } from './types'

export function Small({
	style,
	...rest
}: Omit<ElemProps<'small'>, 'style'> & { style?: stylex.StyleXStyles }) {
	return <small {...rest} {...stylex.props(style)} />
}

export function Sup({
	style,
	...rest
}: Omit<ElemProps<'sup'>, 'style'> & { style?: stylex.StyleXStyles }) {
	return <sup {...rest} {...stylex.props(style)} />
}

export function Sub({
	style,
	...rest
}: Omit<ElemProps<'sub'>, 'style'> & { style?: stylex.StyleXStyles }) {
	return <sub {...rest} {...stylex.props(style)} />
}
