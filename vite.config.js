import { defineConfig } from 'vite';

export default defineConfig({
  base: '/conteudo-saude-acessivel/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        conteudo: 'conteudo.html'
      }
    }
  }
});
