import 'dotenv/config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {},
  resolve: {
    alias: {
      '@controllers': '/src/app/controllers',
      '@repositories': '/src/app/repositories',
      '@schemas': '/src/app/schemas',
      '@utils': '/src/utils',
      '@helpers': '/src/helpers',
    },
  },
});
