import { ReactNode } from 'react'

import { Blockquote } from '../elements/Blockquote'
import { H1, H2, H3 } from '../elements/Heading'
import { Li, Ol, Ul } from '../elements/list'
import { Img } from '../images/Img'
import { A } from './A'
import { createMD } from './createMD'
import { P } from './P'
import { Small, Sub, Sup } from './Small'

const elems = {
	a: A,
	blockquote: Blockquote,
	h1: H1,
	h2: H2,
	h3: H3,
	li: Li,
	ol: Ol,
	p: P,
	small: Small,
	sub: Sub,
	sup: Sup,
	ul: Ul,
	img: Img,
}

export const MD = createMD(elems)

function Frag({ children }: { children?: ReactNode }) {
	return <>{children}</>
}

export const MDFrag = createMD({ ...elems, frag: Frag })
