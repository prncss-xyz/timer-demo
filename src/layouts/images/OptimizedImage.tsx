'use client'
import * as stylex from '@stylexjs/stylex'
import { ComponentProps, useEffect, useRef, useState } from 'react'

import { ResponsiveImage } from './getResponsiveImage'

const styles = stylex.create({
	container: {
		placeItems: 'center',
		display: 'inline-grid',
	},
	content: {
		gridColumnStart: '1',
		gridRowStart: '1',
	},
	invisible: {
		zIndex: -1,
	},
})

export function OptimizedImage({
	image: { alt, height, placeholder, src, srcSet, width },
	sx,
	...rest
}: Omit<ComponentProps<'div'>, 'classname' | 'style'> & {
	image: ResponsiveImage
	sx?: stylex.StyleXStyles | stylex.StyleXStyles[]
}) {
	const [loaded, setLoaded] = useState(false)
	const imgRef = useRef<HTMLImageElement>(null)
	useEffect(() => {
		if (imgRef.current?.complete) setLoaded(true)
	}, [])
	return (
		<div {...rest} sx={[styles.container, sx]}>
			<img
				alt={alt}
				aria-hidden='true'
				height={height}
				src={placeholder}
				width={width}
				sx={[styles.content, loaded && styles.invisible]}
			/>
			<img
				alt={alt}
				height={height}
				onLoad={() => setLoaded(true)}
				ref={imgRef}
				src={src}
				srcSet={srcSet}
				width={width}
				sx={[styles.content, !loaded && styles.invisible]}
			/>
		</div>
	)
}
