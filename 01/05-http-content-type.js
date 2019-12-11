const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  // 服务器默认发送到的数据，其实是 utf-8 编码的内容
  // 但是浏览器不知道是 utf-8 编码的
  // 浏览器在不知道服务器响应的内容的编码的情况下 会按照当前操作系统的默认编码去解析
  // 中文操作系统默认是 gbk 
  //  解决方法就是 告诉浏览器 发送的内容是什么编码的
  // 在 http 协议中，Content-Type 就是用来告知对方我给你发送的数据内容是什么类型的
  
  // res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  // res.end('你好！')

  const url = req.url
  if (url === '/plain') {
    // text/plain  就是普通文本
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('你好')
  } else if (url === '/html') {
    // text/html  如果是 html 格式的字符串，需要告诉浏览器返回的是 text/html 格式的内容
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<p>hello html <a href="">点我</a></p>')
  } else {
    res.end('404 Not Found')
  }

})

server.listen(3000, () => {
  console.log('Server is running http://127.0.0.1:3000')
})