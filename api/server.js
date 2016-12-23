const fs = require('fs')
const querystring = require('querystring')
//第三方模块
const ccap = require('ccap')()
//引入自定义模块
const app = require('./lib/core')()
const exit = require('./lib/exit')
const template = require('./lib/template')
const Cookie = require('./lib/cookie')
const session = require('./lib/session')
const capture = require('./lib/capture')
const Model = require('./model/model')
const modelList = require('./model/modelList')

const router = require('./router/router')

//服务端配置
const SERVER_CONFIG = {
  host: process.env.IP || 'localhost',
  port: process.env.PORT || 8888
}
//加载数据库
const model = new Model()
model.setConfig({
  user: 'fsn',
  pwd: '0000',
  db: 'fsn'
})
model.loadModelFromList(modelList)
const db = model.init()

app.use('/', (req, res, next) => {
  new Cookie(req, res)
  next()
})
app.use('/', (req, res, next) => {
  session.filter(req, db.session, next)
})
app.use('/', (req, res, next) => {
  req.tpl = template()
  next()
})
//页面
app.get('/', (req, res) => {
  router.user(req, res)
})
app.get('/capture/:number', (req, res) => {
  capture.getCap(req, db.capture, (cap) => {
    res.end(cap)
  })
})
app.get('/login', (req, res) => {
  router.loginAndJoin.login(req, res)
})
app.post('/login', (req, res) => {
  router.loginAndJoin.checkLogin(req, res, db)
})
app.get('/join', (req, res) => {
  router.loginAndJoin.join(req, res)
})
app.post('/join', (req, res) => {
  router.loginAndJoin.checkJoin(req, res, db)
})
app.get('/logout', (req, res) => {
  req.cookie.remove('sid')
  res.writeHead(301, {
    'Content-Type': 'text/html',
    'location': '/'
  })
  res.end('logout!')
})
//数据接口
app.get('/todo', (req, res) => {
  router.todo.listTodo(req, res, db)
})
app.post('/todo', (req, res) => {
  router.todo.addTodo(req, res, db)
})
app.put('/todo/:id', (req, res) => {
  router.todo.updateTodo(req, res, db)
})
app.delete('/todo/:id', (req, res) => {
  router.todo.deleteTodo(req, res, db)
})
app.listen(SERVER_CONFIG.port, SERVER_CONFIG.host) 
exit()
