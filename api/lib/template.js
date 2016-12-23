const fs = require('fs')
const path = require('path')

const defaultOpt = {
  dir: 'view',
  extname: '.fst',
  encoding: 'UTF-8'
}

const readTemplate = (file, defaults) => {
  file = path.join(defaults.dir, file + defaults.extname)
  if (file.indexOf(defaults.dir) !== 0) {
    const err = `${file} is not in the template directory`
    throw new Error(err)
  } else {
    try {
      return fs.readFileSync(file, defaults.encoding)
    } catch (e) {}
  }
}

const TemplateEngine = (html, options, defaults) => {
  if(!options) {
    options = {}
  }
  options.include = (file, opt) => {
    return TemplateEngine(readTemplate(file, defaults), opt)
  }
  const re = /<%([^%>]+)?%>/g,
    reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g
  let code = 'var r=[];\n',
    cursor = 0,
    match
  const add = (line, js) => {
      js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
          (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '')
      return add
  }
  while(match = re.exec(html)) {
      add(html.slice(cursor, match.index))(match[1], true)
      cursor = match.index + match[0].length
  }
  add(html.substr(cursor, html.length - cursor))
  code += 'return r.join("");'
  return new Function(code.replace(/[\r\t\n]/g, '')).apply(options)
}

function render(defaults = defaultOpt) {
  return (file, opt) => {
    return TemplateEngine(readTemplate(file, defaults), opt, defaults)
  }
}

module.exports = render
