const path = require(`path`);


module.exports = {
  mode: `development`,
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname, `public`),
  },
  devServer: {
    contentBase: path.resolve(__dirname, `public`),
    port: 31337,
    historyApiFallback: true,
    // host: `0.0.0.0`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
    ],
  },
  devtool: `source-map`,
};
