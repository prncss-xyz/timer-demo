import type { ReactNode } from 'react'

import { DarkModeScript } from '@/features/darkMode/DarkModeScript'
import { lang } from '@/meta'

type RootElementProps = { children: ReactNode }

export default async function RootElement({ children }: RootElementProps) {
	return (
		<html lang={lang}>
			<head>
				<DarkModeScript />
			</head>
			<body>{children}</body>
		</html>
	)
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
