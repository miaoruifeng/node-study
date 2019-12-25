/**
 * ES6 新增的 API: Promise
 * Promise 是一个构造函数
 * Promise（容器中存放了一个异步任务）: 
 *    Pending（正在进行时） => 状态只能变成一种： Resolved（成功） or Rejected（失败）
 */

// 创建 Promise 容器
// Promise 容器一旦创建，就开始执行里面的代码
// Promise 只是个容器，它本身不是异步，只是里面的任务是异步的

const fs = require('fs')

const p1 = new Promise((resolve, reject) => {
  fs.readFile('./data/a.txt', 'utf8', (err, data) => {
    if (err) {
      // Promise 容器中的任务失败了
      // console.log(err)

      // 把容器的 Pending 状态变为 Rejected
      // 调用 reject 就相当于调用了 then 方法的第二个参数函数
      reject(err)
    } else {
      // Promise 容器中的任务成功了
      // console.log(data)

      // 把容器的 Pending 状态变为 Resolved
      // 调用 resolve 就相当于调用了 then 方法的第一个参数函数
      resolve(data)
    }
  })
})

const p2 = new Promise((resolve, reject) => {
  fs.readFile('./data/b.txt', 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

const p3 = new Promise((resolve, reject) => {
  fs.readFile('./data/c.txt', 'utf8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

// p1 就是那个承诺（Promise）
// 当 p1 成功了，然后（then）做指定的操作
// then() 方法接收的 fn() 就是前面 Promise 里面的 resolve
p1
  .then((data) => {
    console.log(data)
    // 当 p1 读取成功的时候
    // 当前函数中 return 的结果就可以在后面的 then 中的 fn 接收到
    // 当 return 123，后面就接收到 123
    // 没有 return 后面收到的是 undefined
    // 真正有用的是，可以 return 一个 Promise 对象：p2
    // 当 return 一个 Promise 对象时，后续的 then 的第一个参数会作为 p2 的 resolve
    // 第二个参数会作为 p2 的 reject
    // 同理 p3...

    // return 123
    return p2
  }, (err) => {
    console.log('读取文件失败了', err)
  })
  .then((data) => {
    console.log(data)
    return p3
  })
  .then((data) => {
    console.log(data)
    console.log('end')
  })