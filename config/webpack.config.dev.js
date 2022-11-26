const path = require("path");
const {merge} = require("webpack-merge");
const baseConfig = require("./webpack.config.base.js");

const devConfig = {
  mode: "development",
  entry: path.join(__dirname, "../example/src/app.js"),
  output: {
    path: path.join(__dirname, "../example/src"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.min\.css$/,
        use: [
          "style-loader",
          {
            loader : "css-loader",
            // options: {
            //   importLoaders: 1,
            //   modules: {
            //     localIdentName: "[path][name]__[local]--[hash:base64:5]",
            //   },
            // }
          }
        ],
      },
      {
        test: /\.min\.css$/,
        use: [
          "style-loader",
          "css-loader"
          
        ],
      },
      
    ],
  },
  devServer: {
    static: {directory: path.join(__dirname, "../example/src")},
    compress: true,
    host: '127.0.0.1',
    port: 3001,
    open: true
  }
};

module.exports = merge(devConfig, baseConfig);
