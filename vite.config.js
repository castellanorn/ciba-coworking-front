import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {

    environment: 'jsdom', // Simula el DOM en el entorno de pruebas
    globals: true,        // Habilita variables globales como `describe`, `it`, etc.
    setupFiles: './setupTests.js', // Archivo de configuración de las pruebas
    coverage: {
      provider: 'istanbul', // Utiliza el proveedor de cobertura de Istanbul
      reporter: ['text', 'json', 'html'], // Formatos de reporte que deseas
      all: true, // Incluye todos los archivos en el reporte de cobertura
      include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'], // Archivos que deseas incluir
      exclude: ['node_modules', 'test/**/*.test.js', 'test/**/*.test.ts'], // Archivos que deseas excluir
    },

  },
});
