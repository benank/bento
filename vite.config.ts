import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import Unfonts from 'unplugin-fonts/vite';

export default defineConfig({
	plugins: [sveltekit(), Unfonts({
		google: {
			families: ['Figtree'],
		},
	})],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
