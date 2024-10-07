import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Establece la URL base para las pruebas E2E
    supportFile: false, // Deshabilitar el archivo de soporte
    // otras configuraciones adicionales si es necesario...
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
