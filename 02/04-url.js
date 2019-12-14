const http = require('http')
const url = require('url')

http
  .createServer((req, res) => {
    const pathName = url.parse(req.url, true)
    console.log(pathName)
  })
  .listen(8090, () => {
    console.log('running...')
  })
