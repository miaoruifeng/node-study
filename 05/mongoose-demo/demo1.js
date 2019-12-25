const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true
});

// 创建一个模型 就是在设计数据库
// MongoDB 是动态的，非常灵活，只需要在代码中设计数据库就可以了
const Cat = mongoose.model('Cat', {
  name: String
});

for (var i = 0; i < 100; i++) {
  const kitty = new Cat({
    name: '喵喵' + i
  });
  kitty.save().then(() => console.log('meow'));
}
