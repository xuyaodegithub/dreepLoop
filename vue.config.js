const webpack = require( 'webpack' );
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );//打包时，显示进度条插件
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//js压缩
const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const Timestamp = new Date().getTime();//时间戳，解决缓存问题
// const model=process.env.NODE_ENV==='production' || process.env.NODE_ENV==='devtest';
module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? 'http://47.111.168.199:8080' : 'http://47.111.168.199:8080',
    publicPath: './',
    outputDir: 'dist',//打包生出的目录
    productionSourceMap: false,
    // filenameHashing: false,    // 去掉文件名中的 hash
    lintOnSave: false,   // 取消 eslint 验证
    // assetsDir:'',//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    // indexPath:'',//指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    // productionSourceMap:'',//如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    // filenameHashing:'',//默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希
    css: {//有的时候你想要向 webpack 的预处理器 loader 传递选项。你可以使用 vue.config.js 中的 css.loaderOptions 选项。比如你可以这样向所有 Sass 样式传入共享的全局变量：
        loaderOptions: {
            // 给 sass-loader 传递选项
            scss: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: `@import "~@/style/initscss.scss";`
            }
        },
        // extract:model
    },

    devServer: {//代理
        port: process.env.PORT ? process.env.PORT : 8888,//端口号
        host: '0.0.0.0',
        // https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
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
    pages: {
        index: {
            entry: 'src/views/initIdx/index.js',
            template: 'public/init.html',
            filename: 'index.html',
            title: '首页',
            // chunks: ['chunk-vendors', 'chunk-common', 'loginOrRegister']
        },
        people: {
            // page 的入口
            entry: 'src/views/index/index.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'people.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '人物抠图',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        objects: {
            // page 的入口
            entry: 'src/views/indexTwo/index.js',
            // 模板来源
            template: 'public/objects.html',
            // 在 dist/index.html 的输出
            filename: 'objects.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '物体抠图',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        beautify: {
            entry: 'src/views/beautify/index.js',
            template: 'public/beautify.html',
            filename: 'beautify.html',
            title: '一键美化',
            // chunks: ['chunk-vendors', 'chunk-common', 'loginOrRegister']
        },
        intelligentRepair: {
            entry: 'src/views/intelligentRepair/index.js',
            template: 'public/intelligentRepair.html',
            filename: 'intelligentRepair.html',
            title: '照片修复',
            // chunks: ['chunk-vendors', 'chunk-common', 'loginOrRegister']
        },
        headCutout: {
            entry: 'src/views/headCutout/index.js',
            template: 'public/headCutout.html',
            filename: 'headCutout.html',
            title: '头像抠图',
            // chunks: ['chunk-vendors', 'chunk-common', 'loginOrRegister']
        },
        currency: {
            entry: 'src/views/currency/index.js',
            template: 'public/currency.html',
            filename: 'currency.html',
            title: '通用抠图',
            // chunks: ['chunk-vendors', 'chunk-common', 'loginOrRegister']
        },
        videoMatting: {
            entry: 'src/views/videoMatting/index.js',
            template: 'public/videoMatting.html',
            filename: 'videoMatting.html',
            title: '视频抠图',
            // chunks: ['chunk-vendors', 'chunk-common', 'loginOrRegister']
        },
        loginOrRegister: {
            entry: 'src/views/login/login.js',
            template: 'public/loginOrRegister.html',
            filename: 'loginOrRegister.html',
            title: '登录',
            // chunks: ['chunk-vendors', 'chunk-common', 'loginOrRegister']
        },
        register: {
            entry: 'src/views/register/index.js',
            template: 'public/register.html',
            filename: 'register.html',
            title: '注册',
            // chunks: ['chunk-vendors', 'chunk-common', 'loginOrRegister']
        },
        userCenter: {
            entry: 'src/views/userCenter/user.js',
            template: 'public/userCenter.html',
            filename: 'userCenter.html',
            title: '我的',
            // chunks: ['chunk-vendors', 'chunk-common', 'userCenter']
        },
        userVip: {
            entry: 'src/views/userVip/index.js',
            template: 'public/userVip.html',
            filename: 'userVip.html',
            title: '会员中心',
            // chunks: ['chunk-vendors', 'chunk-common', 'userVip']
        },
        resBackMsg: {
            entry: 'src/views/resBackMsg/index.js',
            template: 'public/resRackMsg.html',
            filename: 'resBackMsg.html',
            title: '处理结果',
            // chunks: ['chunk-vendors', 'chunk-common', 'resBackMsg']
        },
        changePass: {
            entry: 'src/views/changePassword/index.js',
            template: 'public/changePass.html',
            filename: 'changePass.html',
            title: '找回密码',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        },
        updataPass: {
            entry: 'src/views/updataPassword/index.js',
            template: 'public/updata.html',
            filename: 'updataPass.html',
            title: '修改密码',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        },
        cartoonImage: {
            entry: 'src/views/cartoonImage/index.js',
            template: 'public/cartoonImage.html',
            filename: 'cartoonImage.html',
            title: '一键卡通',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        },
        product: {
            entry: 'src/views/products/index.js',
            template: 'public/product.html',
            filename: 'product.html',
            title: 'picup.ai更多产品',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        },
        aboutUs: {
            entry: 'src/views/aboutUs/index.js',
            template: 'public/aboutUs.html',
            filename: 'aboutUs.html',
            title: '关于我们',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        }, videoPrice: {
            entry: 'src/views/userVip/videoPrice.js',
            template: 'public/videoPrice.html',
            filename: 'videoPrice.html',
            title: '视频价格',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        }, copyright: {
            entry: 'src/views/copyright/index.js',
            template: 'public/copyright.html',
            filename: 'copyright.html',
            title: '版权',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        }, editPictures: {
            entry: 'src/views/editPictures/index.js',
            template: 'public/editPictures.html',
            filename: 'editPictures.html',
            title: '图片编辑',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        }, downLoad: {
            entry: 'src/views/downLoad/index.js',
            template: 'public/downLoad.html',
            filename: 'downLoad.html',
            title: '桌面端下载',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        }, repairEdit: {
            entry: 'src/views/editPictures/repairEdit.js',
            template: 'public/repairEdit.html',
            filename: 'repairEdit.html',
            title: '图片修复',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        }, posterEditor: {
            entry: 'src/views/editPictures/posterEditor.js',
            template: 'public/posterEditor.html',
            filename: 'posterEditor.html',
            title: '海报设计',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        }, transitionPage: {
            entry: 'src/views/index/transitionPage.js',
            template: 'public/transitionPage.html',
            filename: 'transitionPage.html',
            title: '一键抠图',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        }, apis: {
            entry: 'src/views/index/apis.js',
            template: 'public/apis.html',
            filename: 'apis.html',
            title: 'apis',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        }, servicePrivacy: {
            entry: 'src/views/index/servicePrivacy.js',
            template: 'public/servicePrivacy.html',
            filename: 'servicePrivacy.html',
            title: '服务与隐私',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        }, idPhoto: {
            entry: 'src/views/idPhoto/index.js',
            template: 'public/idPhoto.html',
            filename: 'idPhoto.html',
            title: '证件照',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        },batchPhoto: {
            entry: 'src/views/idPhoto/batchPhoto.js',
            template: 'public/batchPhoto.html',
            filename: 'batchPhoto.html',
            title: '批量证件照',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        }, idPhotoEdit: {
            entry: 'src/views/editPictures/idPhotoEdit.js',
            template: 'public/idPhotoEdit.html',
            filename: 'idPhotoEdit.html',
            title: '证件照编辑器',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        }, imagePhoto: {
            entry: 'src/views/idPhoto/image.js',
            template: 'public/imagePhoto.html',
            filename: 'imagePhoto.html',
            title: '形象照',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        }, imagePhotoEdit: {
            entry: 'src/views/editPictures/imagePhotoEdit.js',
            template: 'public/imagePhotoEdit.html',
            filename: 'imagePhotoEdit.html',
            title: '形象照编辑器',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        }, onlineImage: {
            entry: 'src/views/idPhoto/onlineImage.js',
            template: 'public/onlineImage.html',
            filename: 'onlineImage.html',
            title: '电商白底图',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        }, onlineImageEdit: {
            entry: 'src/views/editPictures/onlineImageEdit.js',
            template: 'public/onlineImageEdit.html',
            filename: 'onlineImageEdit.html',
            title: '电商白底图编辑器',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        },uploadBymobile: {
            entry: 'src/views/userVip/uploadBymobile.js',
            template: 'public/uploadBymobile.html',
            filename: 'uploadBymobile.html',
            title: '手机上传图片',
            // chunks: ['chunk-vendors', 'chunk-common', 'changePass']
        },
    },
    // chainWebpack: config => {
    //     config.resolve.alias
    //         .set("@", resolve("src"))
    //         .set("assets", resolve("src/assets"))
    //         .set("components", resolve("src/components"))
    // },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin( {
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            } ),
            new ProgressBarPlugin(),
            // new HtmlWebpackPlugin({
            //     template: './public/index.html',
            //     inject: true,
            //     favicon:  path.join(__dirname,'./public/favicon.ico'),
            //     minify: {
            //         removeComments: true,
            //         collapseWhitespace: true,
            //         removeAttributeQuotes: true
            //         // more options:
            //         // https://github.com/kangax/html-minifier#options-quick-reference
            //     },
            //chunks:item.name,
            //     // default sort mode uses toposort which cannot handle cyclic deps
            //     // in certain cases, and in webpack 4, chunk order in HTML doesn't
            //     // matter anyway
            // }),
            // new UglifyJsPlugin()
        ],
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            filename: `js/[name].${Timestamp}.js`,
            chunkFilename: `js/[name].${Timestamp}.js`
        },
        // resolve: {//设置路径别名
        //     alias: {
        //         'assets': '@/assets',
        //         'components': '@/components',
        //         'views': '@/views',
        //     }
        // },
    },
    // pwa: {//配置网页小图标
    //     iconPaths: {
    //         favicon32: './plug_jchLogo.png',
    //         favicon16: './plug_jchLogo.png',
    //         appleTouchIcon: './plug_jchLogo.png',
    //         maskIcon: './plug_jchLogo.png',
    //         msTileImage: './plug_jchLogo.png'
    //     }
    // }
    // configureWebpack: config => {//如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象：
    //     if (process.env.NODE_ENV === 'production') {
    //         // 为生产环境修改配置...
    //     } else {
    //         // 为开发环境修改配置...
    //     }
    // }
}
