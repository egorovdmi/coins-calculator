var webpack = require('webpack');

module.exports = {
    entry: './app/app.entry',
    output: {
        filename: './build/app.js'
    },
    module: {
        rules: [
            // Handle JavaScript (ES6)
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    'babel-loader',
                    'angular2-template-loader'
                ]
            },
            // Handle HTML included in angular templates
            {
                test: /\.html$/,
                exclude: /(node_modules)/,
                use: [
                    'raw-loader',
                    'html-minify-loader'
                ]
            },
            // Handle LESS included in angular templates
            {
                test: /\.less$/,
                exclude: /(node_modules)/,
                use: [
                    'to-string-loader', // creates style nodes from JS strings
                    'css-loader',       // translates CSS into CommonJS
                    'less-loader'       // compiles Less to CSS
                ]
            },
            // Handle CSS
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: [
                    'style-loader',     // adds CSS to the DOM by injecting a <style> tag
                    'css-loader'        // translates CSS into CommonJS
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                'html-minify-loader': {
                    quotes: true,
                    empty: true,
                    dom: { lowerCaseAttributeNames: false }
                }
            }
        })
    ]
};