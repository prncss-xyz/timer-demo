import { defineConfig } from 'waku/config'

import { basePath } from './src/meta'
import vite from './vite.config'

export default defineConfig({
	basePath,
	vite,
})
