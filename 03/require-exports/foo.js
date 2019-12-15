// exports.a = 123

// 给 exports 重新赋值会断开引用
// exports = {} // => {}
// exports.foo = 'hello' // => {}
// module.exports.foo = 'bar' // = { foo: 'bar }
// module.exports.b = 456

// 同理，给 module.exports 重新赋值也会断开引用
// module.exports = 'hello' // => 'hello'
// exports.foo = 'bar' // => 'hello'

// 此时 exports !== module.exports 
// module.exports = {
//   foo: 'bar'
// }
// // 但这里又重新建立了引用关系
// exports = module.exports
// exports.foo = 'bar' // => { foo: 'bar' }


// // eg:
// exports.foo = 'bar' // => { foo: 'bar' }
// module.exports.a = 123 // => { foo: 'bar', a: 123 }

// // 此时，exports !== module.exports 已经断开引用关系
// // 最终 return 的是 module.exports
// // 所以，无论 exports 中的成员是什么都没关系
// exports = {
//   a: 456
// }
// module.exports.foo = 'haha' // =>  { foo: 'haha', a: 123 }
// exports.c = 456 // 此时，exports 与 module.exports 没关系 混淆你的

// // exports 与 module.exports 重新建立了关系
// exports = module.exports  // =>  { foo: 'haha', a: 123 }
// exports.a = 789 // =>  { foo: 'haha', a: 789 }

// // 此时又是重新赋值，覆盖前面的所有，最终输出 => Function
// module.exports = function() {
//   console.log('hello')
// }


////////////////////////////////
// 结论：
// 导出多个
// 方法一：
// exports.a = 123
// exports.foo = 'bar'
// 方法二：
// module.exports = {
//   a: 123,
//   foo: 'bar'
// }

// 导出单个 只有一种方法
var add = function() {
  return x + y
}
module.exports = add