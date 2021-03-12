const path = require('path')
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg|ttf|eot|woff|woff2)(\?.*)?$/i
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// let {
//   version
// } = require('./package.json')
// version = version.replace(/\./g, '_')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  lintOnSave: process.env.NODE_ENV === 'development',
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的目录
  productionSourceMap: false,
  runtimeCompiler: true,
  outputDir: 'official-car', // 构建时的输出目录
  chainWebpack: config => {
    config.resolve.alias // // 添加别名
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
    config.resolve.symlinks(true)
  },
  devServer: {
    port: '6991', // 指定要监听请求的端口号
    proxy: {
      '/': { // 配置跨域处理 可以设置多个
        // target: 'http://192.168.0.56:8080/carmon/'
        // target: 'http://192.168.0.252:8080/ht/'
        // target: 'http://ycya.f3322.net:10000/ht/'
        target: 'http://ycya.f3322.net:6991/ht'
        // target: 'http://cl.4b.cn:6974/gwc/'
        //     // target: 'http://47.108.14.185:6979/xinyang/service/', // 信阳
        //     // target: 'http://47.108.14.185:6980/gchb2.5/service/',
        //     // target: 'http://47.108.14.185:6979/gchb2.5/service/', // 阳光郎洁
        //     // target: 'http://218.29.42.152:6978/gchb2.5/service/', // 新濮阳
        // target: 'http://gchb.online/gchb2.5/service/'// 国策
        //     // target: 'http://182.61.47.152:8081/gchb2.5/service/', // 中六投
        //     // target: 'http://183.223.236.65:9000/gchb2.5/service/', // 眉山
        //     // target: 'http://183.230.92.198:6979/gchb2.5/service/', // 新洪泉
        //     // target: 'http://47.108.14.185:6977/gchb2.5/service/', // 三创
        //     // target: 'http://47.108.14.185:6978/gchb2.5/service/', // 武侯城管局
        //     ws: false // 是否启用websoket
      }
    },
    host: '192.168.0.147' // 例如,如果想让局域网内的其他用户访问自己的设备，可以将host配置为自己本机的IP地址
  }
}
