const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['./src/client/app.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-blockly-component.js',
    libraryTarget: 'var',
    library: 'ReactBlocklyComponent',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: './public',
    filename: 'react-blockly-component.js',
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
};
