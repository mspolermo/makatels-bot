const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    allowedHosts: "all",  // Разрешить все хосты (в том числе ngrok)
    client: {
      webSocketURL: {
        protocol: "wss",  // Использовать защищённый WebSocket
        hostname: "388f-185-157-214-111.ngrok-free.app", // Ваш домен ngrok
        port: 443,  // Порт HTTPS
      },
    },
    https: true,  // Включить HTTPS
  },
});
