import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to your backend
      '/api': {
        target: 'http://localhost:9000', // Your backend server
        changeOrigin: true,  // Needed for virtual hosted sites
        secure: false,       // If you're running on http, not https
        rewrite: (path) => path.replace(/^\/api/, '') // Remove /api prefix if needed
      }
    }
  }
});
