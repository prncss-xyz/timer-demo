import { defineVars } from '@stylexjs/stylex'

export const colors = defineVars({
	background: {
		default: '#f8fafc',
		'@media (prefers-color-scheme: dark)': '#090d16',
	},
	text: {
		default: '#0f172a',
		'@media (prefers-color-scheme: dark)': '#f8fafc',
	},
	textMuted: {
		default: '#64748b',
		'@media (prefers-color-scheme: dark)': '#94a3b8',
	},
	primary: {
		default: '#6366f1',
		'@media (prefers-color-scheme: dark)': '#818cf8',
	},
	primaryHover: {
		default: '#4f46e5',
		'@media (prefers-color-scheme: dark)': '#a5b4fc',
	},
	cardBg: {
		default: '#ffffff',
		'@media (prefers-color-scheme: dark)': '#111827',
	},
	border: {
		default: '#e2e8f0',
		'@media (prefers-color-scheme: dark)': '#1f2937',
	},
	btnBg: {
		default: '#f1f5f9',
		'@media (prefers-color-scheme: dark)': '#1f2937',
	},
	btnBgHover: {
		default: '#e2e8f0',
		'@media (prefers-color-scheme: dark)': '#374151',
	},
	shadow: {
		default:
			'0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
		'@media (prefers-color-scheme: dark)':
			'0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
	},
	headerBg: {
		default: 'rgba(248, 250, 252, 0.8)',
		'@media (prefers-color-scheme: dark)': 'rgba(9, 13, 22, 0.8)',
	},
})
