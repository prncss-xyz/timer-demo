import { describe, expect, it } from 'vitest'

import { configMessages } from '.'
import { createCtx } from './createCtx'

function create(test: boolean) {
	const createMessages = configMessages({
		prefix: 'p_',
		createCtx,
		test,
	})

	return createMessages({
		greeting: (_, name: string) => `Hello, ${name}!`,
		carots: ({ number, plural }, carots: number) =>
			`You have ${number(carots)} ${plural(carots, { one: 'carot', other: 'carots' })}`,
		range: ({ numberRange }, p: number, q: number) => numberRange(p, q),
		fun: ({ number }, pc: number) => `${number(pc, { style: 'percent' })} fun!`,
		oxford: ({ list }, members: string[]) =>
			`${list(members, { style: 'long' })}`,
		bye: 'Goodbye!',
	})
}

describe('non-test mode', () => {
	const msg = create(false)
	it('should format string', () => {
		expect(msg.p_bye).toBe('Goodbye!')
	})
	it('should format function', () => {
		expect(msg.p_greeting('World')).toBe('Hello, World!')
	})
	it('should format singular', () => {
		expect(msg.p_carots(1)).toBe('You have 1 carot')
	})
	it('should format plurals', () => {
		expect(msg.p_carots(5000)).toBe('You have 5,000 carots')
	})
	it('should format number with options', () => {
		expect(msg.p_fun(1)).toBe('100% fun!')
	})
	it('should format rage', () => {
		expect(msg.p_range(1, 2)).toBe('1–2')
	})
	it('should format list with option', () => {
		expect(msg.p_oxford(['a', 'b', 'c'])).toBe('a, b, and c')
	})
})

describe('test mode', () => {
	const msg = create(true)
	it('should pass key', () => {
		expect(msg.p_bye).toBe('["bye"]')
	})
	it('should pass key and data', () => {
		expect(msg.p_carots(5000)).toBe('["carots",5000]')
	})
})
