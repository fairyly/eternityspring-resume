var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        bundle:[
            'webpack/hot/only-dev-server',
            "./src/js/entry.js",
        ]
    },
    output: {
        path: path.join(__dirname ,'dist'),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.html$/,
                loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
            favicon:'./src/favicon.ico', //favicon路径
            filename:'./index.html',    //生成的html存放路径，相对于 path
            template:'./src/index.html',    //html模板路径
            inject:true,    //允许插件修改哪些内容，包括head与body
            // hash:true,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true    //删除空白符与换行符
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require']
        })
    ],
    devServer: {
        proxy: {
            '/dist': {
                target: 'localhost',
                secure: false
            }
        },
        hot: true,
        outputPath:'/dist'
    }
};