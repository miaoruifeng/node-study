/*
    require 是一个方法 它的作用是：
      1. 加载模块 并执行里面的代码
      2. 拿到被加载文件模块导出的接口对象 

    在每个文件模块中都提供了一个对象：exports
    exports 默认是一个空对象
    要做的就是把所有需要访问的成员挂载到 exports
*/


const result = require('./b')

// console.log(result)
console.log(result.add(10, 20))

// console.log(result.foo)
// console.log(result.bar)
// console.log(result.foo1)