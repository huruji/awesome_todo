const bcrypt = require('bcrypt')
//加盐
const SALTROUNDS = 10
/** 
 * 创建加密后的数据
 * 盐值存储在数据库中
 * db是数据库实例
 * user是用户名
 * pwd是密码
 * fn是加密成功的回调函数
 * errHandler是加密失败的回调函数
 *
 * @param {Object} db
 * @param {String} user
 * @param {String} pwd
 * @param {Function} fn
 * @param {Function} errHandler
 * @return {Void}
 */
const create = (db, user, pwd, fn, errHandler = (err) => {
  console.log(err)
}) => {
  bcrypt.genSalt(SALTROUNDS, (err, salt) => {
    if(err) {
      errHandler()
    } else {
      bcrypt.hash(pwd, salt, (err, hash) => {
        db.add({
          _id: user,
          salt: hash
        }, fn, () => {
          errHandler()
        })
      })
    }
  })
}
/**
 * 校验用户名密码
 * db是数据库实例
 * user是用户名
 * pwd是密码
 * fn是验证成功的回调函数
 * errHandler是验证失败的回调函数
 *
 * @param {Object} db
 * @param {String} user
 * @param {String} pwd
 * @param {Function} fn
 * @param {Function} errHandler
 * @return {Void}
 */
const check = (db, user, pwd, fn, errHandler = (err) => {
  console.log(err)
}) => {
  db.findOne({
    _id: user
  }, (doc) => {
    if(doc) {
      bcrypt.compare(pwd, doc.salt, (err, res) => {
        if(res) {
          fn(doc)
        } else {
          errHandler(err)
        }
      })
    } else {
      errHandler('no user')
    }
  })
}
module.exports = exports = {
  create: create,
  check: check
}
