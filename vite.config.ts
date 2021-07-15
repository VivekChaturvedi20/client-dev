import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import eslint from '@rollup/plugin-eslint';

// For more details: https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        { ...eslint({ include: 'src/**/*.+(js|jsx|ts|tsx)' }), enforce: 'pre' },
        reactRefresh()
    ],
    base: '/clients/'
});
