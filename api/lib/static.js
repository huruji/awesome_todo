const fs = require('fs')

const mime = {
  "html": "text/html",
  "css": "text/css",
  "js": "text/javascript",
  "json": "application/json",
  "gif": "image/gif",
  "ico": "image/x-icon",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png"
}
/**
 * res是serverResponse
 * pathname是静态文件位置
 * ext是文件后缀
 * 
 * @param {Object} res
 * @param {String} pathname
 * @param {String} ext
 * @return {Void}
 */
function readStatic(res, pathname, ext) {
  fs.exists(pathname, (exists) => {
    if(!exists) {
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.write('The request url' + pathname + 'was not found on this server')
      res.end()
    } else {
      fs.readFile(pathname, (err, file) => {
        if(err) {
          res.writeHead(500, {'Content-Type': 'text/plain'})
          res.end(err)
        } else {
          const contentType = mime[ext] || 'text/plain'
          res.writeHead(200, {'Content-Type': contentType})
          res.write(file)
          res.end()
        }
      })
    }
  })
}

module.exports = readStatic
