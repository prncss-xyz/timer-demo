import { vi } from 'vitest'

vi.mock('@stylexjs/stylex', () => ({
	create: (x: any) => x,
	props: () => ({}),
	defineVars: (x: any) => x,
}))
