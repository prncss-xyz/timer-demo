import { defineConfig } from 'waku/config'

import { basePath } from './src/basePath'
import vite from './vite.config'

export default defineConfig({
	basePath,
	vite,
})
