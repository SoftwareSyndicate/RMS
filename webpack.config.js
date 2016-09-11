var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var merge = require('webpack-merge');
require('es6-promise').polyfill();

var config = require('./config');
var CONFIG = merge(config.base, config[process.env.npm_package_config_branch] || {});

var PATH = './static';
if (process.env.NODE_ENV === 'production') {
  PATH = './public';
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: PATH,
    publicPath: '/',
    filename: 'build.js'
  },
  // plugins: [
  //   new CopyWebpackPlugin([
  //     { from: 'images' }
  //   ])
  // ],
  module: {
    // avoid webpack trying to shim process
    noParse: /es6-promise\.js$/,
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel',
        query: {
          compact: false
        }
      },
      {
        test   : /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'file-loader'
      }
    ]
  },
  vue: {
    loaders: {
      scss: 'vue-style!css!sass'
    }
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      components: 'src/components',
      base: 'src/components/base',
      pages: 'src/components/pages',
      filters: 'src/filters',
      libs: 'src/libs',
      models: 'src/models',
      services: 'src/services',
      styles: 'src/styles',
      'rms-models': 'src/models',
      'rms-services': 'src/services',
      'sbp-components': 'src/sbp/components'
    },
    extensions: ['', '.js', '.vue', '.scss']
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      'CONFIG': JSON.stringify(CONFIG)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      {from: 'images', to: 'images'},
      {from: 'manifest.json', to: 'manifest.json'},
    ]),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'CONFIG': JSON.stringify(CONFIG)
    })
  ]
}
