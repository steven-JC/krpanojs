require('colors')
const path = require('path')
const pkg = require('../package.json')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: {
        index: path.join(__dirname, '../src/index.ts')
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
                            transpileOnly: true
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
                exclude: [/node_modules/]
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
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '',
        filename: `[name].js`,
        library: pkg.name,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    plugins: [
        new CopyWebpackPlugin([
            {
                context: 'tmp/src',
                from: '**/*.d.ts',
                to: 'types/',
                force: true
            }
        ])
    ],

    resolve: {
        alias: {
            '@': path.join(__dirname, '../src')
        },
        extensions: ['.js', '.ts', '.json']
    },

    devtool: isProd ? false : '#cheap-module-eval-source-map',
    target: 'web'
}
