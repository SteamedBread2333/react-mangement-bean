import Koa from 'koa'
import webpack from 'webpack'
import webpackConfig from '../webpack.config'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import httpProxy from 'http-proxy-middleware'
import path from 'path'
import Router from 'koa-router'
import k2c from 'koa2-connect'
import bodyParser from 'koa-bodyparser'

const router = new Router()
const app = new Koa()
const compile = webpack(webpackConfig)

app.use(async (ctx, next) => {
	if (ctx.url.startsWith('/AlexaService/v1/')) { //匹配有api字段的请求url
		ctx.respond = false // 绕过koa内置对象response ，写入原始res对象，而不是koa处理过的response        
		await k2c(httpProxy({ target: 'http://10.200.3.121/', changeOrigin: true, secure: false, }))(ctx, next);
	} await next()
})

app.use(bodyParser({
	enableTypes: ['json', 'form', 'text']
}))

app.use(devMiddleware(compile, {
	noInfo: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: false
	},
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true
	}
}))

//webpack热更新
app.use(hotMiddleware(compile, {
	// log: console.log,
	// path: '/__webpack_hmr',
	// heartbeat: 10 * 1000
}))


//模拟登录接口
router.post('/login', async (ctx, next) => {
	await new Promise((resolve, reject) => {
		setTimeout(resolve, 3000)
	})
	console.log(ctx.request.body)
	ctx.body = {
		errorcode: 0,
		errormsg: '登录成功'
	}
})

router.get('/favicon.ico', (ctx, next) => {
	ctx.body = null
})

//渲染页面
router.get('*', async (ctx, next) => {
	ctx.type = 'html'
	ctx.body = `<!DOCTYPE html>
				<html lang="en">
				<head>
				<meta charset="UTF-8">
				<title>mobx-demo</title>
				<style>
					*{
					margin: 0;
					padding: 0;
					}
					html,
					body {
					-webkit-tap-highlight-color: transparent;
					height: 100%;
					touch-action: none;
					}
				</style>
				</head>
				<body>
				<div id="root" style="height: 100%;"></div>
				<script src="/dist/bundle.js"></script>
				</body>
				</html>`
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8080)
// console.log(webpackConfig);
console.log('app started at port 8080...')