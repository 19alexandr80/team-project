const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpakPlugin = require("copy-webpack-plugin");
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  devServer: {
    port: 8077,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template: "./src/index.html",
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new CopyWebpakPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, "./src/partials/costom.html"),
      location: "costom",
    }),
  ],
};
