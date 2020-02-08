const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require('./webpack-base.config')
const ROOT_PATH = process.cwd()
const path = require('path')

module.exports = merge(common, {
  mode: 'development',
  plugins: [
      // Suggested for hot-loading
      new webpack.NamedModulesPlugin(),
      // Prevents compilation errors causing the hot loader to lose state
      new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
      rules: [
          {
              test: /\.elm$/,
              exclude: [/elm-stuff/, /node_modules/],
              use: [
                  { loader: "elm-hot-webpack-loader" },
                  {
                      loader: "elm-webpack-loader",
                      options: {
                          // add Elm's debug overlay to output
                          debug: true,
                          //
                          forceWatch: true
                      }
                  }
              ]
          }
      ]
  },
  devServer: {
      inline: true,
      stats: "errors-only",
      disableHostCheck: true,
      contentBase: path.join(ROOT_PATH, "src/assets"),
      historyApiFallback: true,
      port: 8000,
      before(app) {
          // on port 3000
          app.get("/test", function(req, res) {
              res.json({ result: "OK" });
          });
      }
  }
});