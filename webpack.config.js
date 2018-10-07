const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const production = process.env.NODE_ENV === 'production';

module.exports = {
    mode: "development",
    entry: "./index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }      
            }
        ]
    },
    plugins: 
        "@babel/plugin-proposal-class-properties",
    resolve: {
        modules: [`${__dirname}/node_modules/`]
    }
}
