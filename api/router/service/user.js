const querystring = require('querystring')
// POST /user
function addUser(req, res, db) {
  req.on('data', (chunk) => {
    const data = querystring.parse(chunk.toString())
    db.add({
      username: data.username
      pwd: data.pwd
    }, (doc) => {
      //TODO: 注册成功
    }, () => {
      //TODO: 注册失败
      res.writeHead(403, {'Content-Type': 'text/plain'})
      res.end('用户已存在')
    })
  })
}
// GET /user/:username
function checktUser(req, res, db) {
  req.on('data', (chunk) => {
    const data = querystring.parse(chunk.toString())
    db.findOne({
      username: req.params[':username']
    }, (doc) => {
      //TODO: 找到用户
    }, () => {
      //TODO: 未找到用户
    })
  })
}
