const querystring = require('querystring')

// GET /todo
function listTodo(req, res, db) {
  db.todo.find({username: req.username}, (docs) => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(docs))
  })
}

// GET /todo/:id
function getTodo(req, res, db) {
  db.findOne({
    _id: req.params[':id']
  }, (doc) => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(doc))
  }, () => {
    res.writeHead(500, {"Content-Type": "text/plain"})
    res.end('Please try later')
  })
}

// POST /todo
function addTodo(req, res, db) {
  req.on('data', function(chunk) {
    const data = chunk.toString()
    db.todo.add({
      todo: data,
      username: req.username
    }, (doc) => {
      res.end(JSON.stringify(doc))
    }, () => {
      res.writeHead(500, {"Content-Type": "text/plain"})
      res.end('Please try later')
    })
  })
}

// PUT /todo/:id
function updateTodo(req, res, db) {
  req.on('data', function(chunk) {
    const data = JSON.parse(chunk.toString())
    let query = {}
    if(data.finish) {
      let toggle = false
      if(data.finish === 'done') {
        toggle = true
      }
      query.finish = toggle
    } else if (data.todo) {
      query.todo = data.todo
    }
    db.todo.update({
      _id: req.params[':id']
    }, query, (doc) => {
      res.writeHead(201, {'Content-Type':'application/json'})
      res.end(JSON.stringify(doc))
    }, () => {
      res.writeHead(500, {"Content-Type": "text/plain"})
      res.end('Please try later')
    })
  })
}

// DELETE /todo/:id
function deleteTodo(req, res, db) {
  db.todo.removeOne({
    _id: req.params[':id']
  }, () => {
    res.end()
  }, () => {
    res.writeHead(500, {"Content-Type": "text/plain"})
    res.end('Please try later')
  })
}

module.exports = {
  listTodo: listTodo,
  addTodo: addTodo,
  updateTodo, updateTodo,
  deleteTodo: deleteTodo
}
