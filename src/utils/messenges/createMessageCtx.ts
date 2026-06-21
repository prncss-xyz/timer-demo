type I = typeof Intl
type O<N extends keyof I> = I[N] extends new (a: any, o: infer R) => any
	? R
	: never
type Res<N extends keyof I> = I[N] extends new (a: any, o: any) => infer R
	? R
	: never
type Method<N extends keyof I> = keyof Res<N>
type Cb<N extends keyof I, M extends PropertyKey> =
	Res<N> extends Record<M, infer R> ? R : never

export function intl<N extends keyof I, M extends Method<N>>(
	name: N,
	opts: O<N>,
	method: M,
) {
	return function (locale: string): Cb<N, M> {
		const o = new (Intl as any)[name](locale, opts)
		return o[method].bind(o)
	}
}

export function plural(opts?: Intl.PluralRulesOptions) {
	return function (lang: string) {
		return function <T>(
			n: number,
			choices: Partial<Record<Intl.LDMLPluralRule, T>> & { other: unknown },
		): T {
			const rules = new Intl.PluralRules(lang, opts)
			return choices[rules.select(n)] ?? choices.other!
		}
	}
}

type GenCtx<Ctx extends object> = { [K in keyof Ctx]: (lang: string) => Ctx[K] }

export function createMessageCtx<Ctx extends object>(genCtx: GenCtx<Ctx>) {
	return function (lang: string): Ctx {
		const res: any = {}
		for (const [k, v] of Object.entries<any>(genCtx)) res[k] = v(lang)
		return res
	}
}
