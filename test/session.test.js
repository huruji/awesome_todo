const request = require('supertest')
const should = require('should')
const app = require('./../api/lib/core')()
const Cookie = require('./../api/lib/cookie')
const session = require('./../api/lib/session')
const Model = require('./../api/model/model')
const model = new Model()
const list = [
  {
    name: 'session',
    struct: {
      _id: {type: String},
      username: {type: String}
    },
    type: 'simple'
  }
]
model.setConfig({
  user: 'fsn',
  pwd: '0000',
  db: 'fsn'
})
model.loadModelFromList(list)
const db = model.init()

describe('session', () => {
  app.use('/', (req, res, next) => {
    new Cookie(req, res)
    next()
  })
  app.use('/', (req, res, next) => {
    session.filter(req, db.session, next)
  })
  app.get('/login', (req, res) => {
    session.login(req, db.session, 'mirone', () => {
      res.end()
    })
  })
 app.get('/show', (req, res) => {
    const user = req.username
    if(user) {
      res.end(user)
    } else {
      res.end('empty')
    }
  })
  const agent = request.agent(app)
  describe('#login', () => {
    it('GET /show 时尚未有user', (done) => {
      agent
        .get('/show')
        .end((err, res) => {
          if(err) {
            throw err
          }
          res.text.should.be.exactly('empty')
          done()
        })
    })
    it('GET /login 时添加sid', (done) => {
      agent
        .get('/login')
        .end((err, res) => {
          if(err) {
            throw err
          }
          done()
        })
    })
  })
  describe('#filter', () => {
    after((done) => {
      db.session.removeOne({
        username: 'mirone'
      }, () => {
        done()
      })
    })
    it('GET /show 时显示user', (done) => {
      agent
        .get('/show')
        .end((err, res) => {
          if(err) {
            throw err
          }
          res.text.should.be.exactly('mirone')
          done()
        })
    })
  })
})
