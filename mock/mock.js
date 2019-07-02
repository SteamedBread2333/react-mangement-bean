function Mock(app) {
    app.post('/login', async (ctx, next) => {
        console.log(ctx.url)
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 3000)
        })
        next.json({
            errorcode: 0,
            errormsg: '登录成功'
        })
    })
}
module.exports = Mock;