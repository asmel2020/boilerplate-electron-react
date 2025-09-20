import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routes/routeTree.gen.ts",
      autoCodeSplitting: false,
      routeFileIgnorePrefix: "-",
      routeFileIgnorePattern: [
        "^~",
        "@react-refresh",
        "/vite/client",
        "\\.mjs$",
      ].join("|"),
    }),
    react(),
    electron({
      main: {
        entry: "electron/main.ts",
        vite: {
          build: {
            rollupOptions: {
              // 👇 Evita que Prisma se bundlee en el main
              external: [
                "@prisma/client",
                ".prisma/client",
                "@libsql/client",
                "@libsql/windows-x64-msvc", // 👈 importante
                "@libsql/linux-x64-gnu",
                "@libsql/darwin-x64",
                "@libsql/darwin-arm64",
              ],
            },
          },
        },
      },
      preload: {
        input: path.join(__dirname, "electron/preload.ts"),
      },
      renderer: process.env.NODE_ENV === "test" ? undefined : {},
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].cjs`,
      },
    },
  },
  optimizeDeps: {
    // 👇 Evita que Vite intente prebundlear Prisma en desarrollo
    exclude: ["@prisma/client", ".prisma/client"],
  },
});
