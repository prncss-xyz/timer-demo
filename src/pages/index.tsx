import * as stylex from '@stylexjs/stylex'

import { colors } from '@/layouts/tokens.stylex'

const styles = stylex.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		rowGap: '3rem',
		columnGap: '3rem',
		maxWidth: '600px',
		width: '100%',
		padding: '2rem',
	},
	textSection: {
		display: 'flex',
		rowGap: '1.25rem',
		columnGap: '1.25rem',
		flexDirection: 'column',
		textAlign: 'center',
		alignItems: 'center',
	},
	badge: {
		paddingBlock: '0.25rem',
		paddingInline: '0.75rem',
		display: 'inline-flex',
		borderRadius: '9999px',
		backgroundColor: colors.btnBg,
		color: colors.primary,
		fontSize: '0.85rem',
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: colors.border,
		fontWeight: 700,
		textTransform: 'uppercase',
		transition: 'all 0.3s ease',
		letterSpacing: '0.05em',
	},
	heading: {
		fontSize: {
			default: '2.25rem',
			'@media (min-width: 768px)': '3rem',
		},
		fontWeight: 800,
		letterSpacing: '-0.03em',
		margin: 0,
		lineHeight: 1.15,
		color: colors.text,
		transition: 'color 0.3s ease',
	},
	description: {
		color: colors.textMuted,
		fontSize: '1.125rem',
		lineHeight: 1.6,
		margin: 0,
		transition: 'color 0.3s ease',
		maxWidth: '480px',
	},
	featureList: {
		display: 'flex',
		rowGap: '0.75rem',
		columnGap: '0.75rem',
		flexDirection: 'column',
		marginTop: '0.5rem',
		textAlign: 'left',
	},
	featureItem: {
		alignItems: 'center',
		display: 'flex',
		rowGap: '0.75rem',
		columnGap: '0.75rem',
		color: colors.text,
		fontSize: '0.95rem',
		transition: 'color 0.3s ease',
		fontWeight: 500,
	},
	bullet: {
		height: '6px',
		width: '6px',
		borderRadius: '50%',
		backgroundColor: colors.primary,
	},
})

export default async function HomePage() {
	return (
		<div {...stylex.props(styles.container)}>
			<title>Dark Mode Demo</title>

			<div {...stylex.props(styles.textSection)}>
				<span {...stylex.props(styles.badge)}>Feature Complete</span>
				<h1 {...stylex.props(styles.heading)}>Sleek Dark Mode</h1>
				<p {...stylex.props(styles.description)}>
					A gorgeous web application showcasing a persisted three-state dark
					mode toggle (Light, Dark, and System theme synchronization) built
					using StyleX and Waku.
				</p>

				<div {...stylex.props(styles.featureList)}>
					<div {...stylex.props(styles.featureItem)}>
						<div {...stylex.props(styles.bullet)} />
						<span>3-State Persistence (Light / Dark / System)</span>
					</div>
					<div {...stylex.props(styles.featureItem)}>
						<div {...stylex.props(styles.bullet)} />
						<span>Zero Flash of Unthemed Content (FOUC)</span>
					</div>
					<div {...stylex.props(styles.featureItem)}>
						<div {...stylex.props(styles.bullet)} />
						<span>System theme auto-update listeners</span>
					</div>
					<div {...stylex.props(styles.featureItem)}>
						<div {...stylex.props(styles.bullet)} />
						<span>Premium responsive interface using StyleX</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
