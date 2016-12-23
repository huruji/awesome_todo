const http = require('http')
const url = require('url')
const path = require('path')

const handleStatic = require('./static')

function core() {
  //默认静态文件夹名称
  let _static = 'static'

  let app = (req, res) => {
    //获取请求类型
    const method = req.method.toLowerCase()
    //解析请求url
    const urlObj = url.parse(req.url, true)
    //获取请求的路径
    const pathname = urlObj.pathname
    //获取请求的后缀名
    const ext = path.extname(pathname).slice(1)
    //判断是否有后缀
    if(ext) {
      handleStatic(res, _static + pathname, ext)
    } else {
      let i = 0
      !function next() {
        if( i >= app.routes.length ) {
          res.end(`Cannot ${method} ${pathname}`)
        } else {
          const route = app.routes[i++]
          if (route.method === 'middleware') {
            //如果是中间件
            if(route.path === '/' 
              || route.path === pathname 
              || pathname.startsWith(route.path + '/')) {
              route.fn(req, res, next)
            } else {
              next()
            }
          } else {
            if((route.method === method
              || route.method === 'all')
              && (route.path === pathname
              || route.path === '*')) {
              route.fn(req, res)
            } else {
              //尝试模式匹配
              const r = '^' + route.path.replace(/:[A-Za-z0-9][^\/]+/g, '[A-Za-z0-9][^\/]+') + '$'
              const reg = new RegExp(r)
              if(route.path.includes(':')
                && (route.method === method
                || route.method === 'all')
                && reg.test(pathname)) {
                let index = 0
                const pathArray = route.path.split('/')
                let target = pathname.split('/')
                let params = new Map()
                //比对得出当前路由和注册的路由的关系
                //记录路由关系到params对象中
                pathArray.forEach((path) => {
                  if(/\:/.test(path)) {
                    params[path] = target[index]
                  }
                  index++
                })
                req.params = params
                route.fn(req, res)
              } else {
                next()
              }
            }
          }
        }
      }()
    }
  }
  //自定义默认文件夹
  app.setStatic = (path) => {
    _static = path
  }
  //创建路由池
  app.routes = []
  //定义各种请求方法对应的函数
  const methods = ['get', 'post', 'put', 'options', 'delete', 'all']
  methods.forEach((method) => {
    app[method] = (path, fn) => {
      app.routes.push({
        method: method,
        path: path,
        fn: fn
      })
    }
  })
  //中间件注册函数
  app.use = (path, fn) => {
	  app.routes.push({
      method: 'middleware',
      path: path,
      fn: fn
    })
  }
  //创建服务器并监听
  app.listen = (...config) => {
    http.createServer(app).listen(...config, () => {
      console.log(`Server running at ${config[1]}\:${config[0]}.`)
    })
  }

  return app
}

module.exports = core
