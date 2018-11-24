var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


module.exports = {
  entry: ['babel-polyfill', './bin/lingYunJunShiWebServer.js'],
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'lingYunJunShiWebServer.js'
  },
  module: {
      rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
          }
      ]
  },
  externals: nodeModules
}