const request = require('supertest')
const should = require('should')
const Cookie = require('./../api/lib/cookie')
const app = require('./../api/lib/core')()

describe('Cookie', () => {
  app.use('/', (req, res, next) => {
    new Cookie(req, res)
    next()
  })

  app.get('/', (req, res) => {
    req.cookie.set('user', 'mirone')
    res.end()
  })

  app.get('/user', (req, res) => {
    const cookieObj = req.cookie.parse()
    if(cookieObj) {
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.end(cookieObj.user)
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.end()
    }
  })

  app.get('/update', (req, res) => {
    req.cookie.set('user', 'homura')
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end()
  })

  app.get('/delete', (req, res) => {
    req.cookie.remove('user')
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end()
  })

  const agent = request.agent(app)

  describe('#set', () => {
    it('GET / 时添加cookie: user=mirone', (done) => {
      agent
        .get('/')
        .expect('set-cookie', 'user=mirone', done)
    })
  })
  describe('#parse', () => {
    it('GET /user 时返回mirone', (done) => {
      agent
        .get('/user')
        .end((err, res) => {
          if(err) {
            throw err
          }
          res.text.should.be.exactly('mirone')
          done()
        })
    })
  })
  describe('#update', () => {
    before((done) => {
      agent
        .get('/update')
        .end((err, res) => {
          if(err) {
            throw err
          }
          done()
        })
    })
    it('GET /update 时更新cookie的user为homura', (done) => {
      agent
        .get('/user')
        .end((err, res) => {
          if(err) {
            throw err
          }
          res.text.should.be.exactly('homura')
          done()
        })
    })
  })
  describe('#remove', () => {
    before((done) => {
      agent
        .get('/delete')
        .end((err, res) => {
          if(err) {
            throw err
          }
          done()
        })
    })
    it('GET /delete 时删除cookie的user', (done) => {
      agent
        .get('/user')
        .end((err, res) => {
          if(err) {
            throw err
          }
          res.text.should.be.exactly('')
          done()
        })
    })
  })
})
