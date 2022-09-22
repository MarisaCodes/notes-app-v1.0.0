const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  target: "electron-renderer",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "src")],
        use: "ts-loader",
      },
    ],
  },
  output: {
    publicPath: "public",
    filename: "index.js",
    path: path.resolve(__dirname, "public"),
  },
};
