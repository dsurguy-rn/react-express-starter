const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const inDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: (inDevelopment ? ['webpack-hot-middleware/client?reload=true'] : [])
  .concat([
    './client/index.js'
  ]),
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /.css$/,
      use: [
        { loader: inDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader },
        { loader: 'fast-css-loader' }
      ]
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader'
        }
      ]
    }],
  },
  output: {
    path: path.resolve(__dirname, 'client-dist'),
    filename: 'bundle.js'
  },
  mode: inDevelopment ? 'development' : 'production',
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, 'client-dist')),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(),
  ].concat(inDevelopment ? [] : [new MiniCssExtractPlugin()]),
  resolve: {
    //If you don't want to use preact, remove this chunk
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      // Not necessary unless you consume a module using `createClass`
      'create-react-class': 'preact-compat/lib/create-react-class',
      // Not necessary unless you consume a module requiring `react-dom-factories`
      'react-dom-factories': 'preact-compat/lib/react-dom-factories'
    }
  }
};