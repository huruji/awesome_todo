const should = require('should')
const Model = require('./../api/model/model')
const model = new Model()

const list = [
  {
    name: 'todo',
    struct: {
      todo: {type: String},
      finish: {type: Boolean, default: false}
    }
  }
]
model.setConfig({
  user: 'fsn',
  pwd: '0000',
  db: 'fsn'
})
model.loadModelFromList(list)
const manager = model.init()
const todoManager = manager.todo

describe('ModelItem', () => {

  after((done) => {
    todoManager.remove({}, () => {
      done()
    })
  })

  describe('#add', () => {
    it('添加一条todo', (done) => {
      todoManager.add({
        todo: '这是一条todo'
      }, (doc) => {
        doc.todo.should.be.exactly('这是一条todo')
        doc.finish.should.be.false()
        done()
      })
    })
    it('添加一条已完成的todo', (done) => {
      todoManager.add({
        todo: '这是一条已完成的todo',
        finish: true
      }, (doc) => {
        doc.todo.should.be.exactly('这是一条已完成的todo')
        doc.finish.should.be.true()
        done()
      })
    })
  })

  describe('#update', () => {
    it('更新一条todo的内容', (done) => {
      todoManager.update({
        todo: '这是一条todo'
      }, {
        todo: '这是一条更新了的todo'
      }, (doc) => {
        doc.todo.should.be.exactly('这是一条更新了的todo')
        done()
      })
    })
    it('更新一条todo的状态', (done) => {
      todoManager.update({
        todo: '这是一条更新了的todo'
      }, {
        finish: true
      }, (doc) => {
        doc.finish.should.be.true()
        done()
      })
    })
  })

  describe('#find', () => {
    it('查找多条todo', (done) => {
      todoManager.find({
        finish: true
      }, (docs) => {
        for( let doc of docs ) {
          doc.finish.should.be.true()
        }
        done()
      })
    })
  })

  describe('#findOne', () => {
    it('查找单条todo', (done) => {
      todoManager.findOne({
        todo: '这是一条已完成的todo'
      }, (doc) => {
        doc.todo.should.be.exactly('这是一条已完成的todo')
        done()
      })
    })
  })

  describe('#remove', () => {
    it('删除多条todo', (done) => {
      todoManager.remove({
        finish: true
      }, () => {
        done()
      })
    })
  })

  describe('#removeOne', () => {
    it('删除单条todo', (done) => {
      todoManager.add({
        todo: '这是又一条todo'
      }, (doc) => {
        todoManager.removeOne({
          todo: '这是又一条todo'
        }, () => {
          done()
        })
      })
    })
  })

})
