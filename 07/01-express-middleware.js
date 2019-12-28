const express = require('express')
const app = express()

// 中间件：处理请求的，本质就是个函数

// 在 Express 中，对中间件有几种分类：

// 当请求进来，会从第一个中间件开始进行匹配
//    如果匹配，则进来
//      若果进入中间件之后，没有调用 next，则停留在这个中间件
//      如果调用了 next，则继续向后判断匹配 
//    如果不匹配，则继续判断匹配下一个中间件

// 1. 万能匹配--不关心路请求径和请求方法的中间件
// 也就是任何请求都会进入这个中间件
// 中间件本身是一个方法，该方法接收三个参数：
//    Request 请求对象
//    Reponst 响应对象
//    next    下一个中间件
// 当一个请求进入一个中间件之后，如果不调用 next()，则会停留在这个中间件
// 所以，next 是个方法，用来调用下一个中间件
// next 也是要匹配的，不是调用紧挨着的下一个

// app.use((req, res, next) => {
//   console.log(1)
//   next()
// })

// app.use((req, res, next) => {
//   console.log(2)
// })

// 2. 以 '/xxx/' 开头的路径中间件
// app.use('/a', (req, res, next) => {
//   console.log('a')
// })

// app.use('/b', (req, res, next) => {
//   console.log('b')
// })

// 3. 严格匹配请求路径和请求方法的中间件
// app.get()
// app.post()
app.get('/', (req, res, next) => {
  console.log('/')
})

app.get('/a', (req, res, next) => {
  console.log('/a')
})

app.listen(3000, () => {
  console.log('app is running at port http://127.0.0.1:3000')
})