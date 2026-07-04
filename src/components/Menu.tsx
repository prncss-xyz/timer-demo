'use client'
import { type ReactNode } from 'react'
import { Link, useRouter } from 'waku'

import { Box, Row } from '@/layouts/Box'

type Target = Parameters<typeof Link>[0]['to']

export function Menu({
	entries,
	children,
}: {
	children?: ReactNode
	entries: {
		to: Target
		title: string
	}[]
}) {
	const { path } = useRouter()
	return (
		<Row align='baseline' fontSize={4} gap={5}>
			{entries.map(({ to, title }) => (
				<Box italic={path === to} as={Link} key={String(to)} to={to}>
					{title}
				</Box>
			))}
			{children}
		</Row>
	)
}
