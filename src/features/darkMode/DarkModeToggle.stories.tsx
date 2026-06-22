import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'

import { themeKey } from './consts'
import { DarkModeToggle } from './DarkModeToggle'

/**
 * Sets the dark mode theme in localStorage before the component renders.
 * The set happens synchronously in the decorator render so that
 * useSyncExternalStore inside useDarkModeToggle picks up the correct value.
 */
const withThemePreset: Decorator = (Story, context) => {
	const theme = context.parameters.theme as string | undefined

	// Set synchronously before story renders — useLocalStorage reads
	// from localStorage during render via getSnapshot.
	if (theme === 'light' || theme === 'dark') {
		localStorage.setItem(themeKey, theme)
	} else {
		localStorage.removeItem(themeKey)
	}

	// Clean up after unmount
	useEffect(() => {
		return () => {
			localStorage.removeItem(themeKey)
		}
	}, [])

	return <Story />
}

const meta: Meta<typeof DarkModeToggle> = {
	title: 'Features/DarkModeToggle',
	component: DarkModeToggle,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [withThemePreset],
}

export default meta

type Story = StoryObj<typeof DarkModeToggle>

/** Toggle with light theme selected. */
export const Light: Story = {
	parameters: { theme: 'light' },
}

/** Toggle with dark theme selected. */
export const Dark: Story = {
	parameters: { theme: 'dark' },
}

/** Toggle with system preference theme. */
export const System: Story = {
	parameters: { theme: 'system' },
}
