const fs = require('fs')

const path = require('path')

// 模块中的路径标识和文件操作中的相对路径标识不一样
// 模块中的路径标识就是相对于当前模块文件，不受执行 node 命令所处路径影响
require('./a')


// ./a.txt 不是相对于当前文件路径
// ./a.txt 是相对于执行 node 命令所处的终端路径
// 这不是错误，node 就是这样设计的
// 就是说，文件操作路径中，相对路径设计的就是相对于执行 node 命令所处的终端路径
// fs.readFile('./a.txt', 'utf8', (err, data) => {
//   if (err) {
//     throw err
//   }
//   console.log(data)
// })

// 改为绝对路径
// fs.readFile('F:/Web/Project/node-study/06/foo/a.txt', 'utf8', (err, data) => {
//   if (err) {
//     throw err
//   }
//   console.log(data)
// })

// 动态的绝对路径
// fs.readFile(__dirname + '/a.txt', 'utf8', (err, data) => {
//   if (err) {
//     throw err
//   }
//   console.log(data)
// })

// 利用 path.join() 拼接路径
fs.readFile(path.join(__dirname, './a.txt'), 'utf8', (err, data) => {
  if (err) {
    throw err
  }
  console.log(data)
})
