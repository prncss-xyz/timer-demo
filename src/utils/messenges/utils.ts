export type AnyFunction = (...args: any[]) => any
export type NonFunction<T> = T extends AnyFunction ? never : T

export function isFunction(u: unknown): u is AnyFunction {
	return typeof u === 'function'
}

export type Init<Res, Args extends any[] = []> = ((...args: Args) => Res) | Res

export function toInit<T, P = void>(init: Init<T, [P]>): (p: P) => T {
	return isFunction(init) ? (p) => init(p) : () => init
}

export function fromInit<Res, Args extends any[] = []>(
	init: Init<Res, Args>,
	...args: Args
): Res {
	return isFunction(init) ? init(...args) : init
}

export type Prettify<T> = unknown & {
	[K in keyof T]: T[K]
}
