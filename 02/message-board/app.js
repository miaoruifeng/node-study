/*
  node 实现简易留言板
*/

// 为了方便的统一管理静态资源， 约定把所有的静态资源放在 public 目录下 

const http = require('http')
const fs = require('fs')
const url = require('url')
const template = require('art-template')

const comments = [
  {
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

http
  .createServer((req, res) => {
    // url.parse() 将路径解析为一个方便操作的对象
    const parseObj = url.parse(req.url, true)
    const pathname = parseObj.pathname
    if (pathname === '/') {
      fs.readFile('./views/index.html', (err, data) => {
        if (err) {
          return res.end('404 Not Found.')
        }
        const htmlStr = template.render(data.toString(), {
          comments: comments
        })
        res.end(htmlStr)
      })
    } else if (pathname === '/post') {
      fs.readFile('./views/post.html', (err, data) => {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    } else if (pathname === '/comment') {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      // res.end((JSON.stringify(parseObj.query)))
      // 此时，服务器已经把数据存储好了，接下来就是让客户端重新发起请求
      const comment = parseObj.query
      comment.dateTime = '2019-12-12'
      comments.unshift(comment)
      // 重定向到首页 然后发起请求
      /*
        如何通过服务器让客户端重定向？
          1. 状态吗设置为 302  临时重定向 --- statueCode
          2. 在响应头中告诉客户端 定向到哪 --- setHeader('Location', '/')
      */
      // 当客户端收到服务器响应状态码是 302 时，就会自动重定向
      // res.writeHead(302, {'Location': '/'})
      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
    } else if (pathname.indexOf('/public/') === 0) {
      // 例如： /public/css/main.css、 /public/js/main.js 等
      // 统一处理：如果请求路径是 /public 开头的，则认为要获取 public 中的某个资源，
      // 则直接可以把请求路径当作文件路径来直接进行读取
      
      // console.log(pathname)
      fs.readFile('.' + pathname, (err, data) => {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    } else {
      fs.readFile('./views/404.html', (err, data) => {
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

  /*
    总结：
      1. / index.html
      2. 开放 public 目录中的静态资源
         当请求 public/xxx 的时候， 读取响应 public 目录中的具体资源
      3. /post  post.html
      4. /comment
         4.1 接受表单提交的数据
         4.2 存储表单提交的数据
         4.3 让表单重定向到 /
             statusCode --- 302
             setHeader --- Location
  */