const path = require('path');

module.exports = {
  entry: {
    bundle: './js/main.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js'),
    publicPath: "/js",
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ],
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
};