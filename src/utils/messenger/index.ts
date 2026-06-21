type Opts<Lang extends string, Ctx> = {
	test?: boolean
	dump?: (...args: unknown[]) => string
	lang?: Lang
	createCtx?: (lang: string) => Ctx
}

function dump0(...args: unknown[]) {
	return JSON.stringify(args)
}

function id<T>(t: T) {
	return t
}

type AnyFunction = (...args: any[]) => any

// TODO: proxy or function?, super, multi
export function configMessages<
	Lang extends string = 'en',
	Ctx = string,
	Result extends string = string,
>({
	test = false,
	lang = 'en' as never,
	createCtx = id as never,
	dump = dump0,
}: Opts<Lang, Ctx>) {
	return function <
		M extends Record<string, Result | ((ctx: Ctx, ...args: any[]) => Result)>,
	>(
		m: M,
	): {
		[K in keyof M as K extends string ? K : never]: M[K] extends AnyFunction
			? M[K] extends (ctx: Ctx, ...args: infer Args) => infer R
				? (...args: Args) => R | string
				: never
			: M[K] | string
	} {
		const ctx = createCtx(lang)
		function prop<Args extends any[]>(key: keyof M) {
			const fn = m[key]
			if (test) {
				if (typeof fn === 'function') {
					return (...args: Args) => dump(key, ...args)
				}
				return dump(key) as never
			}
			if (typeof fn === 'function') {
				return (...args: Args) => {
					return fn(ctx, ...args)
				}
			}
			return fn
		}
		return new Proxy({} as never, {
			get(_, key: string) {
				const p = prop(key.slice(key.length))
				if (p == undefined)
					throw new Error(`Missing message for key: ${String(key)}`)
				return prop(key)
			},
		})
	}
}

export function createMessages<
	Lang extends string = 'en',
	Ctx = string,
	Result extends string = string,
>({
	test = false,
	lang = 'en' as never,
	createCtx = id as never,
	dump = dump0,
}: Opts<Lang, Ctx>) {
	return function <
		M extends Record<string, Result | ((ctx: Ctx, ...args: any[]) => Result)>,
	>(
		m: M,
	): {
		[K in keyof M as K extends string ? K : never]: M[K] extends AnyFunction
			? M[K] extends (ctx: Ctx, ...args: infer Args) => infer R
				? (...args: Args) => R | string
				: never
			: M[K] | string
	} {
		const ctx = createCtx(lang)
		function prop<Args extends any[]>(key: keyof M) {
			const fn = m[key]
			if (test) {
				if (typeof fn === 'function') {
					return (...args: Args) => dump(key, ...args)
				}
				return dump(key) as never
			}
			if (typeof fn === 'function') {
				return (...args: Args) => {
					return fn(ctx, ...args)
				}
			}
			return fn
		}
		return new Proxy({} as never, {
			get(_, key: string) {
				const p = prop(key.slice(key.length))
				if (p == undefined)
					throw new Error(`Missing message for key: ${String(key)}`)
				return prop(key)
			},
		})
	}
}
