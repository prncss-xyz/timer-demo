export function getOne<X>(xs: Iterable<X>, cond: (x: X) => boolean) {
	for (const x of xs) if (cond(x)) return x
	throw new Error('Could not find item satisfying condintion')
}
