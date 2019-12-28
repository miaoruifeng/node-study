/**
 * Node 中的中间件
 */

const http = require('http')
const url = require('url')

const query = require('./middlewares/query')
const postBody = require('./middlewares/post-body')
const cookie = require('./middlewares/cookie')
const session = require('./middlewares/session')

const server = http.createServer((req, res) => {
  res.end('hello world')
  // 解析表单 get 请求
  // 解析表单 post 请求
  // 解析 Cookies
  // 解析 Session
  // 使用模板引擎
  // console.log(req.query)
  // console.log(req.body)
  // console.log(req.cookies)
  // console.log(req.session)

  // 解析请求地址中的 get 参数
  // const urlObj = url.parse(req.url, true)
  // req.query = urlObj.query
  query(req, res)

  // 解析请求地址中的 post 参数
  // req.body = {
  //   foo: bar
  // }
  postBody(req, res)

  // 解析 Cookies
  // req.cookies = {
  //   onLogin: true
  // }
  cookie(req, res)

  // 配置 Session
  // req.session = {}
  session(req, res)

  // 配置模板引擎
  res.render = function () {

  }

  // 上面的操作 只是为了后续处理业务逻辑时更方便
  // 中间件说白了就是个方法
})

server.listen(5000, () => {
  console.log('server is running...')
})