// frontend/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://calculator1-fc4166db17b2.herokuapp.com/api/calculate", // adres Twojego backendu
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
