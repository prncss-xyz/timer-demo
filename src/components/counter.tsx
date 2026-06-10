'use client'

import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'

const styles = stylex.create({
	button: {
		backgroundColor: '#000',
		borderRadius: '1px',
		borderStyle: 'none',
		color: '#fff',
		cursor: 'pointer',
		fontSize: '0.875rem',
		lineHeight: '1.25rem',
		paddingBottom: '0.125rem',
		paddingLeft: '0.5rem',
		paddingRight: '0.5rem',
		paddingTop: '0.125rem',
	},
	section: {
		borderColor: '#60a5fa',
		borderRadius: '2px',
		borderStyle: 'dashed',
		borderWidth: '1px',
		marginLeft: '-1rem',
		marginRight: '-1rem',
		marginTop: '1rem',
		padding: '1rem',
	},
})

export const Counter = () => {
	const [count, setCount] = useState(0)

	const handleIncrement = () => setCount((c) => c + 1)

	return (
		<section {...stylex.props(styles.section)}>
			<div>Count: {count}</div>
			<button onClick={handleIncrement} {...stylex.props(styles.button)}>
				Increment
			</button>
		</section>
	)
}
