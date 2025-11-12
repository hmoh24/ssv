const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: false, // no source maps or you can use 'source-map' if you want
  // add production-specific optimizations here if needed
});
