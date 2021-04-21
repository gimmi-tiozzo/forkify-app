const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = "./src/";

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        App: path.join(__dirname, srcDir + "App.ts"),
    },
    output: {
        path: path.join(__dirname, "./dist/js"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: "..", context: "public" }],
            options: {},
        }),
    ],
};
