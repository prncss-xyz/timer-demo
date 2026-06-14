import { useLocalStorage } from './useLocalStorage'

export function TestComponent({ storageKey }: { storageKey: string }) {
	const parse = (v: string | null) => v ?? 'default'
	const serialize = (v: string) => v

	const [value, setValue] = useLocalStorage(storageKey, parse, serialize)

	return (
		<div>
			<div id='value-container'>{value}</div>
			<button id='update-btn' onClick={() => setValue('new-value')}>
				Update
			</button>
		</div>
	)
}
