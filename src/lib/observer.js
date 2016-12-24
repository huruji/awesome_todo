function observer(obj, k, callback) {
  if(Object.prototype.toString.call(k) === '[object Array]') {
    observePath(obj, k, callback)
  } else {
    let old = obj[k]
    if(Object.prototype.toString.call(old) === '[object Array]') {
      observeArray(old, callback)
    } else if (old.toString() === '[object Object]') {
      observeAllKey(old, callback)
    } else {
      Object.defineProperty(obj, k, {
        enumerable: true,
        configurable: true,
        get: function() {
          return old
        },
        set: function(now) {
          if(now !== old) {
            callback.forEach((fn) => {
              fn(old, now)
            })
          }
          old = now
        }
      })
    }
  }
}

function observePath(obj, path, callback) {
  let _path = obj
  let _key
  path.forEach((p, index) => {
    if(parseInt(p) === p) {
      p = parseInt(p)
    }
    if(index < path.length - 1) {
      _path = _path[p]
    } else {
      _key = p
    }
  })
  observer(_path, _key, callback)
}

function observeArray(arr, callback) {
  const oam = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
  const arrayProto = Array.prototype
  const hackProto = Object.create(Array.prototype)
  oam.forEach(function(method){
    Object.defineProperty(hackProto, method, {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function(...arg) {
        let old = arr.slice()
        let now = arrayProto[method].call(this, ...arg)
        callback.forEach((fn) => {
          fn(old, this, ...arg)
        })
        return now
      },
    })
  })
  arr.__proto__ = hackProto
}

function observeAllKey(obj, callback) {
  Object.keys(obj).forEach(function(key){
    observer(obj, key, callback)
  })
}

export default observer
