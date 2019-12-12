/*
  node 实现简易留言板
*/

// 为了方便的统一管理静态资源， 约定把所有的静态资源放在 public 目录下 

const http = require('http')
const fs = require('fs')

http
  .createServer((req, res) => {
    const url = req.url
    if (url === '/') {
      fs.readFile('./views/index.html', (err, data) => {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    } else if (url.indexOf('/public/') === 0) {
      // 例如： /public/css/main.css、 /public/js/main.js 等
      // 统一处理：如果请求路径是 /public 开头的，则认为要获取 public 中的某个资源，
      // 则直接可以把请求路径当作文件路径来直接进行读取
      console.log(url)
      fs.readFile('.' + url, (err, data) => {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }
  })
  .listen(3000, () => {
    console.log('Server is running...')
  })