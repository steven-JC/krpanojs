require('colors')

process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const config = require('./webpack.build')
Promise.all([start('component build succeed!', config)]).catch((err) => {
    console.error(err)
})

function start(target, webpackConf) {
    return new Promise((resolve, reject) => {
        const compiler = webpack(webpackConf)
        compiler.hooks.afterEmit.tapAsync('after-emit', (compilation, done) => {
            const date = new Date()
            console.log(
                `${target} is OK! ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                    .green
            )
            done()
        })

        compiler.watch({}, (err, stats) => {
            if (err) {
                console.log(err)
                return
            }

            stats.compilation.errors.forEach((item) => {
                console.log(item.message)
            })
            resolve()
        })
    })
}
