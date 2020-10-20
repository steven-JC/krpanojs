require('colors')

process.env.NODE_ENV = 'production'

const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.build')
const child_process = require('child_process')

console.log(process.env.NODE_ENV)

console.log(`正在构建项目`)
webpack(config, function(err, stats) {
    if (!err) {
        console.log(`成功构建`.green)
    } else {
        throw err
    }
    child_process.exec(`rm -rf ${path.join(__dirname, '../tmp')}`)
})
