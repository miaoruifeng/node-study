const express = require('express')
const fs = require('fs')
const app = express()

app.get('/', (req, res, next) => {
  fs.readFile('./a/b', (err, data) => {
    if (err) {
      // return res.status(500).send('Server Error')
      // 当调用 next 的时候，如果传递了参数，
      // 则直接完后找到带有四个参数的应用程序级别的中间件
      // 当发生错误的时候，我们可以调用 next 传递错误对象
      // 然后就会被全局错误处理中间件匹配到并处理之
      next(err)
    }
  })
})

app.get('/', (req, res, next) => {
  console.log('/ 2')
})

app.get('/a', (req, res, next) => {
  fs.readFile('./adsa/asd/fg', (err, data) => {
    if (err) {
      // return res.status(500).send('Server Error')
      next(err)
    }
  })
})

// 404
app.use((req, res, next) => {
  res.send('404')
})

// 配置错误处理中间件
app.use((err, req, res, next) => {
  // console.log('app error handler')
  res.status(500).send(err.message)
})

app.listen(5000, () => {
  console.log('app is running at port http://127.0.0.1:5000')
})