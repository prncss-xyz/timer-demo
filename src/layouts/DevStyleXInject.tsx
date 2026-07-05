'use client'
import { useLayoutEffect } from 'react'

const LAYER_ORDER_STYLE_ID = 'stylex-layer-order'

// vite-plugin-webfont-dl injects webfont CSS into generated HTML/CSS for
// production builds. Waku dev does not pass its SSR document through Vite's
// transformIndexHtml hook, so request the plugin's dev middleware CSS directly.
const DEV_WEBFONT_CSS_PATH = '/@webfonts/webfonts.css'

/**
 * In Waku (app) dev and in the Storybook build, the reset stylesheet
 * (`@layer reset { ... }` from `src/pages/reset.css`) lands before the StyleX
 * stylesheet, so `@layer reset` is the first-declared cascade layer and ends up
 * with the lowest precedence — StyleX's `@layer priorityN` rules (and unlayered
 * priority-0 rules) correctly override the reset.
 *
 * In Storybook dev, StyleX's `devMode: 'css-only'` auto-injects the
 * `/virtual:stylex.css` `<link>` at the very top of `<head>` (Vite prepends it),
 * which makes `@layer reset` get declared *after* the StyleX layers. That flips
 * precedence so the reset's `ul, ol { list-style: none; padding: 0 }` wins over
 * StyleX's list styles — lists render unstyled.
 *
 * Fix: guarantee `@layer reset` is declared first by keeping a tiny `<style>`
 * with that declaration at the very front of `<head>`, reasserting it via a
 * MutationObserver whenever Vite reorders/repends stylesheets (e.g. on HMR).
 */
function ensureResetLayerFirst() {
	const head = document.head
	let style = document.getElementById(
		LAYER_ORDER_STYLE_ID,
	) as HTMLStyleElement | null
	if (!style) {
		style = document.createElement('style')
		style.id = LAYER_ORDER_STYLE_ID
		style.textContent = '@layer reset;'
	}
	if (head.firstChild !== style) head.insertBefore(style, head.firstChild)
}

export function DevStyleXInject() {
	useLayoutEffect(() => {
		if (!import.meta.env.DEV) return
		ensureResetLayerFirst()
		const observer = new MutationObserver(ensureResetLayerFirst)
		observer.observe(document.head, { childList: true })
		return () => observer.disconnect()
	}, [])

	if (import.meta.env.DEV) {
		return (
			<>
				<link href={DEV_WEBFONT_CSS_PATH} rel='stylesheet' precedence='high' />
				<link href='/virtual:stylex.css' rel='stylesheet' precedence='high' />
			</>
		)
	}
	return null
}
