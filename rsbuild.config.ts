import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
	source: {
		alias: {
			"@": "./src",
		},
	},
	server: {
		proxy: {
			"/api/": "http://localhost:3000",
		},
	},
	plugins: [pluginReact()],
});
