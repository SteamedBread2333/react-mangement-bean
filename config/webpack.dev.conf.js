'use strict'
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const path = require('path');
const webpack = require('webpack');
// 引入mock.js
const Mock = require('../mock/mock.js');

module.exports = merge(baseWebpackConfig, {
  // 模式
  mode: "development",
  // // 调试工具
  devtool: 'inline-source-map',
  // devtool: '#source-map',
  // devtool: 'cheap-module-eval-source-map',//开启生成source-map文件功能便于代码调试
  // 开发服务器
  devServer: {
    contentBase: false,// 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
    historyApiFallback: true,// 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    compress: true,// 启用gzip压缩
    // open: true,
    // inline: true,// 设置为true，当源文件改变时会自动刷新页面
    hot: true,// 模块热更新，取决于HotModuleReplacementPlugin
    hotOnly: true, //防止自动刷新
    host: '127.0.0.1',// 设置默认监听域名，如果省略，默认为“localhost”
    port: 8888,// 设置默认监听端口，如果省略，默认为“8080”
    before: function (app) {
      // console.log(app);
      if (process.env.NODE_ENV === 'mock') {
        Mock(app);
      }
    },
    proxy: { '/': { target: 'http://54.218.145.248/', changeOrigin: true, secure: false, proxyTimeout: 10000 } }
    // proxy: { '/': { target: 'http://10.200.3.121/', changeOrigin: true, secure: false, proxyTimeout: 10000 } }
  },
  // 插件
  plugins: [
    // 热更新相关
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    nodeEnv: 'development',
  }
});
