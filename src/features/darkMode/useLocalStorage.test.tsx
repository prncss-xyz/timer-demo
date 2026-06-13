import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import { useLocalStorage } from './useLocalStorage'

function TestComponent({
	storageKey,
	parse,
	serialize,
	onValueChange,
}: {
	storageKey: string
	parse: (val: string | null) => string
	serialize?: (val: string) => string
	onValueChange?: (
		val: string,
		setVal: (v: string | ((p: string) => string)) => void,
	) => void
}) {
	const [value, setValue] = useLocalStorage(storageKey, parse, serialize)
	onValueChange?.(value, setValue)
	return <div id='value-container'>{value}</div>
}

describe('useLocalStorage', () => {
	let container: HTMLDivElement

	beforeEach(() => {
		container = document.createElement('div')
		document.body.appendChild(container)
		localStorage.clear()
	})

	afterEach(() => {
		document.body.removeChild(container)
	})

	it('should read initial value from localStorage if present', async () => {
		localStorage.setItem('test-key', 'stored-value')
		const root = createRoot(container)

		await act(async () => {
			root.render(
				<TestComponent storageKey='test-key' parse={(v) => v ?? 'default'} />,
			)
		})

		expect(container.textContent).toBe('stored-value')
	})

	it('should return parsed default value if key is not present', async () => {
		const root = createRoot(container)

		await act(async () => {
			root.render(
				<TestComponent storageKey='test-key' parse={(v) => v ?? 'default'} />,
			)
		})

		expect(container.textContent).toBe('default')
	})

	it('should update value and localStorage when setValue is called', async () => {
		let setValFn: ((v: string | ((p: string) => string)) => void) | undefined
		const root = createRoot(container)

		await act(async () => {
			root.render(
				<TestComponent
					storageKey='test-key'
					parse={(v) => v ?? 'default'}
					onValueChange={(_, setVal) => {
						setValFn = setVal
					}}
				/>,
			)
		})

		expect(container.textContent).toBe('default')

		await act(async () => {
			setValFn?.('new-value')
		})

		expect(localStorage.getItem('test-key')).toBe('new-value')
		expect(container.textContent).toBe('new-value')
	})
})
