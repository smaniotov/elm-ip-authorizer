const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MODE =
    process.env.npm_lifecycle_event === "prod" ? "production" : "development";
const withDebug = !process.env["npm_config_nodebug"] && MODE == "development";
console.log('\x1b[36m%s\x1b[0m', `** elm-webpack-starter: mode "${MODE}", withDebug: ${withDebug}\n`);

const ROOT_PATH = process.cwd()

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(ROOT_PATH, "dist"),
        publicPath: "/",
        // FIXME webpack -p automatically adds hash when building for production
        filename: MODE == "production" ? "[name]-[hash].js" : "index.js"
    },
    plugins: [
        new HTMLWebpackPlugin({
            // Use this template to get basic responsive meta tags
            template: "src/index.html",
            // inject details of output file at end of body
            inject: "body"
        })
    ],
    resolve: {
        modules: [path.join(ROOT_PATH, "src"), "node_modules"],
        extensions: [".js", ".elm", ".scss", ".png"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                exclude: [/elm-stuff/, /node_modules/],
                // see https://github.com/webpack-contrib/css-loader#url
                loaders: ["style-loader", "css-loader?url=false", "sass-loader"]
            },
            {
                test: /\.css$/,
                exclude: [/elm-stuff/, /node_modules/],
                loaders: ["style-loader", "css-loader?url=false"]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: [/elm-stuff/, /node_modules/],
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: "application/font-woff"
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: [/elm-stuff/, /node_modules/],
                loader: "file-loader"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: [/elm-stuff/, /node_modules/],
                loader: "file-loader"
            }
        ]
    }
};
