const express = require('express')
const app = express()

// 通一个请求，使用的 req 和 res 是同一个
app.get('/', (req, res, next) => {
  req.foo = 'bar'
  console.log(1)
  next()
})

app.get('/', (req, res, next) => {
  console.log(req.foo)
  console.log(2)
})

app.listen(3000, () => {
  console.log('app is running at port http://127.0.0.1:3000')
})