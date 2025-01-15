const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: "all", // Разрешить все хосты (в том числе ngrok)
    server: {
      type: "https", // Настроить HTTPS через новую опцию
    },
  },
});
