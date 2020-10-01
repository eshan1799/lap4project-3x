const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // the main JavaScript file of the app/project
  output: {
    // instructions for compiling the code
    path: path.resolve("dist"), // the file where the compiled code should go
    filename: "bundle.js", // the file name of the compiled code
    publicPath: "/", // redirect incoming requests to '/'
  },
  devtool: "source-maps", // a tool to find errors in the compiled code, but show them against the source code for easier debugging
  module: {
    // modules/helpers we want Webpack to use
    rules: [
      // instructions for the modules/helpers
      { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ }, // transpile JSX files
      { test: /\.css$/, loader: ["style-loader", "css-loader"] }, // transpile css files
      {
        test: /\.s(a|c)ss$/,
        loader: ["style-loader", "css-loader"],
      }, // transpile sass/scss files
    ],
  },
  devServer: {
    // instructions for the development server
    contentBase: path.resolve("src"), // location of the source code
    hot: true, // refresh the browser when changes are saved
    open: true, // open the app/project in the browser when the server starts
    port: 8000, // use this port for the server
    historyApiFallback: true, //serve a previous page on a 404 error
    watchContentBase: true, // watch for changes to static files
  },
  plugins: [
    // plugins we are using
    new webpack.HotModuleReplacementPlugin(), // update changed modules without page reload
    new HtmlWebpackPlugin({
      // add JavaScript code to the HTML
      template: "public/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
};
