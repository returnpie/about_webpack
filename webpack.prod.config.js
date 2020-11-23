const path = require("path");
// minify js => terser-webpack-plugin
const TerserPlugin = require("terser-webpack-plugin");
// minify css => mini-css-extract-plugin, then style-loader => mini-css-extract-plugin.loader
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpacPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "hello-world": "./src/index.js",
    kiwi: "./src/kiwi.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "dist/",
    publicPath: "",
  },
  //   mode: "none | development | production",
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 5000,
      automaticNameDelimiter: "_",
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    index: "index.html",
    port: 9000,
    writeToDisk: true,
  },
  module: {
    rules: [
      //   {
      //     test: /\.(xml)$/,
      //     use: ["xml-loader"],
      //   },
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"],
      },
      //   {
      //     test: /\.css$/,
      //     use: ["style-loader", "css-loader"],
      //   },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      //   {
      //     test: /\.scss$/,
      //     // webpack loader => right to left
      //     use: ["style-loader", "css-loader", "sass-loader"],
      //   },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  plugins: [
    //  default production
    // new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpacPlugin({
      title: "Hello world",
      chunks: ["hello-world", "venders~hello-world~kiwi"],
      filename: "hello-world.html",
      meta: {
        description: "Some description",
      },
    }),
    new HtmlWebpacPlugin({
      title: "Kiwi",
      chunks: ["kiwi", "venders~hello-world~kiwi"],
      filename: "kiwi.html",
      meta: {
        description: "Some description",
      },
    }),
  ],
};
