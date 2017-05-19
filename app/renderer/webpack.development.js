const webpack = require('webpack');
const path = require('path');

module.exports = {
  target: 'electron-renderer',
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index',
    ],
  },
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
			{ test: /\.js$/, loader: 'react-hot-loader/webpack!babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'react-hot-loader/webpack!babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
};
