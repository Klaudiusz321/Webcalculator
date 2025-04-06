// frontend/vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        server: {
            proxy: {
                '/api/calculate': {
                    target: 'https://calculator1-fc4166db17b2.herokuapp.com',
                    changeOrigin: true,
                    secure: false,
                    rewrite: function (path) { return path.replace(/^\/api/, ''); }
                }
            }
        },
        define: {
            'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL)
        }
    };
});
