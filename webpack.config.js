const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ENV = process.env.NODE_ENV || 'development';


// Base
let webpackConfig = {
  entry: './src/index.js',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.json$/,
        type: 'json',
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: {
          and: [
            /node_modules/,
            /profiles/,
          ]
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
    ]
  },
  output: {
    library: 'tableschema',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
  ],
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer"),
      "stream": require.resolve("stream-browserify"),
      "fs": require.resolve("fs"),
    }
  },
  target: "node"
}


// Development
if (ENV === 'development') {
  webpackConfig = merge(webpackConfig, {
    output: {
      filename: 'tableschema.js',
      path: path.resolve(__dirname, './dist'),
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ],
    stats: {
      loggingDebug: ["babel-loader"]
    },
  });
}


// Production
if (ENV === 'production') {
  webpackConfig = merge(webpackConfig, {
    output: {
      filename: 'tableschema.min.js',
      path: path.resolve(__dirname, './dist'),
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compressor: {
          screw_ie8: true,
          warnings: false,
        }
      })
    ]
  });
}

module.exports = webpackConfig;
