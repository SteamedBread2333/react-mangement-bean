'use strict'
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CompressionPlugin = require('compression-webpack-plugin');

let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseWebpackConfig, {
  // 模式
  mode: "production",
  // // 调试工具
  devtool: false,
  // 输出
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "js/[name].[chunkhash].js",
  },

  // 插件
  plugins: [
    new CleanWebpackPlugin(['dist', 'build'], {
      root: path.resolve(__dirname, '../'),
    }),
    new webpack.HashedModuleIdsPlugin(),
    // gzip压缩源文件
    // new CompressionPlugin({
    //   filename: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.js|css/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    //   // deleteOriginalAssets: true,
    // })
    // new BundleAnalyzerPlugin()
  ],
  // 代码分离相关
  optimization: {
    nodeEnv: 'production',
    minimizer: [
      // 自定义js优化配置，将会覆盖默认配置
      new UglifyJSPlugin({
        exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
        cache: true,
        parallel: true, // 开启并行压缩，充分利用cpu
        sourceMap: false,
        extractComments: false, // 移除注释
        uglifyOptions: {
          compress: {
            unused: true,
            // warnings: false,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
      }),
      // 用于优化css文件
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true }, // 这里是个大坑，稍后会提到
          mergeLonghand: false,
          discardComments: {
            removeAll: true // 移除注释
          }
        },
        canPrint: true
      })],
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      // chunks: function (chunk) {
      //   // 这里的name 可以参考在使用`webpack-ant-icon-loader`时指定的`chunkName`
      //   return chunk.name !== 'antd-icons';
      // },
      cacheGroups: {
        vendors: { // 项目基本框架等
          name: 'vendors',
          test: /[\\/]react|react-dom|react-router-dom|axios|mobx[\\/]/,
          chunks: 'all',
          priority: 100
        },
        antdVenodr: { // 异步加载antd & moment包
          test: /(antd)/,
          priority: 100,
          name: 'antdVenodr',
          // chunks: function (chunk) {
          //   // 这里的name 可以参考在使用`webpack-ant-icon-loader`时指定的`chunkName`
          //   return chunk.name !== 'antd-icons';
          // },
          chunks: 'async'
        },
        echartsVenodr: { // 异步加载echarts包
          test: /(echarts|zrender)/,
          priority: 100, // 高于async-commons优先级
          name: 'echartsVenodr',
          chunks: 'async'
        },
        'async-commons': {  // 异步加载公共包、组件等
          chunks: 'async',
          minChunks: 2,
          name: 'async-commons',
          priority: 90,
        },
        commons: { // 其他同步加载公共包
          chunks: 'all',
          minChunks: 2,
          name: 'commons',
          priority: 80,
        },

      }
    }
  }
});
