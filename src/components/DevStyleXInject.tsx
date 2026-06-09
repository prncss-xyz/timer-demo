'use client'
import { useEffect } from 'react'

function DevStyleXInjectImpl() {
	useEffect(() => {
		if (import.meta.env.DEV) {
			void import(/* @vite-ignore */ 'virtual:stylex:css-only')
		}
	}, [])
	return <link rel='stylesheet' href='/virtual:stylex.css' />
}

export function DevStyleXInject() {
	return import.meta.env.DEV ? <DevStyleXInjectImpl /> : null
}
