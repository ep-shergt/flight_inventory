var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugins = require("extract-text-webpack-plugin");
 
var DEV = path.resolve(__dirname, "dev");
var STYLUS = path.resolve(__dirname, "stylus");
var OUTPUT = path.resolve(__dirname, "build");
 
var config = {
  entry: DEV + "/index.jsx",
  output: {
    path: OUTPUT,
    filename: "build.js",
    library: 'Flight_Inventory',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  watch: true,
  module: {
    loaders: [{
        include: DEV,
        loader: "babel-loader",
    },
    { 
      test: /\.styl$/, 
      loader: 'style-loader!css-loader!stylus-loader'
    },
    { 
      test: /\.css$/, 
      loader: 'style-loader!css-loader'
    },
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
 
module.exports = config;