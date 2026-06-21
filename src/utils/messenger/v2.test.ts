import { describe, expect, expectTypeOf, test } from 'vite-plus/test'

import { configMulti, configSingle } from './v2'

const genCtx = (lang: string) => ({ lang })

describe('single', () => {
	test('description', () => {
		const createMessages = configSingle('en', false)
		const globalMessages = createMessages(genCtx('en'), {
			hi: 'Hi!',
			greetings: (ctx, name: string) => `Hello ${name} in ${ctx.lang}!`,
		})
		expect(globalMessages.hi).toBe('Hi!')
		expect(globalMessages.greetings('John')).toBe('Hello John in en!')
		expectTypeOf<typeof globalMessages>().toEqualTypeOf<{
			hi: string
			greetings: (name: string) => string
			lang: string
		}>()

		const localMessages = createMessages(globalMessages, {
			toto: 'Toto!',
		})
		expect(localMessages.hi).toBe('Hi!')
		expect(localMessages.greetings('John')).toBe('Hello John in en!')
		expect(localMessages.toto).toBe('Toto!')
		expectTypeOf<typeof localMessages>().toEqualTypeOf<{
			hi: string
			greetings: (name: string) => string
			toto: string
			lang: string
		}>()
	})
	test('description', () => {
		const createMessages = configSingle('en', true)
		const globalMessages = createMessages(genCtx('en'), {
			hi: 'Hi!',
			greetings: (ctx, name: string) => `Hello ${name} in ${ctx.lang}!`,
		})
		expect(globalMessages.hi).toBe('["en","hi"]')
		expect(globalMessages.greetings('John')).toBe('["en","greetings","John"]')
		expectTypeOf<typeof globalMessages>().toEqualTypeOf<{
			hi: string
			greetings: (name: string) => string
			lang: string
		}>()
	})
})

describe('multi', () => {
	test('description', () => {
		const createMessages = configMulti(['en', 'fr'], false)
		const globalMessages = createMessages(genCtx, {
			en: {
				hi: 'Hi!',
				greetings: (ctx, name: string) => `Hello ${name} in ${ctx.lang}!`,
			},
			fr: {
				hi: 'Allô!',
				greetings: (ctx, name: string) => `Bonjour ${name} en ${ctx.lang}!`,
			},
		})
		expect(globalMessages('en').hi).toBe('Hi!')
		expect(globalMessages('fr').hi).toBe('Allô!')
	})
})
