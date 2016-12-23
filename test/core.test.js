const request = require('supertest')
const should = require('should')
const app = require('./../api/lib/core')()

app.get('/', (req, res) => {
  res.end('home')
})

app.use('/mirone', (req, res, next) => {
  req.mirone = 'mirone'
  next()
})

app.get('/mirone', (req, res) => {
  res.end(req.mirone)
}) 

app.get('/todo', (req, res) => {
  res.end('todo')
})

app.get('/todo/:id', (req, res) => {
  res.end(req.params[':id'])
})

app.get('/todo/:id/:content', (req, res) => {
  res.end(req.params[':id'] + req.params[':content'])
})

describe('core', () => {
  describe('路由测试', () => {
    it('GET / 应该返回home', (done) => {
      request(app)
        .get('/')
        .end((err, res) => {
          if(err) {
            throw err
          }
          res.text.should.be.exactly('home')
          done()
        })
    })
    it('GET /todo 应该返回todo', (done) => {
      request(app)
        .get('/todo')
        .end((err, res) => {
          if(err) {
            throw err
          }
          res.text.should.be.exactly('todo')
          done()
        })
    })
    it('GET /todo/:id 应该返回:id', (done) => {
      request(app)
        .get('/todo/qwer123')
        .end((err, res) => {
          if(err) {
            throw err
          }
          res.text.should.be.exactly('qwer123')
          done()
        })
    })
    it('GET /todo/:id/:content 应该返回:id + :content', (done) => {
      request(app)
        .get('/todo/qwer123/QAQ')
        .end((err, res) => {
          if(err) {
            throw err
          }
          res.text.should.be.exactly('qwer123QAQ')
          done()
        })
    })
  })
  describe('中间件测试', () => {
    it('GET /mirone 应该返回mirone', (done) => {
      request(app)
        .get('/mirone')
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
