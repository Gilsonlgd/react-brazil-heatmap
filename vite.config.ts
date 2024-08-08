import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import libcss from "vite-plugin-libcss";

export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true }), libcss()],
  build: {
    lib: {
      entry: "src/index.tsx",
      name: "react-brazil-heatmap",
      fileName: (format) => `react-brazil-heatmap.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "react-dom/server"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});
