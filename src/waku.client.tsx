import { StrictMode, createElement } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { unstable_defaultRootOptions as defaultRootOptions } from 'waku/client'
import { Router } from 'waku/router/client'

const rootElement = createElement(StrictMode, null, createElement(Router))

const hydrate = () => {
	if ((globalThis as any).__WAKU_HYDRATE__) {
		hydrateRoot(document, rootElement, defaultRootOptions)
	} else {
		createRoot(document, defaultRootOptions).render(rootElement)
	}
}

// Select all stylesheet links in the document
const stylesheets = Array.from(
	document.querySelectorAll('link[rel="stylesheet"]'),
) as HTMLLinkElement[]

// Helper to determine if a stylesheet has finished loading and parsing
const isLoaded = (link: HTMLLinkElement) => {
	try {
		return !!link.sheet
	} catch (_e) {
		// A SecurityError means it loaded successfully but is cross-origin
		return true
	}
}

const pendingStylesheets = new Set(
	stylesheets.filter((link) => !isLoaded(link)),
)

if (pendingStylesheets.size === 0) {
	hydrate()
} else {
	const onStyleLoad = (link: HTMLLinkElement) => {
		if (pendingStylesheets.has(link)) {
			pendingStylesheets.delete(link)
			if (pendingStylesheets.size === 0) {
				hydrate()
			}
		}
	}

	for (const link of pendingStylesheets) {
		link.addEventListener('load', () => onStyleLoad(link), { once: true })
		link.addEventListener('error', () => onStyleLoad(link), { once: true })

		// Re-check immediately after adding listeners to resolve any race condition
		if (isLoaded(link)) {
			onStyleLoad(link)
		}
	}
}
