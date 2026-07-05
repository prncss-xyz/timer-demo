import { PageMeta } from '@/components/PageMeta'
import { Box } from '@/layouts/Box'
import { MD } from '@/layouts/MD'
import { getPage } from '@/utils/getPage'

const page = getPage('about')

export default async function HomePage() {
	return (
		<>
			<PageMeta {...page} />
			<Box bg='translucent'>
				<MD>{page.content}</MD>
			</Box>
		</>
	)
}

export async function getConfig() {
	return {
		render: 'static',
	} as const
}
