import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Qualquer requisição que comece com /api será redirecionada
      '/api': {
        // O alvo é o seu servidor backend, que roda na porta 3001 DENTRO do codespace
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})