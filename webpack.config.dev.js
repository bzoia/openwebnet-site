const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss', '.sass']
  },
  plugins: [
    /**
     * This is where the magic happens! You need this to enable Hot Module Replacement!
     */
    new webpack.HotModuleReplacementPlugin(),
    /**
     * NoErrorsPlugin prevents your webpack CLI from exiting with an error code if
     * there are errors during compiling - essentially, assets that include errors
     * will not be emitted. If you want your webpack to 'fail', you need to check out
     * the bail option.
     */
    new webpack.NoErrorsPlugin(),
    /**
     * DefinePlugin allows us to define free variables, in any webpack build, you can
     * use it to create separate builds with debug logging or adding global constants!
     * Here, we use it to specify a development build.
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    /**
     * TODO common
     */
    new HtmlWebpackPlugin({
      title: 'OpenWebNet',
      filename: 'index.html',
      template: 'index.template.html',
      favicon: path.join(__dirname, 'dist/favicon.ico')
    })
  ],
  module: {
    // use ! to chain loaders
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /styles/],
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
      },
      // inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
};
