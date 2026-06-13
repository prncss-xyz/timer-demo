'use client'

import { Radio } from '@base-ui/react/radio'
import { RadioGroup } from '@base-ui/react/radio-group'
import * as stylex from '@stylexjs/stylex'
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'

import {
	colors,
	borderRadius,
	borderWidth,
	sizes,
	spaces,
	animationDurations,
	animationTimings,
} from '@/layouts/tokens.stylex'

import { useDarkModeToggle } from './useDarkModeToggle'

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
	srOnly: {
		position: 'absolute',
		height: '1px',
		width: '1px',
		padding: spaces.none,
		margin: '-1px',
		overflow: 'hidden',
		clip: 'rect(0, 0, 0, 0)',
		borderWidth: borderWidth.none,
		whiteSpace: 'nowrap',
	},
})

export function DarkModeToggle() {
	const { theme, updateTheme } = useDarkModeToggle()

	return (
		<RadioGroup
			aria-label='Choose appearance theme'
			value={theme}
			onValueChange={(val) => {
				if (val) updateTheme(val)
			}}
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
					<label>
						<button
							{...buttonProps}
							title='Light theme'
							{...stylex.props([
								styles.button,
								theme === 'light' && styles.activeButton,
							])}
						>
							<span {...stylex.props([styles.srOnly])}>Light theme</span>
							<FiSun size={18} />
						</button>
					</label>
				)}
			/>

			<Radio.Root
				value='dark'
				nativeButton
				render={(buttonProps) => (
					<label>
						<button
							{...buttonProps}
							title='Dark theme'
							{...stylex.props([
								styles.button,
								theme === 'dark' && styles.activeButton,
							])}
						>
							<span {...stylex.props([styles.srOnly])}>Dark theme</span>
							<FiMoon size={18} />
						</button>
					</label>
				)}
			/>

			<Radio.Root
				value='system'
				nativeButton
				render={(buttonProps) => (
					<label>
						<button
							{...buttonProps}
							title='System theme'
							{...stylex.props([
								styles.button,
								theme === 'system' && styles.activeButton,
							])}
						>
							<span {...stylex.props([styles.srOnly])}>System theme</span>
							<FiMonitor size={18} />
						</button>
					</label>
				)}
			/>
		</RadioGroup>
	)
}
