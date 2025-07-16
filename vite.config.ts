import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig, normalizePath } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import svgr from 'vite-plugin-svgr'

const require = createRequire(import.meta.url)
const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'))
const cMapsDir = normalizePath(path.join(pdfjsDistPath, 'cmaps'))

export default defineConfig({
	plugins: [
		react(),
		svgr(),
		viteStaticCopy({
			targets: [
				{
					src: cMapsDir,
					dest: '',
				},
			],
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
		},
	},
	server: {
		port: 5175, // Porta específica para consistência
		host: true, // Permite acesso de outros IPs na rede
	},
})
