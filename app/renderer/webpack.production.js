const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  target: 'electron-renderer',
  entry: {
    app: [
      './src/index',
    ],
  },
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
    sourceMapFilename: '[name].map'
  },
  module: {
    loaders: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader', exclude: /node_modules/ },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJSPlugin({
      sourceMap: true
    })
  ],
};
