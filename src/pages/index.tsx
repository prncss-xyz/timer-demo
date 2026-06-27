import { Col } from '@/layouts/Box'
import { Blockquote } from '@/layouts/elements/Blockquote'
import { Li, Ol, Ul } from '@/layouts/elements/list'
import { MD } from '@/layouts/MD'
import { createMessages, globalMessages } from '@/messages'

const messages = createMessages(globalMessages, {
	Main: () => (
		<MD>{`
## Dark Mode Demo

A gorgeous web application showcasing a persisted three-state dark mode
toggle (Light, Dark, and System theme synchronization) built using StyleX and Waku.

- 3-State Persistence (Light / Dark / System)
- Zero Flash of Unthemed Content (FOUC)
- System theme auto-update listeners
- Premium responsive interface using StyleX

`}</MD>
	),
})

export default async function HomePage() {
	return (
		<Col gap={6} w='readable'>
			<messages.Main />
			<Ul>
				<Li>1</Li>
				<Li>2</Li>
				<Ul>
					<Li>1</Li>
					<Li>2</Li>
					<Ul>
						<Li>1</Li>
						<Li>2</Li>
					</Ul>
				</Ul>
			</Ul>
			<Ol>
				<Li>1</Li>
				<Li>2</Li>
				<Ol>
					<Li>1</Li>
					<Li>2</Li>
					<Ol>
						<Li>1</Li>
						<Li>2</Li>
					</Ol>
				</Ol>
			</Ol>
			<Blockquote>quote</Blockquote>
		</Col>
	)
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
