module.exports = {
    publicPath: './',
    assetsDir: 'static',
    outputDir: 'coastGuard',
    productionSourceMap: false,
    devServer: {
        port: 10015, //开发环境端口号
        https: false //传输协议
        // proxy: {
        //     '/api':{
        //         target:'http://jsonplaceholder.typicode.com',
        //         changeOrigin:true,
        //         pathRewrite:{
        //             '/api':''
        //         }
        //     }
        // }
    },
    lintOnSave: false, //process.env.NODE_ENV !== 'production', //在生产环境时开启eslint-loader(代码格式检查)
    configureWebpack: config => {
        //在生产环境时去掉全部的console
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
        }


    },
    //警告 webpack 的性能提示
    configureWebpack: {
        performance: {
            hints: 'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000,
            //生成文件的最大体积 整数类型（以字节为单位 300k）
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    }
};