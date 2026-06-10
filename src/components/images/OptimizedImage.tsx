'use client'
import { create, props, StyleXStyles } from '@stylexjs/stylex'
import { ComponentProps, useEffect, useRef, useState } from 'react'

import { ResponsiveImage } from './getResponsiveImage'

const styles = create({
	container: {
		display: 'inline-grid',
		placeItems: 'center',
	},
	content: {
		gridArea: '1 / 1',
	},
	invisible: {
		zIndex: -1,
	},
})

export function OptimizedImage({
	image: { alt, height, placeholder, src, srcSet, width },
	style,
	...rest
}: Omit<ComponentProps<'div'>, 'classname' | 'style'> & {
	image: ResponsiveImage
	style?: StyleXStyles
}) {
	const [loaded, setLoaded] = useState(false)
	const imgRef = useRef<HTMLImageElement>(null)
	useEffect(() => {
		if (imgRef.current?.complete) setLoaded(true)
	}, [])
	return (
		<div {...rest} {...props(styles.container)}>
			<img
				alt={alt}
				aria-hidden='true'
				height={height}
				src={placeholder}
				width={width}
				{...props(style, styles.content, loaded && styles.invisible)}
			/>
			<img
				alt={alt}
				height={height}
				onLoad={() => setLoaded(true)}
				ref={imgRef}
				src={src}
				srcSet={srcSet}
				width={width}
				{...props(style, styles.content, !loaded && styles.invisible)}
			/>
		</div>
	)
}
