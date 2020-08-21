const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
    host: "0.0.0.0",
    useLocalIp: true,
  },
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./src/index.html"),
      chunks: ["main"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/assets/images/*", to: "assets/images", flatten: true },
      ],
    }),
  ],
  module: {
    rules: [
      // {
      //     test: /\.html$/,
      //     use : ['html-loader']
      // },
      {
        test: /\.js$/,
        exclude: /module_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
