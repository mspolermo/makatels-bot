const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __HTML_PARSER_API__: JSON.stringify(
          "https://html-parser-tau.vercel.app/"
        ),
      }),
    ],
  },
  // devServer: {
  //   allowedHosts: "all", // Разрешить все хосты (в том числе ngrok)
  //   server: {
  //     type: "https", // Настроить HTTPS через новую опцию
  //   },
  // },
});
