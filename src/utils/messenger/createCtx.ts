type I = typeof Intl
type O<P extends keyof I> = I[P] extends new (a: any, O: infer R) => any
	? R
	: never
type Arg1<P extends keyof I, Q extends string> = I[P] extends new (
	...args: any
) => Record<Q, (args: infer R, ...rest: any[]) => any>
	? R
	: never
type Arg2<P extends keyof I, Q extends string> = I[P] extends new (
	...args: any
) => Record<Q, (a: any, args: infer R, ...rest: any[]) => any>
	? R
	: never
type Res<P extends keyof I, Q extends string> = I[P] extends new (
	...args: any
) => Record<Q, (...args: any) => infer R>
	? R
	: never

export function createCtx(lang: string) {
	function shim1<P extends keyof I, Q extends string>(
		p: P,
		q: Q,
	): (arg: Arg1<P, Q>, opts?: O<P>) => Res<P, Q>
	function shim1<P extends keyof I, Q extends string>(
		p: P,
		q: Q,
	): (arg: Arg1<P, Q>, opts?: O<P>) => Res<P, Q>
	function shim1(p: any, q: any) {
		return (a: any, opts: any) => {
			const o = new (Intl as any)[p](lang, opts)
			return o[q](a)
		}
	}
	function shim2<P extends keyof I, Q extends string>(
		p: P,
		q: Q,
	): (arg1: Arg1<P, Q>, arg2: Arg2<P, Q>, opts?: O<P>) => Res<P, Q>
	function shim2(p: any, q: any) {
		return (a: any, b: any, opts: any) => {
			const o = new (Intl as any)[p](lang, opts)
			return o[q](a, b)
		}
	}
	function plural<T>(
		n: number,
		choices: Partial<Record<Intl.LDMLPluralRule, T>> & { other: unknown },
		opts?: Intl.PluralRulesOptions,
	): T {
		const rules = new Intl.PluralRules(lang, opts)
		return choices[rules.select(n)] ?? choices.other!
	}
	return {
		lang,
		list: shim1('ListFormat', 'format'),
		number: shim1('NumberFormat', 'format'),
		numberRange: shim2('NumberFormat', 'formatRange'),
		displayNames: shim1('DisplayNames', 'of'),
		dateTime: shim1('DateTimeFormat', 'format'),
		dateTimeRange: shim2('DateTimeFormat', 'formatRange'),
		duration: shim1('DurationFormat', 'format'),
		relativeTime: shim1('RelativeTimeFormat', 'format'),
		plural,
	}
}
