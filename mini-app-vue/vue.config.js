const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  define: {
    __HTML_PARSER_API__: JSON.stringify("https://html-parser-tau.vercel.app/"),
  },
  devServer: {
    allowedHosts: "all", // Разрешить все хосты (в том числе ngrok)
    server: {
      type: "https", // Настроить HTTPS через новую опцию
    },
  },
});
