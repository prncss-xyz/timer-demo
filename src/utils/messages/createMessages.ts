import { AnyFunction, cached, fromInit, id, Init, Prettify } from './utils'

export function configSingle<Locale extends string>(
	locale: Locale,
	dumper?: Dumper | false,
) {
	const d = dumper ? dumper(locale) : id
	return <Ctx extends object, O extends AnyMessages<Ctx>>(
		ctx: Init<Ctx, [Locale]>,
		conf: O,
	) => d(coreLocale(fromInit(ctx, locale), conf))
}

type AnyMessages<Ctx> = Record<
	PropertyKey,
	string | ((ctx: Ctx, ...args: never[]) => unknown)
>

export function configMulti<Locale extends string>(
	_locales: Locale[],
	dumper?: Dumper | false,
) {
	return <Ctx extends object, K extends string, O extends AnyMessages<Ctx>>(
		genCtx: (locale: Locale) => Ctx,
		conf: Record<Locale, O & Record<K, unknown>>,
	) =>
		cached((locale: Locale) => {
			const d = dumper ? dumper(locale) : id
			return d(coreLocale(genCtx(locale), conf[locale]))
		})
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

function dump0(...args: unknown[]) {
	return JSON.stringify(args)
}

type Dumper = (locale: string) => <O>(conf: O) => O

export function dumper(dump: (...args: unknown[]) => string = dump0) {
	return function (locale: string) {
		return function <O>(conf: O): O {
			return new Proxy({} as any, {
				get(_, k: string) {
					const m = (conf as any)[k]
					if (typeof m === 'function')
						return (...args: any[]) => dump(locale, k, ...args)
					return dump(locale, k)
				},
			})
		}
	}
}
