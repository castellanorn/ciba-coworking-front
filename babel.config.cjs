export default {
  preset: 'babel-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Usar babel-jest para transformar archivos .js y .jsx
  },
};