/**
 * 随机生成sid
 * 算法为当前时间+随机数
 * 
 * @param {Void}
 * @return {Number}
 */
function generateSid() {
  return (new Date()).getTime() + Math.random().toFixed(2)
}
/**
 * 登陆成功时调用
 * 实现单点登陆，删除数据库中相应username
 * 重新生成username和sid
 * sid发送给客户端
 * req是httpRequest
 * user是登陆的用户名称
 * db是依赖于model模块的数据库连接实例
 * 返回一个Promise实例
 *
 * @param {Object} req
 * @param {Object} db
 * @param {String} user
 * @return {Promise}
 */
function sessionLogin(req, db, user) {
  const _time = new Date()
  _time.setYear(_time.getYear() + 1902)
  return new Promise((resolve) => {
    db.removeOne({
      username: user
    }, () => {
      db.add({
        username: user,
        _id: generateSid()
      }, (doc) => {
        req.cookie.set('sid', doc._id, {
          expires: _time,
          httpOnly: true
        })
        resolve()
      })
    })
  })
}
/**
 * 校验用户登陆状态
 * 依赖于core模块
 * 是core模块的中间件
 * 如果登陆成功，req.username有值，否则为null
 * req是指httpRequest
 * db是依赖于model模块的数据库连接实例
 * 返回一个Promise实例
 *
 * @param {Object} req
 * @param {Object} db
 * @return {Promise}
 */
function sessionFilter(req, db) {
  const _cookieObj = req.cookie.parse()
  const _time = new Date()
  _time.setYear(_time.getYear() + 1902)
  return new Promise((resolve) => {
    if(!_cookieObj||!_cookieObj.sid) {
      resolve()
    } else {
      db.findOne({
        _id: _cookieObj.sid
      }, (doc) => {
        if(doc) {
          req.username = doc.username
          req.cookie.set('sid', doc._id, {
            expires: _time,
            httpOnly: true
          })
        }
        resolve()
      })
    }
  })
}
module.exports = {
  /**
   * 可供调用的登陆状态生成函数
   * req是httpRequest
   * db是依赖于model模块的数据库连接实例
   * user是用户的名称
   * fn是之后操作的回调函数
   *
   * @param {Object} req
   * @param {Object} db
   * @param {String} user
   * @param {Function} fn
   * @return {Void}
   */
  login: (req, db, user, fn) => {
    sessionLogin(req, db, user).then(fn)
  },
  /**
   * 可供调用的filter中间件
   * req是httpRequest
   * db是依赖于model模块的数据库连接实例
   * next是依赖于中间件模块的next函数
   *
   * @param {Object} req
   * @param {Object} db
   * @param {String} user
   * @param {Function} next
   * @return {Void}
   */
  filter: (req, db, next) => {
    sessionFilter(req, db).then(() => {
      next()
    })
  }
}
