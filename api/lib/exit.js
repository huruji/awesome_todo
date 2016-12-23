module.exports = function() {
  process.setMaxListeners(0)
  process.on('uncaughtException', function(err) {
    console.log(err.stack)
  })
  process.stdin.resume()
  process.on('SIGINT', function() {
    console.log('\n')
    console.log('Good Day')
    process.exit(2)
  })
}
