import { themeKey } from './consts'

const themeScript = `
(function () {
	try {
		const theme = localStorage.getItem('${themeKey}')
		if (
			theme === 'dark' ||
			(theme !== 'light' &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	} catch (_) {}
})();
`

export function DarkModeScript() {
	return <script dangerouslySetInnerHTML={{ __html: themeScript }} />
}
