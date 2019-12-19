/**
 * router.js 路由模块
 * 职责：
 *  1. 处理路由
 *  2. 根据不同的请求方法 + 请求路径 设置具体的响应处理函数
 */

const Student = require('./student')

// express 提供了一种更好的方法 专门用来包装路由的：Router()
const express = require('express')

// 1. 创建一个路由容器
const router = express.Router()

// 2. 把路由都挂载到 router 路由容器中

/**
 * 渲染学生信息列表页面
 */
router.get('/students', (req, res) => {
  Student.find((err, students) => {
    if (err) {
      return res.statusCode(500).send('Server error.')
    }
    res.render('index.html', {
      students
    })
  })
})

/**
 * 渲染添加学生页面
 */
router.get('/students/new', (req, res) => {
  res.render('add.html')
})

/**
 * 处理添加学生
 */
router.post('/students/new', (req, res) => {
  // console.log(req.body)
  Student.add(req.body, (err) => {
    if (err) {
      return res.statusCode(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

/**
 * 渲染编辑学生页面
 */
router.get('/students/edit', (req, res) => {
  // console.log(typeof req.query.id)
  Student.findById(parseInt(req.query.id), (err, student) => {
    if (err) {
      return res.statusCode(500).send('Server error.')
    }
    res.render('edit.html', {
      student
    })
  })
})

/**
 * 处理编辑学生
 */
router.post('/students/edit', (req, res) => {
  console.log(req.body)
  Student.updateById(req.body, (err) => {
    if (err) {
      return res.statusCode(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

/**
 * 处理删除学生
 */
router.get('/students/delete', (req, res) => {
  // console.log(req.query.id)
  Student.deleteById(req.query.id, (err) => {
    if (err) {
      return res.statusCode(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

// 3. 把 router 导出去
module.exports = router

// 4. 在入口文件 app.js中 把路由容器挂载 APP 服务中


// 这种方法可以，但是不推荐使用，express 提供了专门的处理路由方法 Router()
// app.js 中导入该模块 并调用此方法，同时传入 app 参数
// module.exports = function (app) {
//   app.get('/students', (req, res) => {
//     // readFile 第二个参数可以接收 utf8 , 把 data 转化为认识的字符串，那么后续就不需要用 data.toString() 转换了
//     fs.readFile('./db.json', 'utf8', (err, data) => {
//       if (err) {
//         return res.statusCode(500).send('Server error.')
//       }
//       // readFile 获取的文件是字符串，而不是对象！
//       // const students = JSON.parse(data.toString()).students
//       const students = JSON.parse(data).students
//       res.render('index.html', {
//         students
//       })
//     })
//   })
// }