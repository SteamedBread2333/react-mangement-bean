'use strict'
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const themeConfig = require('../src/theme');
const isDev = process.env.NODE_ENV === 'dev';

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 入口起点
  entry: {
    app: './src/index.js',
    login: './src/login.js'
    // vendor: [
    //   'react',
    //   'react-dom',
    // ]
  },
  // 输出
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].js",
  },
  // 解析
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': path.join(__dirname, '..', 'src')
    }
  },
  // loader
  module: {
    rules: [
      {
        test: /\.js|jsx|json$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        },
        exclude: [/assets/, /node_modules/]
      },
      {
        test: /\.less$/,
        use: [
          isDev ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 5 version']
                })
              ]
            }
          },
          // javascriptEnabled: true  ------  在less里面可以使用JavaScript表达式
          { loader: 'less-loader', options: { modifyVars: themeConfig, javascriptEnabled: true } },
        ],
        exclude: [resolve('src')],
        include: [resolve('node_modules')]
      },
      {
        test: /\.less$/,
        use: [
          isDev ? 'style-loader'
          : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 5 version']
                })
              ]
            }
          },
          { loader: 'less-loader', options: { javascriptEnabled: true } },
        ],
        include: [resolve('src')],
        exclude: [resolve('node_modules')]
      },
      {
        test: /\.css|scss$/,
        use: [
          isDev ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
    ]
  },
  // 目标运行环境
  target: "web",
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Login',
      favicon: path.resolve('./src/assets/favicon.ico'), // 设置 favicon 图标路径
      filename: 'login.html',
      template: './src/views/login.html',
      inject: 'body',
      chunks: ['vendors', 'manifest', 'common', 'login'],
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Alexa',
      favicon: path.resolve('./src/assets/favicon.ico'), // 设置 favicon 图标路径
      filename: 'index.html',
      template: './src/views/index.html',
      inject: 'body',
      chunks: ['vendors', 'manifest', 'common', 'app'],
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ]
};
