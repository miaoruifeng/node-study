// 1. 加载 http 核心模块
const http = require('http')

// 2. 使用 http.createServer() 方法创建一个 web 服务器  返回一个 Server 实例
const server = http.createServer()

// 3. 监听 request 请求事件，设置请求处理函数
// 服务器提供服务： 发请求-接受请求-处理请求-发送响应
// request 请求事件处理函数，需要接收两个参数
// Request 请求对象：用来获取客户端的一些请求信息，例如请求路径等
// Response 响应对象：用来给客户端发送响应消息
server.on('request', (request, response) => { // 可以简写 req, res
	// request.url --- 请求路径
	// eg: http://127.0.0.1/a => /a
	console.log('收到客户端的请求了，请求路径是：' + request.url)
	console.log('请求我的客户端的地址是：', request.socket.remoteAddress, request.socket.remotePort)

	// response 对象有一个方法：write 可以用来给客户端发送响应数据
	// write() 可以使用多次，但是最后一定要用 end() 来结束响应，否则客户端会一直等待
	// 用 write() 方法比较麻烦，可以直接用 end() 方法发送响应

	// 根据不同的请求路径发送不同的响应结果
	// 	1. 获取请求路径
	//  2. 判断路径 处理响应
	const url = request.url
	const goods = [
		{
			name: '华为P30',
			price: 3999
		},
		{
			name: '小米8',
			price: 2599
		}
	]

	if (url === '/') {
		response.end('index page')
	} else if (url === '/login') {
		response.end('login page')
	} else if (url === '/goods') {
		// 返回数据 必须是 string 或 buffer 类型
		response.end(JSON.stringify(goods))
	} else {
		response.end('404 Not Found')
	}


	// 告诉客户端 我的话说完了 你可以呈递给用户了
	// response.end()
})

// 4. 绑定端口号 启动服务
server.listen(3000, () => {
	console.log('服务器已启动，可以通过 http://127.0.0.1:3000 进行访问')
})