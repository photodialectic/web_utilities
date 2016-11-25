var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack-build.config');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var server_port = 6121;

config.entry = [
  'webpack-dev-server/client?http://localhost:' + server_port,
  './static/src/index.jsx',
  './static/src/style.scss',
]

config.output = {
  path: __dirname + '/static/build',
  filename: 'index.js',
  cssFilename: 'style.css',
  publicPath: 'http://localhost:' + server_port + '/static/build/',
}

config.plugins = [
 new ExtractTextPlugin("./static/build/style.css", {
   allChunks: true
 })
]

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  progress: true,
  inline: true,
  historyApiFallback: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: {
    colors: true
  }
}).listen(server_port, 'localhost', function (err, result) {
  if (err) {
    console.log(err, result);
  }

  console.log('listening on http://localhost:' + server_port);
});
