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
app.use('/public/', express.static('./public/'))

app.listen(port, () => {
  console.log(`App is running at ${port}`)
})