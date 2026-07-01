import * as stylex from '@stylexjs/stylex'

import { ReElemProps } from './types'

export function Small({ style, ...rest }: ReElemProps<'small'>) {
	return <small {...rest} {...stylex.props(style)} />
}

export function Sup({ style, ...rest }: ReElemProps<'sup'>) {
	return <sup {...rest} {...stylex.props(style)} />
}

export function Sub({ style, ...rest }: ReElemProps<'sub'>) {
	return <sub {...rest} {...stylex.props(style)} />
}
