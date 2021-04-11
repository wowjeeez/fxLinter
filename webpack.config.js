const webpack = require("webpack");
const path = require("path");
const RemovePlugin = require("remove-files-webpack-plugin");

const buildPath = path.resolve(__dirname, "dist");

const server = {
    entry: "./src/core.ts",
    module: {
        rules: [{
            test: /\.ts$/,
            use: ["ts-loader"],
            exclude: /node_modules|cli\.ts/,
        }, ],
    },
    plugins: [
        new webpack.DefinePlugin({ "global.GENTLY": false }),
        new RemovePlugin({
            before: {
                include: [path.resolve(buildPath, "src")],
            },
            watch: {
                include: [path.resolve(buildPath, "src")],
            },
        }),
    ],
    optimization: {
        minimize: true,
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        filename: "server.js",
        path: path.resolve(buildPath, "src"),
    },
    target: "node",
};


module.exports = [server];