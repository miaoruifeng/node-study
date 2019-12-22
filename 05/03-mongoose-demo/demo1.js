const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true
});

const Cat = mongoose.model('Cat', {
  name: String
});

for (var i = 0; i < 100; i++) {
  const kitty = new Cat({
    name: '喵喵' + i
  });
  kitty.save().then(() => console.log('meow'));
}
