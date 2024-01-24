const fs = require('fs');
const { realpathSync } = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve: _resolve } = require('path');
const process = require('process');

const appDirectory = realpathSync(process.cwd());
const devtool = 'source-map';

const entry = _resolve(appDirectory, 'src/App.ts');
const output = {
    filename: 'js/bundleName.js',
    clean: true,
};
const resolve = {
    extensions: ['.tsx', '.ts', '.js'],
};
const devServer = {
    host: '0.0.0.0',
    port: process.env.HTTPS ? 8443 : 8080,
    static: _resolve(appDirectory, 'public'),
    hot: true,
    devMiddleware: {
        publicPath: '/',
    },
    https: process.env.HTTPS
        ? {
              key: fs.readFileSync(_resolve(appDirectory, 'key.pem')),
              cert: fs.readFileSync(_resolve(appDirectory, 'cert.pem')),
          }
        : false,
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
    devtool,
};
