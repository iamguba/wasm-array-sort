const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "bootstrap.js",
  },
  mode: "production",
  plugins: [
    new CopyWebpackPlugin({
      patterns: ["index.html", "style.css"],
    }),
  ],
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
  },
};
