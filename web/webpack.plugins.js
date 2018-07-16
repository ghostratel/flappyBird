const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
// 消除冗余的css
const PurifyCssWebpack = require('purifycss-webpack')
// html模板
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 清除目录等
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 4.x之前用以压缩
// const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
// 分离css
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 静态资源输出
// const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = [
  new webpack.HotModuleReplacementPlugin(),
  // 调用之前先清除
  new CleanWebpackPlugin(['dist']),
  // 4.x之前可用uglifyjs-webpack-plugin用以压缩文件，4.x可用--mode更改模式为production来压缩文件
  // new uglifyjsWebpackPlugin(),
  // new CopyWebpackPlugin([{
  //   from: path.resolve(__dirname, 'src/assets'),
  //   to: './pulic'
  // }]),
  // 分离css插件参数为提取出去的路径
  new ExtractTextPlugin('css/[name].css'),
  // 消除冗余的css代码
  new PurifyCssWebpack({
    // glob为扫描模块，使用其同步方法
    paths: glob.sync(path.join(__dirname, 'src/*.html'))
  }),
  // 全局暴露统一入口
  // new webpack.ProvidePlugin({
  //   $: 'jquery'
  // }),
  // 自动生成html模板
  new HTMLWebpackPlugin({
    filename: 'index.html',
    title: 'index',
    chunks: ['index'], // 按需引入对应名字的js文件
    template: './src/index.html',
    hash: true
  })
]
