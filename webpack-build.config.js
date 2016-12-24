var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
require('es6-promise/auto');

module.exports = {
  entry: [
    './static/src/index.jsx',
    './static/src/style.scss'
  ],
  output: {
   filename: './static/build/index.js',
   cssFilename: './static/build/style.css',
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
   new webpack.DefinePlugin({
     'process.env' : {
       NODE_ENV: JSON.stringify('production')
     }
   }),
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

