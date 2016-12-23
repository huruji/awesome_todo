const ccap = require('ccap')()
/**
 * 创建一个验证码，并将核对信息存储进数据库
 * 用于记录当前验证码的_id用作cookie发送给客户端
 * req是httpRequest
 * db是依赖于model模块的连接实例的capture对象
 * fn是回调函数，参数是生成二维码的二进制
 *
 * @param {Object} req
 * @param {Object} db
 * @param {Function} fn
 */
function getCapture(req, db, fn) {
  const ary = ccap.get()
  const captureId = Date.now() + Math.random()
  const _time = new Date()
  _time.setMinutes(_time.getMinutes()+1)
  db.add({
    _id: captureId,
    content: ary[0]
  }, (doc) => {
    req.cookie.set('captureId', captureId, {
      path: '/',
      expires: _time,
      httpOnly: true
    })
    fn(ary[1])
  })
}
/**
 * 检查验证码是否通过
 * req是httpRequest
 * db是依赖于model模块的连接实例的capture对象
 * cap是客户端输入的验证码
 * fn是回调函数
 * errHandler是处理验证码不正确时的回调函数
 *
 * @param {Object} req
 * @param {Object} db 
 * @param {String} cap
 * @param {Function} fn
 * @param {Function} errHandler
 */
function checkCapture(req, db, cap, fn, errHandler) {
  db.findOne({
    _id: req.cookie.parse().captureId
  }, (doc) => {
    if(doc && doc.content === cap) {
      fn(doc.content)
    } else {
      errHandler()
    }
  })
}

module.exports = {
  getCap: getCapture,
  checkCap: checkCapture
}
