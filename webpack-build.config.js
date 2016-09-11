var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Promise = require('es6-promise').Promise; //polyfill for old node versions
var webpack = require('webpack');

module.exports = {
  entry: [
    './static/src/main.js',
    './static/src/style.scss'
  ],
  output: {
   filename: './static/build/main.js',
   cssFilename: './static/build/style.css',
  },
  resolve: {
    modulesDirectories: ['node_modules', 'web_modules', 'static/src']
  },
  module: {
   loaders: [
     {
       test: /\.html$/,
       loader: 'mustache'
     },
     {
       test: /\.scss$/,
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
 },
}

