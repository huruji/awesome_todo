/**
 * 用作中间件的cookie模块
 * 负责操作cookie
 * 
 * @class Cookie
 */
class Cookie {
  /**
   * 构造cookie模块
   * req是httpRequest
   * res是httpResponse
   * _cookie用于记录cookie列表
   * 你可以通过req.cookie访问模块
   * 返回请求时，会自动发送_cookie列表到客户端
   *
   * @param {Object} req
   * @param {Object} res
   * @return {Void}
   */
  constructor(req, res) {
    this._cookie = []
    this._req = req
    this._res = res
    const cookie = req.headers.cookie
    const _hackHead = res.writeHead
    if(cookie) {
      const cook = cookie.split(';')
      cook.forEach((c) => {
        this._cookie.push(c.trim())
      })
    }
    req.cookie = this
    res.writeHead = (...args) => {
      res.setHeader('Set-Cookie', this._cookie)
      _hackHead.apply(res, args)
    }
  }
  /**
   * 解析请求中的cookie
   * 解析后的cookie是一个对象
   * 对象的key为cookie的key
   *
   * @param {Void}
   * @return {Object} cookies | null
   */
  parse() {
    if (this._req.headers.cookie){
      let cookies = {}
      this._req.headers.cookie.split(';').forEach((cookie) => {
        let parts = cookie.split('=')
        cookies[ parts[0].trim() ] = ( parts[1] || '').trim()
      })
      return cookies
    } else {
      return null
    }
  }
  /**
   * 向cookie列表中添加或修改cookie
   * k是要添加的cookie名
   * v是要添加的cookie值
   * opt是cookie的选项，支持的值有：
   *   maxAge: 存活时间，以秒为单位
   *   expires: 过期时间，格式为GMT_String
   *   domain: 浏览器需要发送该cookie的主机名
   *   path: 需要发送cookie的url路径（包含其子域名）
   *   secure: 只能以https进行传输
   *   httpOnly: 在客户端不能被javascript访问
   *
   * @param {String} k
   * @param {String} v
   * @param {Object} opt
   * @return {Void}
   */
  set(k, v, opt={}) {
    let cookie = `${k}=${v}`
    const keys = Object.keys(opt)
    for( let i = 0; i < keys.length; i++ ) {
      const thisKey = keys[i]
      cookie += `;${thisKey}=${opt[thisKey]}`
    }
    this._cookie.push(cookie)
  }
  /**
   * 删除一个cookie
   * k是要删除的cookie的key值
   *
   * @param {String} k
   * @return {Void}
   */
  remove(k) {
    const regStr = '^' + k + '=[^;]+'
    const reg = new RegExp(regStr)
    for(let i = 0; i < this._cookie.length; i++) {
      const cook = this._cookie[i]
      if(reg.test(cook)) {
        this._cookie[i] = cook + ';expires=Thu, 01 Jan 1970 00:00:00 GMT'
      }
    }
  }
}

module.exports = Cookie
