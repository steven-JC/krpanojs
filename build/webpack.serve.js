const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: path.join(__dirname, '../demo/index.ts')
    },
    output: {
        publicPath: '',
        path: path.join(__dirname, '../dist'),
        filename: '[name].js?[hash:8]'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'ts-loader',
                        query: {
                            // appendTsSuffixTo: [/.vue$/]
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'cache-loader'
                    },
                    'babel-loader'
                ],
                exclude: /node_modules/
            },

            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg|mp3|mp4)$/,
                loader: 'url-loader?limit=1000',
                options: {
                    limit: 10000,
                    name: 'assets/[name].[ext]?[hash:8]'
                }
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: `demo/index.html`,
            inject: 'body',
            chunks: ['index'],
            showErrors: true,
            cache: false,
            filename: `index.html`
        })
    ],

    resolve: {
        alias: {
            '@': path.join(__dirname, '../src')
        },
        extensions: ['.js', '.ts', '.json']
    },

    devtool: '#cheap-module-eval-source-map',
    target: 'web',
    devServer: {
        contentBase: path.resolve(__dirname, '../'),
        port: 8111
    }
}
