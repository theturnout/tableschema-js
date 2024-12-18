const webpack = require('webpack');

// Base
module.exports = {
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
            cacheDirectory: true,
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
