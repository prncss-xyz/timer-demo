import { test } from '@/fixtures/lighthouse'

import { buildBasePath } from './basePath'

const root = buildBasePath(process.env)

test.describe('Lighthouse', () => {
	// Lighthouse audits take 15-30s each — give them headroom.
	test.describe.configure({ timeout: 60_000 })

	test('home (/) meets thresholds', async ({ page, playLighthouseAudit }) => {
		await page.goto(root)
		await playLighthouseAudit({ name: 'home' })
	})

	test('posts index (/posts) meets thresholds', async ({
		page,
		playLighthouseAudit,
	}) => {
		await page.goto(`${root}posts`)
		await playLighthouseAudit({ name: 'posts' })
	})

	test('post detail (/posts/hello-world) meets thresholds', async ({
		page,
		playLighthouseAudit,
	}) => {
		await page.goto(`${root}posts/hello-world`)
		await playLighthouseAudit({ name: 'post-detail' })
	})

	test('qr (/qr) meets thresholds', async ({ page, playLighthouseAudit }) => {
		await page.goto(`${root}qr`)
		await playLighthouseAudit({ name: 'qr' })
	})
})
