import type { ReactNode } from 'react'

type RootElementProps = { children: ReactNode }

export default async function RootElement({ children }: RootElementProps) {
	return (
		<html lang='en'>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function() {
								try {
									const theme = localStorage.getItem('theme') || 'system';
									const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
									if (isDark) {
										document.documentElement.classList.add('dark');
									} else {
										document.documentElement.classList.remove('dark');
									}
								} catch (e) {}
							})();
						`,
					}}
				/>
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
