const mongoose = require('mongoose')
mongoose.Promise = global.Promise
/**
 * 默认的错误处理函数
 * 参数是错误信息
 *
 * @param {String} err
 * @return {Void}
 */
function deh(err) {
  console.log(err)
}
/**
 * 数据模型类
 * 负责注册可以单条查询删除的模型
 * 
 * @class SimpleModelItem
 */
class SimpleModelItem {
  /**
   * 构造数据模型的schema和model
   * name是数据的名字
   * struct是数据的结构
   * db是实例化的数据库连接
   *
   * @param {String} name
   * @param {Object} struct
   * @param {Object} db
   * @return {Void}
   */
  constructor(name, struct, db) {
    this.schema = new mongoose.Schema(struct)
    this.Model = db.model(name, this.schema)
  }
  /**
   * 添加单条数据
   * values是数据的结构
   * fn是回调函数，参数为添加后的数据
   * errHandler是错误处理函数
   *
   * @param {Object} values
   * @param {Function} fn
   * @param {Function} errHandler
   * @return {Void}
   */
  add(values, fn, errHandler = deh) {
    new this.Model(values).save((err, doc) => {
      if(err) {
        errHandler(err)
      } else {
        fn(doc)
      }
    })
  }
  /**
   * 更新单条数据
   * query是查找数据的依赖
   * newDoc是修改内容
   * fn是回调函数，参数为修改后的数据
   * errHandler是错误处理函数
   *
   * @param {Object} query
   * @param {Object} newDoc
   * @param {Function} fn
   * @param {Function} errHandler
   * @return {Void}
   */
  update(query, newDoc, fn, errHandler = deh) {
    this.Model.findOneAndUpdate(query, newDoc, {new: true}, (err, doc) => {
      if(err) {
        errHandler(err)
      } else {
        fn(doc)
      }
    })
  }
  /**
   * 查找单条数据
   * query是查找数据的依赖
   * fn是回调函数，参数为修改后的数据
   * errHandler是错误处理函数
   *
   * @param {Object} query
   * @param {Function} fn
   * @param {Function} errHandler
   * @return {Void}
   */
  findOne(query, fn, errHandler = deh) {
    this.Model.where(query).findOne((err, doc) => {
      if(err) {
        errHandler(err)
      } else {
        fn(doc)
      }
    })
  }
  /**
   * 删除单条数据
   * query是查找数据的依赖
   * fn是回调函数，参数为修改后的数据
   * errHandler是错误处理函数
   *
   * @param {Object} query
   * @param {Function} fn
   * @param {Function} errHandler
   * @return {Void}
   */
  removeOne(query, fn, errHandler = deh) {
    this.Model.findOneAndRemove(query, (err) => {
      if(err) {
        errHandler(err)
      } else {
        fn()
      }
    })
  }
} 
/**
 * 数据模型类
 * 负责注册可以多条查询删除的模型
 * 
 * @class MultiModelItem
 * @extends SimpleModelItem
 */
class MultiModelItem extends SimpleModelItem {
  constructor(...args) {
    super(...args)
  }
  /**
   * 查找多条数据
   * query是查找数据的依赖
   * fn是回调函数，参数为修改后的数据
   * options是查找数据的选项，支持的内容有：
   *   排序方式 sort
   *   偏移值 skip
   *   数据量 limit
   * errHandler是错误处理函数
   *
   * @param {Object} query
   * @param {Function} fn
   * @param {Object} options
   * @param {Function} errHandler
   * @return {Void}
   */
  find(query, fn, options = {
    sort: {_id: 1},
    skip: 0,
    limit: 0
  }, errHandler = deh) {
    this.Model
      .where(query)
      .sort(options.sort)
      .skip(options.skip)
      .limit(options.limit)
      .exec((err, docs) => {
      if(err) {
        errHandler(err)
      } else {
        fn(docs)
      }
    })
  }
  /**
   * 删除多条数据
   * query是查找数据的依赖
   * fn是回调函数，参数为修改后的数据
   * errHandler是错误处理函数
   *
   * @param {Object} query
   * @param {Function} fn
   * @param {Function} errHandler
   * @return {Void}
   */
  remove(query, fn, errHandler = deh) {
    this.Model.remove(query, (err) => {
      if(err) {
        errHandler(err)
      } else {
        fn()
      }
    })
  }
}

/**
 * 数据模型列表
 * 负责配置连接数据库
 * 
 * @class ModelList
 */
class ModelList {
  /**
   * 初始化数据列表
   * 加载默认配置
   * 添加数据模型类型
   *
   * @param {Void}
   * @return {Void}
   */
  constructor() {
    this.manager = {}
    this._collections = new Set()
    this._cfg = {
      user: '',
      pwd: '',
      host: 'localhost',
      port: '27017',
      db: 'test',
    }
    this._modelType = {
      normal: (...args) => (
        new MultiModelItem(...args)
      ),
      simple: (...args) => {
        new SimpleModelItem(...args)
      }
    }
  }
  /**
   * 数据库配置
   * 未提及部分会遵循默认配置
   * cfg是配置信息，有以下选项：
   *   用户名 user
   *   密码 pwd
   *   主机 host
   *   端口 port
   *   所用数据库 db
   *
   * @param {Object} cfg
   * @return {Void}
   */
  setConfig(cfg) {
    Object.assign(this._cfg, cfg)
  }
  /**
   * 添加一个数据库集合
   * name是集合的名称
   * struct是集合的结构
   * type是数据模型的类型
   *
   * @param {String} name
   * @param {Object} Struct
   * @param {String} type
   * @return {Void}
   */
  addModel(name, struct, type = 'normal') {
    this._collections.add({
      name: name,
      struct: struct,
      type: type
    })
  }
  /**
   *  从列表加载数据结构
   *  列表的结构为
   *  [
   *    {
   *      name: 'name',
   *      struct: {
   *        name: 'name'
   *      },
   *      type: 'type' <optional>
   *    }
   *  ]
   *
   * @param {Array} list
   * @return {Void}
   */
  loadModelFromList(list) {
    for(let i of list) {
      this.addModel(i.name, i.struct)
    }
  }
  /**
   * 数据库连接函数
   * 返回一个mongoose连接的实例
   *
   * @param {Void}
   * @return {Object} db
   */
  connect() {
    let db
    if(this._cfg.user) {
      db = mongoose.connect(`mongodb\:\/\/${this._cfg.user}:${this._cfg.pwd}@${this._cfg.host}:${this._cfg.port}/${this._cfg.db}`)
    } else {
      db = mongoose.connect(`mongodb\:\/\/${this._cfg.host}:${this._cfg.port}/${this._cfg.db}`)
    }
    db.connection.on('error', function(err) {
      console.log(`link error: ${err}`)
    })
    return db
  }
  /**
   * 初始化数据库
   * 添加指定的集合，暴露接口
   *
   * @param {Void}
   * @return {Object} manager
   */
  init() {
    const db = this.connect()
    for (let m of this._collections) {
      this.manager[m.name.toLowerCase()] = this._modelType[m.type](m.name, m.struct, db)
    }
    return this.manager
  }
}
module.exports = ModelList
