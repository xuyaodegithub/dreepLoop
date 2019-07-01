const webpack = require('webpack')
module.exports = {
    // publicPath: process.env.NODE_ENV === 'production'
    //     ? ''
    //     : '',
    outputDir:'dist',//打包生出的目录
    // assetsDir:'',//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    // indexPath:'',//指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    // productionSourceMap:'',//如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    // filenameHashing:'',//默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希
    devServer: {//代理
        proxy: {
            '/api': {
                target: 'http://47.111.168.199:8080/image2',
                ws: true,
                changeOrigin: true
            },
            '/foo': {
                target: 'http://47.111.168.199:8080/image2'
            }
        }
    },
    pages:{
        index: {
            // page 的入口
            entry: 'src/views/index/index.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '首页',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        loginOrRegister:{
            entry: 'src/views/login/login.js',
            template:'public/login.html',
            filename: 'login.html',
            title: '登录',
            chunks: ['chunk-vendors', 'chunk-common', 'loginOrRegister']
        },
        userCenter:{
            entry: 'src/views/userCenter/user.js',
            template:'public/userCenter.html',
            filename: 'userCenter.html',
            title: '我的',
            chunks: ['chunk-vendors', 'chunk-common', 'userCenter']
        },
        userVip:{
            entry: 'src/views/userVip/index.js',
            template:'public/userVip.html',
            filename: 'userVip.html',
            title: '会员中心',
            chunks: ['chunk-vendors', 'chunk-common', 'userVip']
        },
        resBackMsg:{
            entry: 'src/views/resBackMsg/index.js',
            template:'public/resRackMsg.html',
            filename: 'resBackMsg.html',
            title: '处理结果',
            chunks: ['chunk-vendors', 'chunk-common', 'resBackMsg']
        },
        changePass:{
            entry: 'src/views/changePassword/index.js',
            template:'public/changePass.html',
            filename: 'changePass.html',
            title: '修改密码',
            chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        },
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    },
}
