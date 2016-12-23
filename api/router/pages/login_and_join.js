const capture = require('./../../lib/capture')
const encrypt = require('./../../lib/encrypt')
const session = require('./../../lib/session')
const querystring = require('querystring')
function join(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(req.tpl('join'))
}
function login(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(req.tpl('login'))
}
function checkJoin(req, res, db) {
  req.on('data', function(chunk) {
    const data = querystring.parse(chunk.toString())
    capture.checkCap(req, db.capture, data.capture, () => {
      encrypt.create(db.user, data.username, data.pwd, (doc) => {
        session.login(req, db.session, doc._id, () => {
          res.writeHead(301, {'Location': '/'})
          res.end()
        })
      }, () => {
        res.writeHead(401, {'Content-Type': 'text/html'})
        res.end(req.tpl('join', {
          err: '用户已存在'
        }))
      })
    }, () => {
      res.writeHead(401, {'Content-Type': 'text/html'})
      res.end(req.tpl('join', {
        err: '验证码错误'
      }))
    })
  })
}
function checkLogin(req, res, db) {
  req.on('data', function(chunk) {
    const data = querystring.parse(chunk.toString())
    capture.checkCap(req, db.capture, data.capture, () => {
      encrypt.check(db.user, data.username, data.pwd, (doc) => {
        session.login(req, db.session, doc._id, () => {
          res.writeHead(301, {'Location': '/'})
          res.end()
        })
      }, () => {
        res.writeHead(401, {'Content-Type': 'text/html'})
        res.end(req.tpl('login', {
          err: '密码错误'
        }))
      })
    }, () => {
      res.writeHead(401, {'Content-Type': 'text/html'})
      res.end(req.tpl('login', {
        err: '验证码错误'
      }))
    })
  })
}
module.exports = {
  login: login,
  join: join,
  checkLogin: checkLogin,
  checkJoin: checkJoin
}
