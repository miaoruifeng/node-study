const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.engine('html', require('express-art-template'))

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
  // res.send('留言板案例')
  fs.readFile('./views/index.html', (err, data) => {
    res.render('index.html', {
      comments
    })
  })
})

app.get('/post', (req, res) => {
  fs.readFile('./views/post.html', (err, data) => {
    // res.end(data)
    res.render('post.html')
  })
})

app.get('/comment', (req, res) => {
  // console.log(req.query)
  const commentObj = req.query
  commentObj.dateTime = '2019-12-17'
  comments.unshift(commentObj)
  res.redirect('/')
})

// 404
app.use((req, res) => {
  fs.readFile('./views/404.html', (err, data) => {
    res.end(data)
  })
})

app.listen(port, () => {
  console.log(`App is runnig at ${port}`)
})