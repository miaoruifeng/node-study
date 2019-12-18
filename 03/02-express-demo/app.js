const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World !')
  // console.log(req.query)
})

app.get('/about', (req, res) => {
  res.send('你好，Express ！')
})

// 公开指定目录
// 访问 /public/public资源  eg: 127.0.0.1/public/img/rb.jpg
app.use('/public', express.static('./public'))  // 推荐使用
// 文件相对路径可以省略 ./
// app.use('/public', express.static('public'))


// 访问 /public资源   eg: 127.0.0.1/img/rb.jpg
// app.use(express.static('public'))


// 给 public 起了别名 static
// 访问 /static/public资源  eg: 127.0.0.1/static/img/rb.jpg
// app.use('/static', express.static('public'))

app.listen(port, () => {
  console.log(`App is running at ${port}`)
})