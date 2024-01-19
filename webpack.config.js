import { realpathSync } from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve as _resolve } from 'path';
import process from 'process';

const appDirectory = realpathSync(process.cwd());

export const entry = _resolve(appDirectory, 'src/App.ts');
export const output = {
    filename: 'js/bundleName.js', //name for the js file that is created/compiled in memory
    clean: true,
};
export const resolve = {
    extensions: ['.tsx', '.ts', '.js'],
};
export const devServer = {
    host: '0.0.0.0',
    port: 8080, //port that we're using for local host (localhost:8080)
    static: _resolve(appDirectory, 'public'), //tells webpack to serve from the public folder
    hot: true,
    devMiddleware: {
        publicPath: '/',
    },
};
export const module = {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
    ],
};
export const plugins = [
    new HtmlWebpackPlugin({
        inject: true,
        template: _resolve(appDirectory, 'public/index.html'),
    }),
];
export const mode = 'development';
