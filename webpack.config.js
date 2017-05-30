var fs = require("fs");
var path = require("path");
var webpack = require("webpack");

var config = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".js"]
  },

  entry: "./src/index.ts",

  output: {
    filename: "cli/index.js"
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader",
        include: [
          path.resolve('./src')
        ]
      }
    ]
  }
};

module.exports = config;
