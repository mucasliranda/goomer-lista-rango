import tsconfigPaths from 'vite-tsconfig-paths'; // only if you are using custom tsconfig paths
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8'
    }
  },
  plugins: [tsconfigPaths()],  // only if you are using custom tsconfig paths
});