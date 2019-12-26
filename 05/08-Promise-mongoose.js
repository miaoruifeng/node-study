/**
 * mongoose 所有的 API 都支持 Promise
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 1. 连接数据库
// 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动被创建出来
// mongoose.connect('mongodb://localhost:27017/demo2')
mongoose.connect('mongodb://localhost/demo2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 2. 设计文档结构（表结构）
// 字段名称就是集合表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据

const userSchema = new Schema({
  username: {
    type: String,
    required: true // 必须有
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})

// 3. 将文档结构发布为模型
/**
 * mongoose.model方法就是用来讲一个架构发布为 model
 * 第一个参数：传入一个大写名词单数字符串来表示 数据表 名称
 *            mongoose 会自动将大写名词字符串转换为 小写复数
 *            eg: User => users
 * 第二个参数：架构 Schema
 * 返回值：模型构造函数
 */
const User = mongoose.model('User', userSchema)

// 4. 当有了模型构造函数之后，就可以使用这个构造函数对 users 集合的数据操作了

/**
 * 新增数据
 */

// const admin = new User({
//   username: 'admin',
//   password: '123456',
//   email: 'admin@admin.com'
// })

// admin.save((err, ret) => {
//   if (err) {
//     console.log('保存失败')
//   } else {
//     console.log('保存成功')
//     console.log(ret)
//   }
// })

/**
 * 查询数据
 */

// 查询所有

// User.find((err, ret) => {
//   if (err) {
//     console.log('查询失败')
//   } else {
//     console.log(ret)
//   }
// })

// Promise 实现查询所有
User.find()
  .then((data) => {
    console.log(data)
  })

/**
 * 场景实现：用户注册
 * 1. 判断用户是否已经存在
 *    如果已经存在，结束注册
 *    如果不存在，注册（保存一条用户信息）
 */

// User.findOne({
//     username: 'abc'
//   })
//   .then((user) => {
//     // console.log(user)
//     if (user) {
//       // 用户已存在
//       console.log('用户已存在')
//     } else {
//       // 用户不存在
//       return new User({
//         username: 'aaa',
//         password: '123',
//         email: 'abc@126.com'
//       }).save()
//     }
//   })
//   .then((ret) => {
//     console.log(ret)
//   })




// 按条件查询所有

// User.find({
//   username: 'zs'
// }, (err, ret) => {
//   if (err) {
//     console.log('查询失败')
//   } else {
//     console.log(ret)
//   }
// })

// 按条件查询单个

// User.findOne({
//   username: 'zs'
// }, (err, ret) => {
//   if (err) {
//     console.log('查询失败')
//   } else {
//     console.log(ret)
//   }
// })

/**
 * 删除数据
 */

// 按条件删除所有

// User.deleteMany({
//   username: 'admin'
// }, (err, ret) => {
//   if (err) {
//     console.log('删除失败')
//   } else {
//     console.log('删除成功')
//     console.log(ret)
//   }
// })

// 按条件删除单个

// User.deleteOne({
//   username: 'zs'
// }, (err, ret) => {
//   if (err) {
//     console.log('删除失败')
//   } else {
//     console.log('删除成功')
//     console.log(ret)
//   }
// })

/**
 * 更新数据
 */

// User.findByIdAndUpdate('5e02d398a23ab34a2cb070a3', {
//   password: '111111'
// }, (err, ret) => {
//   if (err) {
//     console.log('更新失败')
//   } else {
//     console.log('更新成功')
//     console.log(ret)
//   }
// })

// 新版本 API
// const query = {
//   username: 'admin'
// }
// User.updateOne(query, {
//   password: '111111'
// }, (err, ret) => {
//   if (err) {
//     console.log('更新失败')
//   } else {
//     console.log('更新成功')
//     console.log(ret)
//   }
// })