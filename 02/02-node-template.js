// 在 Node 中使用模板引擎

// art-template 模板引擎
// art-template 不仅可以在浏览器使用，也可以在 node 中使用

/*
  在 Node 中使用 art-template 模板引擎
    1. 安装：npm install art-template
    2. 在需要使用的文件模块中加载 art-template ：require('art-template)
    3. 查文档，使用引擎模板 API
*/

const template = require('art-template')
const fs = require('fs')
const http = require('http')

const server = http.createServer()

// const tplStr = `
//   <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <meta http-equiv="X-UA-Compatible" content="ie=edge">
//       <title>Document</title>
//     </head>
//     <body>
//       <p>大家好，我叫 {{ name }}</p>
//       <h3>我今年 {{ age }} 岁</h3>
//       <p>我来自 {{ province }}</p>
//       <p>我喜欢：{{each hobbies}} {{ $value }} {{/each}}</p>
//     </body>
//     </html>
//   `

fs.readFile('./tpl.html', (err, data) => {
  if (err) {
    return console.log('读取文件失败!')
  }

  // render() 接收字符串
  const ret = template.render(data.toString(), {
    name: 'Jack',
    age: 18,
    province: '北京市',
    hobbies: [
      '读书',
      '写代码'
    ]
  })

  // console.log(ret)
  server.on('request', (req, res) => {
    res.end(ret)
  })
})

server.listen(3000, () => {
  console.log('Server is running at http://127.0.0.1:3000')
})
