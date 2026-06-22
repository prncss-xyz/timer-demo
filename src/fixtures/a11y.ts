import { AxeBuilder } from '@axe-core/playwright'
import { test as base, expect } from '@playwright/test'

// Extends the base Playwright test with a `makeAxeBuilder` fixture that
// returns a fresh AxeBuilder bound to the current page. Specs call it
// right before `.analyze()`, optionally chaining `.include()`/`.exclude()`
// to scope the audit. Defaults to WCAG 2.1 A/AA rule tags so the audit
// targets the conformance level that ships, not axe's full (noisy) rule set.
export const test = base.extend<{
	makeAxeBuilder: () => AxeBuilder
}>({
	makeAxeBuilder: async ({ page }, use) => {
		await use(() =>
			new AxeBuilder({ page }).withTags([
				'wcag2a',
				'wcag2aa',
				'wcag21a',
				'wcag21aa',
			]),
		)
	},
})

export { expect }
