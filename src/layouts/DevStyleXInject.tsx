'use client'
import { useEffect } from 'react'

import { basePath } from '@/basePath'

function DevStyleXInjectImpl() {
	useEffect(() => {
		if (import.meta.env.DEV) {
			void import(/* @vite-ignore */ 'virtual:stylex:css-only')
		}
	}, [])
	return <link href='/virtual:stylex.css' rel='stylesheet' precedence='high' />
}

export function DevStyleXInject() {
	if (import.meta.env.DEV) return <DevStyleXInjectImpl />
	return (
		<link href={basePath + 'stylex.css'} rel='stylesheet' precedence='high' />
	)
}
