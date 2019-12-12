// 1. 结合 fs 发送文件中的数据
// 2. Content-Type ----  https://tool.oschina.net/commons
// 不同资源对应的 Content-Type 是不一样的
// 图片不需要指定编码
// 一般只为字符数据才指定编码 

const http = require('http')
const fs = require('fs')

const server = http.createServer()

server.on('request', (req, res) => {
  // res.end('hello world')
  const url = req.url
  if (url === '/') {
    fs.readFile('./resource/index.html', (err, data) => {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('读取文件失败，请稍后重试')
      } else {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(data)
      }
    })
  } else if (url === '/img') {
    fs.readFile('./resource/rb.jpg', (err, data) => {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('读取文件失败，请稍后重试')
      } else {
        // 图片不需要指定编码
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(data)
      }
    })
  } else if (url === '/css') {
    fs.readFile('./resource/main.css', (err, data) => {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('读取文件失败，请稍后重试')
      } else {
        res.setHeader('Content-Type', 'text/css; charset=utf-8')
        res.end(data)
      }
    })
  } else if (url === '/js') {
    fs.readFile('./resource/main.js', (err, data) => {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('读取文件失败，请稍后重试')
      } else {
        res.setHeader('Content-Type', 'application/x-javascript; charset=utf-8')
        res.end(data)
      }
    })
  }
})

server.listen(3000, () => {
  console.log('Server is running http://127.0.0.1:3000')
})