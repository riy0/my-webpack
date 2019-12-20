const webpack = require("webpack");
const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");

let config = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "output.js"
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".json",
      ".scss",
      ".css",
      ".jpeg",
      ".jpg",
      ".gif",
      ".png"
    ],
    alias: {
      images: path.resolve(__dirname, "src/assets/images/")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: ["css-hot-loader"].concat(
          ExtractTextWebpackPlugin.extract({
            use: ["css-loader", "sass-loader", "postcss-loader"],
            fallback: "style-loader"
          })
        )
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)#/i,
        loaders: [
          "file-loader?context=src/assets/images/&name=images/&name=images/[path][name].[ext]",
          {
            loader: "image-webpack-loader",
            query: {
              mozjpeg: {
                progressive: true
              },
              gigsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 4
              },
              pngquant: {
                quality: "75-90",
                speed: 3
              }
            }
          }
        ],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin("styles.css"),
    webpack.optimize.UglifyJsPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./public/"),
    historyApiFallback: true,
    inline: true,
    open: true
  },
  devtool: "eval-source-map"
};

module.exports = config;

if (process.env.NODE_EMV === "production") {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeCSSAssets()
  );
}
