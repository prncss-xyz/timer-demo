import { buildBasePath } from './basePath'

export const basePath = buildBasePath(import.meta.env)
export const baseUrl = import.meta.env.VITE_BASE_URL ?? 'http://localhost:3000'

export const title = 'Juliette Lamarche'

export const lang = 'en'
