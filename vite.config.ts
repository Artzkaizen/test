import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		rollupOptions: {
			output: {
				assetFileNames: "assets/[name][extname]",
				chunkFileNames: "assets/[name][extname]",
			},
		},
	},
	server: {
		proxy: {
		  '/api/recording': {
			target: 'https://vroom.b-trend.digital',
			changeOrigin: true,
			secure: false,  // Disable SSL verification for self-signed certificates
			rewrite: (path) => {
			  console.log('Rewriting path:', path); // Debugging line
			  const newpath = path.replace(/^\/api\/recording/, '');
			  console.log('Rewriting path:', newpath); // Debugging line
			  return newpath;
			},
		},
		},
	  },
});
