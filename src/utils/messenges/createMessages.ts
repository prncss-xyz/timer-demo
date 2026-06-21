import { AnyFunction, fromInit, Init, Prettify } from './utils'

// TODO: multiLang enforce same types
// TODO: MDX
// TODO: inject dumper
// TODO: extend method

export function configSingle<Locale extends string>(
	locale: Locale,
	test: boolean,
	dump: (...args: unknown[]) => string = dump0,
) {
	const core = test ? createDump(locale, dump) : coreLocale
	return <Ctx extends object, O extends AnyMessages<Ctx>>(
		ctx: Init<Ctx, [Locale]>,
		conf: O,
	) => core(fromInit(ctx, locale), conf)
}

type AnyMessages<Ctx> = Record<
	PropertyKey,
	string | ((ctx: Ctx, ...args: never[]) => unknown)
>

export function configMulti<Locale extends string>(
	_locales: Locale[],
	test: boolean,
	dump: (...args: unknown[]) => string = dump0,
) {
	return <Ctx extends object, O extends AnyMessages<Ctx>>(
		genCtx: (locale: Locale) => Ctx,
		conf: Record<Locale, O>,
	) =>
		cached((locale: Locale) => {
			const core = test ? createDump(locale, dump) : coreLocale
			return core(genCtx(locale), conf[locale])
		})
}

function dump0(...args: unknown[]) {
	return JSON.stringify(args)
}

function coreLocale<Ctx extends object, O extends AnyMessages<Ctx>>(
	ctx: Ctx,
	conf: O,
): Prettify<
	{
		[K in keyof O]: O[K] extends AnyFunction
			? O[K] extends (ctx: Ctx, ...args: infer Args) => infer R
				? (...args: Args) => R
				: never
			: O[K]
	} & Ctx
> {
	return new Proxy({} as any, {
		get(_, k: string) {
			if (k in conf) {
				const m = (conf as any)[k]
				if (typeof m === 'function') return (...args: any[]) => m(ctx, ...args)
				return m
			}
			return (ctx as any)[k]
		},
	})
}

function createDump(locale: string, dump: (...args: unknown[]) => string) {
	return function <Ctx extends object, O extends AnyMessages<Ctx>>(
		ctx: Ctx,
		conf: O,
	): Prettify<
		{
			[K in keyof O]: O[K] extends AnyFunction
				? O[K] extends (ctx: Ctx, ...args: infer Args) => infer R
					? (...args: Args) => R
					: never
				: O[K]
		} & Ctx
	> {
		return new Proxy({} as any, {
			get(_, k: string) {
				if (k in conf || k in ctx) {
					const m = (conf as any)[k]
					if (typeof m === 'function')
						return (...args: any[]) => dump(locale, k, ...args)
					return dump(locale, k)
				}
				throw new Error(`unexpected key ${k}`)
			},
		})
	}
}

function cached<K, V>(cb: (k: K) => V) {
	const cache = new Map<K, V>()
	return (k: K) => {
		if (cache.has(k)) return cache.get(k) as V
		const res = cb(k)
		cache.set(k, res)
		return res
	}
}
