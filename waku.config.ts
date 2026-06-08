import babel from '@rolldown/plugin-babel';
import stylex from '@stylexjs/unplugin';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'waku/config';

export default defineConfig({
  basePath: '/timer-demo/',
  vite: {
    build: {
      rollupOptions: {
        external: ['virtual:stylex:runtime'],
      },
    },
    plugins: [
      stylex.vite({
        useCSSLayers: true,
        devMode: 'css-only',
        devPersistToDisk: true,
        runtimeInjection: false,
      }),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
  },
});
