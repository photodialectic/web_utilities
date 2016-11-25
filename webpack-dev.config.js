var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
require('es6-promise/auto');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:6121',
    './static/src/index.jsx',
    './static/src/style.scss'
  ],
  output: {
    path: __dirname + '/static/build',
    filename: './static/build/app.bundle.js',
    cssFilename: './static/build/style.css',
    publicPath: 'http://static-dev.runtweak.com/',
  },
  resolve: {
    modulesDirectories: ['node_modules', 'web_modules', 'static/src']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel', 'babel?presets[]=es2015&presets[]=react'],
        exclude: /node_modules/,
        include: path.join(__dirname, 'static/src')
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("./static/build/style.css", {
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        keep_fnames: true,
        warnings: false
      },
      mangle: true,
      output: {
        comments: false
      }
    })
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./node_modules/sass-loader")],
  }
}
