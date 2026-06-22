'use client'

import { Radio } from '@base-ui/react/radio'
import { RadioGroup } from '@base-ui/react/radio-group'
import * as stylex from '@stylexjs/stylex'
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'

import { animationDurations } from '@/layouts/tokens/animationDurations.stylex'
import { animationTimings } from '@/layouts/tokens/animationTimings.stylex'
import { borderRadius } from '@/layouts/tokens/borderRadius.stylex'
import { borderWidth } from '@/layouts/tokens/borderWidth.stylex'
import { colors } from '@/layouts/tokens/colors.stylex'
import { sizes } from '@/layouts/tokens/sizes.stylex'
import { spaces } from '@/layouts/tokens/spaces.stylex'
import { createMessages, globalMessages } from '@/messages'

import { useDarkModeToggle } from './useDarkModeToggle'

const messages = createMessages(globalMessages, {
	chooseTheme: 'Choose appearance theme',
	lightTheme: 'Light theme',
	darkTheme: 'Dark theme',
	systemTheme: 'System theme',
})

const styles = stylex.create({
	container: {
		alignItems: 'center',
		display: 'inline-flex',
		backgroundColor: colors.btnBg,
		padding: spaces[3],
		borderRadius: borderRadius.full,
		borderWidth: borderWidth.thin,
		borderStyle: 'solid',
		borderColor: colors.border,
		boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.04)',
		position: 'relative',
		userSelect: 'none',
	},
	button: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
		position: 'relative',
		zIndex: 2,
		height: sizes.toggleButton,
		width: sizes.toggleButton,
		borderRadius: borderRadius.full,
		color: {
			default: colors.textMuted,
			':hover': colors.text,
		},
		cursor: 'pointer',
		outline: 'none',
		transitionProperty: 'color',
		transitionDuration: animationDurations.fast,
		transitionTimingFunction: animationTimings.ease,
	},
	activeButton: {
		color: colors.text,
	},
	indicator: {
		position: 'absolute',
		left: '4px',
		top: '4px',
		height: sizes.toggleButton,
		borderRadius: borderRadius.full,
		width: sizes.toggleButton,
		backgroundColor: colors.cardBg,
		boxShadow: colors.shadow,
		borderWidth: borderWidth.thin,
		borderStyle: 'solid',
		borderColor: colors.border,
		zIndex: 1,
	},
	indicatorAnimated: {
		transitionProperty: 'transform',
		transitionDuration: animationDurations.normal,
		transitionTimingFunction: animationTimings.snappy,
	},
	// Transforms for slide effect
	light: {
		transform: 'translateX(0px)',
	},
	dark: {
		transform: 'translateX(38px)',
	},
	system: {
		transform: 'translateX(76px)',
	},
})

export function DarkModeToggle() {
	const { theme, updateTheme } = useDarkModeToggle()

	return (
		<RadioGroup
			aria-label={messages.chooseTheme}
			value={theme}
			onValueChange={updateTheme}
			{...stylex.props([styles.container])}
		>
			<div
				{...stylex.props([
					styles.indicator,
					styles.indicatorAnimated,
					styles[theme],
				])}
				aria-hidden='true'
			/>

			<Radio.Root
				value='light'
				nativeButton
				render={(buttonProps) => (
					<button
						{...buttonProps}
						title={messages.lightTheme}
						{...stylex.props([
							styles.button,
							buttonProps['aria-checked'] && styles.activeButton,
						])}
					>
						<FiSun size={18} />
					</button>
				)}
			/>

			<Radio.Root
				value='dark'
				nativeButton
				render={(buttonProps) => (
					<button
						{...buttonProps}
						title={messages.darkTheme}
						{...stylex.props([
							styles.button,
							buttonProps['aria-checked'] && styles.activeButton,
						])}
					>
						<FiMoon size={18} />
					</button>
				)}
			/>

			<Radio.Root
				value='system'
				nativeButton
				render={(buttonProps) => (
					<button
						{...buttonProps}
						title={messages.systemTheme}
						{...stylex.props([
							styles.button,
							buttonProps['aria-checked'] && styles.activeButton,
						])}
					>
						<FiMonitor size={18} />
					</button>
				)}
			/>
		</RadioGroup>
	)
}
