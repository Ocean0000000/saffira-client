import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(), 
		sveltekit(),
		Icons({
			compiler: 'svelte',
		})
	],
	optimizeDeps: {
		include: ['@iconify-json/logos', 'aws-amplify'],
	}
});
