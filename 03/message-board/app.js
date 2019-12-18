const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// 配置使用 art-template 模板引擎
// 第一个参数表示，当渲染以 .html 结尾的文件时，使用 art-template 模板引擎
// express-art-template 是 art-template 专门在 express 中使用的
app.engine('html', require('express-art-template'))

// express 为 response 提供了一个 render() 方法
// render() 默认是不可以使用的，但是如果配置了 art-template 就可以使用了
// render('html模板名', { 模板数据 })
// 第一个参数不能写路径，默认回去项目中的 views 目录中查找该模板文件
// 也就是 express 有一个约定：把所有的视图文件都放在 views 目录中

// 如果想要修改默认的 views 目录，则可以：
// app.set('views', render函数的路径)


// 配置 body-parser 中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const comments = [{
    name: '张三',
    message: '服务端模板渲染列表',
    dateTime: '2019-12-14'
  },
  {
    name: '张三2',
    message: '服务端模板渲染列表',
    dateTime: '2019-12-14'
  },
  {
    name: '张三3',
    message: '服务端模板渲染列表',
    dateTime: '2019-12-14'
  },
  {
    name: '张三4',
    message: '服务端模板渲染列表',
    dateTime: '2019-12-14'
  },
  {
    name: '张三5',
    message: '服务端模板渲染列表',
    dateTime: '2019-12-14'
  }
]

// 公开访问静态资源
app.use('/public', express.static('./public'))
// app.use('/public', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('index.html', {
    comments
  })
})

app.get('/post', (req, res) => {
  res.render('post.html')
})

// GET 方法
// app.get('/comment', (req, res) => {
//   // console.log(req.query)
//   // req.query 只能拿 get 请求参数
//   const commentObj = req.query
//   commentObj.dateTime = '2019-12-17'
//   comments.unshift(commentObj)
//   res.redirect('/')
// })

// POST
// 利用不同的请求方法，可以让一个请求路径使用多次
app.post('/post', (req, res) => {
  // 1. 获取表单 POST 请求体数据
  // 2. 处理
  // 3. 发送响应
  // console.log(req.body)
  const commentObj = req.body
  commentObj.dateTime = '2019-12-18'
  comments.unshift(commentObj)
  res.redirect('/')
})

// admin 测试
app.get('/admin', (req, res) => {
  res.render('admin/index.html', {
    title: '管理系统'
  })
})

// 404
app.use((req, res) => {
  res.render('404.html')
})

app.listen(port, () => {
  console.log(`App is runnig at ${port}`)
})