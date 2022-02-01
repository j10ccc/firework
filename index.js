const path = require('path');
const http = require('http');
const Koa = require('koa');
const serve = require('koa-static');

const hostname = '127.0.0.1';
const port = 3000;
const publicPath = path.join(__dirname, 'public');


const app = new Koa();
// 创建http server 实例
const server = http.createServer(app.callback());

app.use(serve(publicPath));

server.listen(port, hostname, () => {
  console.log('listening...');
});