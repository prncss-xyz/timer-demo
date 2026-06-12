'use client'
import { useEffect } from 'react'

function DevStyleXInjectImpl() {
	useEffect(() => {
		if (import.meta.env.DEV) {
			void import(/* @vite-ignore */ 'virtual:stylex:css-only')
		}
	}, [])
	return <link href='/virtual:stylex.css' rel='stylesheet' precedence='high' />
}

export function DevStyleXInject({ cssHref }: { cssHref: string }) {
	return import.meta.env.DEV ? (
		<DevStyleXInjectImpl />
	) : (
		<link href={cssHref} rel='stylesheet' />
	)
}
