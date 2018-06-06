const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  entry: { 
    app: './client/index.js'
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: { 
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'public')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'eval-source-map',
  plugins: [
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({
      title: 'React + Express Starter App',
      template: path.resolve(__dirname, 'client/index.html')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': process.env.NODE_ENV
    })
  ]
}

if( process.env.NODE_ENV == 'production' ){
  webpackConfig.plugins.push(new UglifyJSPlugin({
    sourceMap: false
  }))
}

module.exports = webpackConfig