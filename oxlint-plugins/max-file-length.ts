/**
 * Local oxlint plugin: enforces a maximum file length (in UTF-16 code units).
 *
 * Wired up in `oxlint.config.ts` via `jsPlugins` as:
 *   { name: 'max-file-length', specifier: './oxlint-plugins/max-file-length.ts' }
 *
 * Rule option: `[ "error", { utf16: 20000 } ]`.
 */

const DEFAULT_UTF16 = 20_000

interface MaxFileLengthOptions {
	readonly utf16?: number
}

const rule = {
	meta: {
		schema: [
			{
				type: 'object',
				properties: {
					utf16: { type: 'integer', minimum: 0 },
				},
				additionalProperties: false,
			},
		],
	},
	create(context: {
		readonly options: ReadonlyArray<MaxFileLengthOptions>
		readonly sourceCode: { readonly text: string }
		readonly report: (descriptor: {
			readonly node: unknown
			readonly message: string
			readonly loc?: { readonly line: number; readonly column: number }
		}) => void
	}) {
		const [{ utf16 = DEFAULT_UTF16 } = {}] = context.options

		return {
			Program: (node: unknown) => {
				const length = context.sourceCode.text.length
				if (length > utf16) {
					context.report({
						node,
						message: `File length of ${length} chars exceeds limit of ${utf16}; split this module into smaller files.`,
						loc: { line: 1, column: 0 },
					})
				}
			},
		}
	},
}

const plugin = {
	meta: {
		name: 'max-file-length',
	},
	rules: {
		'max-file-length': rule,
	},
}

export default plugin
