/**
 * student.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 * 
 * 学习 Node 的精华部分：奥义所在
 * 封装异步 API
 */

/**
 * callback 中的参数：
 *   第一个参数是 err
 *      成功是 null
 *      错误是 错误对象
 *   第二个参数是 结果
 *      成功是 数组
 *      错误是 undefined
 */

const fs = require('fs')
const dbPath = './db.json'

/**
 * 获取所有学生列表
 * @param {Function} callback 回调函数
 */

exports.find = function (callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}

/**
 * 通过学生 id 获取学生信息
 * @param {Number}  id  学生id
 * @param {Function} callback 回调函数
 */

exports.findById = function(id, callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    let ret = students.find(item => item.id === parseInt(id))
    callback(null, ret)
  })
}

/**
 * 添加学生
 * @param {Object}  student  学生对象
 * @param {Function} callback 回调函数
 */
exports.add = function (student, callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    let students = JSON.parse(data).students
    // 处理 id 最大值自加 1 保证不重复
    student.id = students[students.length - 1].id + 1

    students.push(student)
    let ret = JSON.stringify({
      students
    })
    fs.writeFile(dbPath, ret, (err) => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

/**
 * 更新学生
 */

exports.updateById = function (student, callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }

    let students = JSON.parse(data).students

    // 注意：这里记得把 id 统一改成数字类型
    student.id = parseInt(student.id)

    let stu = students.find(item => item.id === student.id)

    // 遍历拷贝对象
    for (let key in student) {
      stu[key] = student[key]
    }

    let ret = JSON.stringify({
      students
    })
    fs.writeFile(dbPath, ret, (err) => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

/**
 * 删除学生
 */

exports.deleteById = function (id, callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }

    let students = JSON.parse(data).students

    let i = students.findIndex(item => {
      return item.id === parseInt(id)
    })
    students.splice(i, 1)
    
    let ret = JSON.stringify({
      students
    })
    fs.writeFile(dbPath, ret, (err) => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}