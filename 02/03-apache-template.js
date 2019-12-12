/*
  在 Node 中使用 art-template 模板引擎
  使用 art-template 模板引擎替换并渲染 Apache 目录结构
*/

const http = require('http')
const fs = require('fs')
const template = require('art-template')

const server = http.createServer()

const wwwDir = 'F:/Web/Project/node-study/02/www'

server.on('request', (req, res) => {
  fs.readFile('./template-apache.html', (err, data) => {
    if (err) {
      return res.end('404 Not Found')
    }

    fs.readdir(wwwDir, (err, files) => {
      if (err) {
        return res.end('Can not find www dir')
      }
      // 使用 art-template 模板引擎替换并渲染
      let htmlStr = template.render(data.toString(), {
        title: '模板引擎',
        files: files
      })
      res.end(htmlStr)
    })
  })
})

server.listen(3000, () => {
  console.log('Server is running at http://127.0.0.1:3000')
})