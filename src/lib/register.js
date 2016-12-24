import observer from './observer'

class Register {
  constructor() {
    this.routes = []
  }

  regist(obj, k, fn) {
    const _i = this.routes.find(function(el) {
      if((el.key === k || el.key.toString() === k.toString()) 
        && Object.is(el.obj, obj)) {
        return el
      }
    })
    if(_i) {
      _i.fn.push(fn)
    } else {
      this.routes.push({
        obj: obj,
        key: k,
        fn: [fn]
      })
    }
  }

  build() {
    this.routes.forEach((route) => {
      observer(route.obj, route.key, route.fn)
    })
  }
}

export default Register
