import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { page } from 'vitest/browser'

import { DarkModeToggle } from './DarkModeToggle'

describe('ThemeToggle', () => {
	let container: HTMLDivElement

	beforeEach(() => {
		container = document.createElement('div')
		document.body.appendChild(container)
		document.documentElement.className = ''
		localStorage.clear()
	})

	afterEach(() => {
		document.body.removeChild(container)
	})

	it('should render theme toggle and initialize to system by default', async () => {
		const root = createRoot(container)
		await act(async () => {
			root.render(<DarkModeToggle />)
		})

		const systemBtn = page.getByTitle('System theme')
		await expect.element(systemBtn).toHaveAttribute('aria-checked', 'true')
	})

	it('should switch theme to light on click', async () => {
		const root = createRoot(container)
		await act(async () => {
			root.render(<DarkModeToggle />)
		})

		const lightBtn = page.getByTitle('Light theme')
		await lightBtn.click()

		expect(document.documentElement.classList.contains('dark')).toBe(false)
	})

	it('should switch theme to dark on click', async () => {
		const root = createRoot(container)
		await act(async () => {
			root.render(<DarkModeToggle />)
		})

		const darkBtn = page.getByTitle('Dark theme')
		await darkBtn.click()

		expect(document.documentElement.classList.contains('dark')).toBe(true)
	})
})
