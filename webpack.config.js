const { realpathSync } = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve: _resolve } = require('path');
const process = require('process');

const appDirectory = realpathSync(process.cwd());

const entry = _resolve(appDirectory, 'src/App.ts');
const output = {
    filename: 'js/bundleName.js', //name for the js file that is created/compiled in memory
    clean: true,
};
const resolve = {
    extensions: ['.tsx', '.ts', '.js'],
};
const devServer = {
    host: '0.0.0.0',
    port: 8080, //port that we're using for local host (localhost:8080)
    static: _resolve(appDirectory, 'public'), //tells webpack to serve from the public folder
    hot: true,
    devMiddleware: {
        publicPath: '/',
    },
};
const moduleRules = {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
    ],
};
const plugins = [
    new HtmlWebpackPlugin({
        inject: true,
        template: _resolve(appDirectory, 'public/index.html'),
    }),
];
const mode = 'development';

module.exports = {
    entry,
    output,
    resolve,
    devServer,
    module: moduleRules,
    plugins,
    mode,
};
