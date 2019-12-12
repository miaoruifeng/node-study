// 仿 Apache 目录列表 

const http = require('http')
const fs = require('fs')

const server = http.createServer()

const wwwDir = 'F:/Web/Project/node-study/02/www'

server.on('request', (req, res) => {
  fs.readFile('./template.html', (err, data) => {
    if (err) {
      return res.end('404 Not Found')
    }

    // 1. 如何得到 wwwDir 目录列表中的文件名和文件目录 => fs.readdir
    // 2. 如何将得到的文件名和文件目录替换到 template.html 中  => 模板引擎
    
    // 2.1 在 template.html 模板中需要替换的位置预留一个特殊的标记

    fs.readdir(wwwDir, (err, files) => {
      if (err) {
        return res.end('Can not find www dir')
      }

      // 2.2 根据 files 生成需要的 HTML 内容
      let content = ''
      files.forEach(item => {
        content += `
          <tr>
            <td data-value="login/"><a class="icon dir" href="/F:/Web/Project/node-study/02/www/login/">${item}</a></td>
            <td class="detailsColumn" data-value="0"></td>
            <td class="detailsColumn" data-value="1576130659">2019/12/12 下午2:04:19</td>
          </tr>
        `
      })

      // 2.3 替换
      data = data.toString()
      data = data.replace('^_^', content)

      // 发送解析替换过后的响应数据
      res.end(data)
    })
  })
})

server.listen(3000, () => {
  console.log('Server is running at http://127.0.0.1:3000')
})