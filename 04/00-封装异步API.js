function fn (callback) {
  // var callback = function(a) {console.log(a)}
  setTimeout(() => {
    var data = 'hello';
    callback(data); // data 是实参
  }, 1000);
}

// 调用 fn() 得到内部的 data
fn(function(a) { // a是形参
  console.log(a);
});

// 如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取