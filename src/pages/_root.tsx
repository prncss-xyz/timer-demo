import './styles.css'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/400-italic.css'
import '@fontsource/nunito/700.css'
import '@fontsource/nunito/700-italic.css'
import type { ReactNode } from 'react'

type RootElementProps = { children: ReactNode }

export default async function RootElement({ children }: RootElementProps) {
	return (
		<html lang='en'>
			<head>
				{import.meta.env.DEV && !import.meta.env.VITEST && (
					<link rel='stylesheet' href='/virtual:stylex.css' />
				)}
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
