import { describe, expect, expectTypeOf, test } from 'vite-plus/test'

import { intl, createMessageCtx, plural } from './createMessageCtx'
import { configMulti, configSingle } from './createMessages'

function render(x: string) {
	return <div>{x}</div>
}

const getCtx = createMessageCtx({
	plural: plural(),
	number: intl('NumberFormat', {}, 'format'),
})

describe('single', () => {
	test('description', () => {
		const createMessages = configSingle('en', false)
		const globalMessages = createMessages(getCtx, {
			hi: 'Hi!',
			carots: ({ plural, number }, num: number) =>
				`${number(num)} ${plural(num, { one: 'carot', other: 'carots' })}`,
		})
		expect(globalMessages.hi).toBe('Hi!')
		expectTypeOf(globalMessages).toMatchObjectType<{
			hi: string
			carots: (n: number) => string
		}>()

		const localMessages = createMessages(globalMessages, {
			toto: 'Toto!',
		})
		expect(localMessages.hi).toBe('Hi!')
		expect(localMessages.toto).toBe('Toto!')
		expectTypeOf(localMessages).toMatchObjectType<{
			hi: string
			carots: (n: number) => string
			toto: string
		}>()
		expect(globalMessages.hi).toBe('["en","hi"]')
	})
})

describe('multi', () => {
	test('description', () => {
		const createMessages = configMulti(['en', 'fr'], false)
		const globalMessages = createMessages(getCtx, {
			en: {
				hi: 'Hi!',
				div: () => render('toto'),
			},
			fr: {
				hi: 'Allô!',
				div: () => render('toto'),
			},
		})
		expect(globalMessages('en').hi).toBe('Hi!')
		expect(globalMessages('fr').hi).toBe('Allô!')
		const localMessages = createMessages(globalMessages, {
			en: {
				bye: 'Bye!',
			},
			fr: {
				bye: 'Adieux mon amour!',
			},
		})
		expectTypeOf(localMessages('en')).toMatchObjectType<{
			hi: string
			bye: string
			div: () => React.JSX.Element
		}>()
		expect(globalMessages('en').hi).toBe('["en","hi"]')
	})
})
