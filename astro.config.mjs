import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import solid from '@astrojs/solid-js';
import pwa from '@vite-pwa/astro';
import react from '@astrojs/react';

export default defineConfig({
    output: 'server',
    integrations: [
        tailwind(),
        solid(),
        react(),
        pwa({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Your App Name',
                short_name: 'App',
                start_url: '/',
                display: 'standalone',
                background_color: '#ffffff',
                theme_color: '#000000',
                icons: [
                    {
                        src: '/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })],
});
