export function tag<K extends PropertyKey, V>(type: K, payload: V) {
	return { payload, type }
}
