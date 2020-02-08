const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ClosurePlugin = require("closure-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const common = require('./webpack-base.config')
const ROOT_PATH = process.cwd()
const merge = require('webpack-merge')

module.exports = merge(common, {
  mode: 'production',
    optimization: {
        minimizer: [
            new ClosurePlugin(
                { mode: "STANDARD" },
                {
                    // compiler flags here
                    //
                    // for debugging help, try these:
                    //
                    // formatting: 'PRETTY_PRINT',
                    // debug: true
                    // renaming: false
                }
            )
        ]
    },
    plugins: [
        // Delete everything from output-path (/dist) and report to user
        new CleanWebpackPlugin({
            root: ROOT_PATH,
            exclude: [],
            verbose: true,
            dry: false
        }),
        // Copy static assets
        new CopyWebpackPlugin([
            {
                from: "src/assets"
            }
        ]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name]-[hash].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                use: {
                    loader: "elm-webpack-loader",
                    options: {
                        optimize: true
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: [/elm-stuff/, /node_modules/],
                loaders: [MiniCssExtractPlugin.loader, "css-loader?url=false"]
            },
            {
                test: /\.scss$/,
                exclude: [/elm-stuff/, /node_modules/],
                loaders: [
                    MiniCssExtractPlugin.loader,
                    "css-loader?url=false",
                    "sass-loader"
                ]
            }
        ]
    }
});
