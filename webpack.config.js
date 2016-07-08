const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const assets = ['ico', 'svg', 'jpg', 'json', 'html'].reduce((files, extension) => {
  return glob.sync(`src/**/*.${extension}`).reduce((files, file) => {
    if (/.component.html/.test(file)) return files;
    files.push({
      from: file,
      to: file.replace('src/', '')
    });
    return files;
  }, files)
}, [])

// Webpack Config
const webpackConfig = {
  entry: {
    'polyfills': './src/polyfills.browser.ts',
    'vendor':    './src/vendor.browser.ts',
    'main':      './src/main.browser.ts'
  },

  output: {
    path: './dist'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
    new CopyWebpackPlugin(assets)
  ],
  
  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.tsx', '.js', '.json']
  },
  
  module: {
    loaders: [
      // .ts files for TypeScript
      { test: /\.ts$/, loaders: ['ts-loader'] },
      { test: /\.tsx$/, loaders: ['ts-loader'] },
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, loaders: ['to-string-loader', 'css-loader', 'postcss-loader', 'less-loader'] },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.json$/, loader: 'json-loader' }

    ]
  },

  postcss: () => [autoprefixer, precss]
}


// Our Webpack Defaults
const defaultConfig = {
  devtool: 'cheap-module-source-map',
  cache: true,
  debug: true,
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          path.join(__dirname, 'node_modules', 'rxjs'),
          path.join(__dirname, 'node_modules', '@angular2-material'),
          path.join(__dirname, 'node_modules', '@angular')
        ]
      }
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
      path.join(__dirname, 'node_modules', 'angular2', 'bundles')
    ]
  },
  
  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },

  node: {
    global: 1,
    crypto: 'empty',
    module: 0,
    Buffer: 0,
    clearImmediate: 0,
    setImmediate: 0
  }
}

const webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
