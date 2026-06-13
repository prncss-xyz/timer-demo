import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { themeKey } from './consts'
import { DarkModeToggle } from './DarkModeToggle'

vi.mock('@stylexjs/stylex', () => ({
	create: (x: any) => x,
	props: () => ({}),
	defineVars: (x: any) => x,
}))

describe('ThemeToggle', () => {
	let container: HTMLDivElement

	beforeEach(() => {
		container = document.createElement('div')
		document.body.appendChild(container)
		document.documentElement.className = ''
		localStorage.clear()

		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: vi.fn().mockImplementation((query: string) => ({
				matches: false,
				media: query,
				onchange: null,
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			})),
		})
	})

	afterEach(() => {
		document.body.removeChild(container)
	})

	it('should render theme toggle and initialize to system by default', async () => {
		const root = createRoot(container)
		await act(async () => {
			root.render(<DarkModeToggle />)
		})

		const lightBtn = container.querySelector('[title="Light theme"]')
		const darkBtn = container.querySelector('[title="Dark theme"]')
		const systemBtn = container.querySelector('[title="System theme"]')

		expect(lightBtn).not.toBeNull()
		expect(darkBtn).not.toBeNull()
		expect(systemBtn).not.toBeNull()

		expect(systemBtn?.getAttribute('aria-checked')).toBe('true')
	})

	it('should switch theme to light on click', async () => {
		const root = createRoot(container)
		await act(async () => {
			root.render(<DarkModeToggle />)
		})

		const lightBtn = container.querySelector(
			'[title="Light theme"]',
		) as HTMLButtonElement
		await act(async () => {
			lightBtn.click()
		})

		expect(localStorage.getItem(themeKey)).toBe('light')
		expect(document.documentElement.classList.contains('dark')).toBe(false)
	})

	it('should switch theme to dark on click', async () => {
		const root = createRoot(container)
		await act(async () => {
			root.render(<DarkModeToggle />)
		})

		const darkBtn = container.querySelector(
			'[title="Dark theme"]',
		) as HTMLButtonElement
		await act(async () => {
			darkBtn.click()
		})

		expect(localStorage.getItem(themeKey)).toBe('dark')
		expect(document.documentElement.classList.contains('dark')).toBe(true)
	})
})
