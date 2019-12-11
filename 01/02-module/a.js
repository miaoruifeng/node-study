// require 是一个方法 它的作用是用来加载模块的
/*
    Node 中，模块有三种：
    1. 具名的核心模块：fs、http、path...
    2. 用户自检编写的文件模块
        相对路径必须加 ./
*/
// 在 Node 中没有全局作用域 只有模块作用域（文件作用域）：外部访问不到内部 内部也访问不到外部
/*
    ***模块之间的通信***
*/
const foo = 'aaa'

function add(x, y) {
    return x + y
}

console.log('a start')
require('./b')
console.log('a end')

console.log('foo 的值是：', foo)

console.log('求和的结果是：', add(100, 200))