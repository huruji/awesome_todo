function user(req, res) {
  if(req.username) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(req.tpl('user', {
      user: req.username
    }))
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(req.tpl('intro'))
  }
}
module.exports = user
