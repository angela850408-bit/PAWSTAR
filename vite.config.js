// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: `@use "/src/assets/styles/_variables.scss" as *;`,
//       },
//     },
//   },
// });

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  // build: {
  //   cssMinify: "esbuild",
  // },

  resolve: {
    alias: {
      //  @ 就去尋找 src 資料夾的絕對路徑
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/assets/styles/_variables.scss" as *;`,
      },
    },
  },
});
