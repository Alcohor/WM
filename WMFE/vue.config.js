const path  = require('path')

function resolve(url){
    return path.resolve(__dirname,url)
}

module.exports={
    devServer: {
        proxy: {
          '/maoyan': {
            target: 'https://m.maoyan.com/',
            changeOrigin: true,
            pathRewrite: {
              '^/maoyan': ''
            }
          },

          '/mz': {
            target: 'https://m.maizuo.com/',
            changeOrigin: true,
            pathRewrite: {
              '^/mz': ''
            }
          },
          '/bd': {
            target: 'https://api.map.baidu.com/',
            changeOrigin: true,
            pathRewrite: {
              '^/bd': ''
            }
          }
        }
      },
    chainWebpack(config){
        config
            .resolve
            .alias
            .set('@styles',resolve('src/stylesheets'))
            .set('@libs',resolve('src/libs'))
            .set('@c',resolve('src/components'))
            .set('@pages',resolve('src/pages'))
            .set('@utils',resolve('src/utils'))

    }
}