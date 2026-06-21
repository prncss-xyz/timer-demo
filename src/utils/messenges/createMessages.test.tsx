import { describe, expect, expectTypeOf, test } from 'vite-plus/test'

import { intl, createMessageCtx, plural } from './createMessageCtx'
import { configMulti, configSingle, dumper } from './createMessages'

function render(x: string) {
	return <div>{x}</div>
}

const getCtx = createMessageCtx({
	plural: plural(),
	number: intl('NumberFormat', {}, 'format'),
})

describe('single', () => {
	test('actual', () => {
		const createMessages = configSingle('en')
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
	})
	test('testing', () => {
		const createMessages = configSingle('en', dumper())
		const globalMessages = createMessages(getCtx, {
			hi: 'Hi!',
			carots: ({ plural, number }, num: number) =>
				`${number(num)} ${plural(num, { one: 'carot', other: 'carots' })}`,
		})
		expect(globalMessages.hi).toBe('["en","hi"]')
		expectTypeOf(globalMessages).toMatchObjectType<{
			hi: string
			carots: (n: number) => string
		}>()

		const localMessages = createMessages(globalMessages, {
			toto: 'Toto!',
		})
		expect(localMessages.hi).toBe('["en","hi"]')
		expect(localMessages.toto).toBe('["en","toto"]')
	})
})

describe('multi', () => {
	test('actual', () => {
		const createMessages = configMulti(['en', 'fr'])
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
	})
	test('testing', () => {
		const createMessages = configMulti(['en', 'fr'], dumper())
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
		expect(globalMessages('en').hi).toBe('["en","hi"]')
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
		expect(localMessages('en').hi).toBe('["en","hi"]')
	})
})
