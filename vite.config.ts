import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),

		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true,
			},
			manifest: {
				name: 'widgetify',
				short_name: 'widgetify',
				icons: [
					{
						src: 'icons/icon-48x48.png',
						sizes: '48x48',
						type: 'image/png',
					},
					{
						src: 'icons/icon-72x72.png',
						sizes: '72x72',
						type: 'image/png',
					},
					{
						src: 'icons/icon-96x96.png',
						sizes: '96x96',
						type: 'image/png',
					},
					{
						src: 'icons/icon-128x128.png',
						sizes: '128x128',
						type: 'image/png',
					},
					{
						src: 'icons/icon-144x144.png',
						sizes: '144x144',
						type: 'image/png',
					},
					{
						src: 'icons/icon-152x152.png',
						sizes: '152x152',
						type: 'image/png',
					},
					{
						src: 'icons/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'icons/icon-256x256.png',
						sizes: '256x256',
						type: 'image/png',
					},
					{
						src: 'icons/icon-384x384.png',
						sizes: '384x384',
						type: 'image/png',
					},
					{
						src: 'icons/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
				start_url: '/',
				display: 'standalone',
				background_color: '#ffffff',
				theme_color: '#000000',
			},
		}),
	],
	server: {
		host: '0.0.0.0',
		port: 5173,
	},
})
