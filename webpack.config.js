const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
module.exports = (env) => {

    return {
        entry: "./src/index.tsx",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js",
            publicPath: "/",
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        devServer: {
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.(t|j)sx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "ts-loader",
                    },
                },
                {
                    test: /\.html$/,
                    use: {
                        loader: "html-loader",
                    },
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                filename: "./index.html",
            }),
            new MiniCssExtractPlugin({
                filename: "styles/[name].css",
            }),
            new webpack.DefinePlugin({
                process: JSON.stringify({
                    env: {
                        ...env,
                        API: env.API,
                    },
                }),
            })
        ],
    };
}