import * as stylex from '@stylexjs/stylex'

import {
	colors,
	borderRadius,
	borderWidth,
	fontSizes,
	fontWeights,
	sizes,
	spaces,
} from '@/layouts/tokens.stylex'

const styles = stylex.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		rowGap: spaces[6],
		columnGap: spaces[6],
		maxWidth: sizes.containerMaxWidth,
		width: sizes.full,
		padding: spaces[6],
	},
	textSection: {
		display: 'flex',
		rowGap: spaces[5],
		columnGap: spaces[5],
		flexDirection: 'column',
		textAlign: 'center',
		alignItems: 'center',
	},
	badge: {
		paddingBlock: spaces[3],
		paddingInline: spaces[4],
		display: 'inline-flex',
		borderRadius: borderRadius.full,
		backgroundColor: colors.btnBg,
		color: colors.primary,
		fontSize: fontSizes[2],
		borderWidth: borderWidth.thin,
		borderStyle: 'solid',
		borderColor: colors.border,
		fontWeight: fontWeights.bold,
		textTransform: 'uppercase',
		transition: 'all 0.3s ease',
	},
	heading: {
		fontSize: {
			default: fontSizes[6],
			'@media (min-width: 768px)': fontSizes[6],
		},
		fontWeight: fontWeights.bold,
		letterSpacing: '-0.03em',
		margin: spaces.none,
		lineHeight: 1.15,
		color: colors.text,
		transition: 'color 0.3s ease',
	},
	description: {
		color: colors.textMuted,
		fontSize: fontSizes[4],
		lineHeight: 1.6,
		margin: spaces.none,
		transition: 'color 0.3s ease',
		maxWidth: sizes.descriptionMaxWidth,
	},
	featureList: {
		display: 'flex',
		rowGap: spaces[4],
		columnGap: spaces[4],
		flexDirection: 'column',
		marginTop: spaces[4],
		textAlign: 'left',
	},
	featureItem: {
		alignItems: 'center',
		display: 'flex',
		rowGap: spaces[4],
		columnGap: spaces[4],
		color: colors.text,
		fontSize: fontSizes[3],
		transition: 'color 0.3s ease',
		fontWeight: fontWeights.normal,
	},
	bullet: {
		height: '6px',
		width: '6px',
		borderRadius: borderRadius.circle,
		backgroundColor: colors.primary,
	},
})

export default async function HomePage() {
	return (
		<div sx={styles.container}>
			<title>Dark Mode Demo</title>

			<div sx={styles.textSection}>
				<span sx={styles.badge}>Feature Complete</span>
				<h1 sx={styles.heading}>Sleek Dark Mode</h1>
				<p sx={styles.description}>
					A gorgeous web application showcasing a persisted three-state dark
					mode toggle (Light, Dark, and System theme synchronization) built
					using StyleX and Waku.
				</p>

				<div sx={styles.featureList}>
					<div sx={styles.featureItem}>
						<div sx={styles.bullet} />
						<span>3-State Persistence (Light / Dark / System)</span>
					</div>
					<div sx={styles.featureItem}>
						<div sx={styles.bullet} />
						<span>Zero Flash of Unthemed Content (FOUC)</span>
					</div>
					<div sx={styles.featureItem}>
						<div sx={styles.bullet} />
						<span>System theme auto-update listeners</span>
					</div>
					<div sx={styles.featureItem}>
						<div sx={styles.bullet} />
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
