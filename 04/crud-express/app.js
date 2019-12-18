/**
 * app.js 入口模块（文件）
 * 职责：
 *  1. 创建服务
 *  2. 做一些服务相关配置
 *     模板引擎
 *     body-parser 解析表单 post 请求体参数
 *     提供静态资源服务
 *  3. 挂载路由
 *  4. 监听端口 启动服务
*/

const express = require('express')
const router = require('./router')

const app = express()
const port = 3000

app.engine('html', require('express-art-template'))

app.use('/node_modules', express.static('./node_modules'))
app.use('/public', express.static('./public'))

// router(app)
// 4. 在入口文件 app.js中 把路由容器挂载 APP 服务中
app.use(router)

app.listen(port, () => {
  console.log('App is running...')
})