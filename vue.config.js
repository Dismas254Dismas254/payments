const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "https://www.bancodominicanobhd.com/",
        changeOrigin: true,
        pathRewrite: { "^/api": "" }, // Strip `/api` prefix
        secure: false, // Use HTTPS
      },
    },
  },
});
