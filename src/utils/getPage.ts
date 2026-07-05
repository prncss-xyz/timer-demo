import { allPages } from 'content-collections'

import { getOne } from './getOne'

export function getPage(slug: string) {
	return getOne(allPages, (page) => page.slug === slug)
}
