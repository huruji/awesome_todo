import 'whatwg-fetch'
import './theme/theme.scss'

import Parser from './lib/parser'

const $id = (id) => (
  document.getElementById(id)
)

var data = {
}

var eventList = {
  toggleTodo: {
    type: 'click',
    fn: function() {
      const _i = Array
        .prototype
        .indexOf
        .call(
          this.parentNode.parentNode.parentNode.parentNode.children, 
          this.parentNode.parentNode.parentNode
        )
      let _todo = data.todos[_i],
        state
      if(_todo.finish === 'done') {
        state = 'undone'
      } else {
        state = 'done'
      }
      fetch(`/todo/${_todo._id}`, {
        method: 'PUT',
        body: JSON.stringify({finish: state}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(res){
        return res.json()
      }).then(function(json){
        if(json.finish) {
          _todo.finish = 'done'
        } else {
          _todo.finish = 'undone'
        }
      })
    }
  },
  edit: {
    type: 'click',
    fn: function() {
      const _todo = this.parentNode.parentNode.parentNode
      if(!_todo.classList.contains('edit')) {
        _todo.classList.add('edit')
      }
    }
  },
  spread: {
    type: 'click',
    fn: function() {
      const _todo = this.parentNode.parentNode.parentNode
      _todo.classList.toggle('spread')
    }
  },
  update: {
    type: 'click',
    fn: function() {
      const _i = Array
        .prototype
        .indexOf
        .call(
          this.parentNode.parentNode.parentNode.parentNode.parentNode.children, 
          this.parentNode.parentNode.parentNode.parentNode
        )
      const _node = this.parentNode.parentNode.parentNode
      let _todo = data.todos[_i]
      const _value = this.parentNode.previousElementSibling.lastElementChild.value
      fetch(`/todo/${_todo._id}`, {
        method: 'PUT',
        body: JSON.stringify({todo: _value}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(res){
        return res.json()
      }).then(function(json){
        console.log(json)
        _todo.todo = json.todo
        _node.classList.remove('edit')
      })
    }
  },
  remove: {
    type: 'click',
    fn: function() {
      const _i = Array
        .prototype
        .indexOf
        .call(
          this.parentNode.parentNode.parentNode.parentNode.parentNode.children, 
          this.parentNode.parentNode.parentNode.parentNode
        )
      console.log(_i)
      let _todo = data.todos[_i]
      fetch(`/todo/${_todo._id}`, {
        method: 'DELETE',
      }).then(function(res){
        if(res) {
          data.todos.splice(_i, 1)
        }
      })
    }
  }
}

const ipt = document.getElementById('ipt')
function submit() {
  const _value = ipt.firstElementChild.firstElementChild.value
  console.log(_value)
  if(!_value) {
    return
  }
  fetch('/todo', {
    method: 'POST',
    body: _value,
    headers: {
      'Content-Type': 'text/plain'
    }
  }).then(function(res){
    return res.json()
  }).then(function(json){
    console.log(json)
    const todo = {}
    todo._id = json._id
    todo.todo = json.todo
    if(json.finish) {
      todo.finish = 'done'
    } else {
      todo.finish = 'undone'
    }
    data.todos.push(todo)
    ipt.firstElementChild.value = ''
  })
}
ipt.firstElementChild.lastElementChild.addEventListener('click', submit)
ipt.firstElementChild.firstElementChild.addEventListener('keydown', function(e) {
  if(e.key === 'Enter') {
    submit()
  }
})

const statusChange = () => {
  const btns = $id('btns').firstElementChild.children
  switch(location.hash) {
  case '#complete':
    btns[0].classList.remove('active')
    btns[1].classList.add('active')
    btns[2].classList.remove('active')
    if($id('todo').classList.contains('all')) {
      $id('todo').classList.remove('all')
    }
    if($id('todo').classList.contains('todo')) {
      $id('todo').classList.remove('todo')
    }
    if(!$id('todo').classList.contains('complete')) {
      $id('todo').classList.add('complete')
    }
    break
  case '#todo':
    btns[0].classList.remove('active')
    btns[1].classList.remove('active')
    btns[2].classList.add('active')
    if($id('todo').classList.contains('all')) {
      $id('todo').classList.remove('all')
    }
    if($id('todo').classList.contains('complete')) {
      $id('todo').classList.remove('complete')
    }
    if(!$id('todo').classList.contains('todo')) {
      $id('todo').classList.add('todo')
    }
    break
  default:
    btns[0].classList.add('active')
    btns[1].classList.remove('active')
    btns[2].classList.remove('active')
    if($id('todo').classList.contains('complete')) {
      $id('todo').classList.remove('complete')
    }
    if($id('todo').classList.contains('todo')) {
      $id('todo').classList.remove('todo')
    }
    if(!$id('todo').classList.contains('all')) {
      $id('todo').classList.add('all')
    }
  }
}

window.addEventListener('load', () => {
  fetch('/todo').then(function(res) {
    return res.json()
  }).then(function(json) {
    data.todos = []
    if(json) {
      json.forEach(function(todo) {
        let _thisTodo = {}
        _thisTodo.todo = todo.todo
        _thisTodo._id = todo._id
        if(todo.finish) {
          _thisTodo.finish = 'done' 
        } else {
          _thisTodo.finish = 'undone'
        }
        data.todos.push(_thisTodo)
      })
    }
    new Parser('#todo', data, eventList)
    statusChange()
    console.log(data)
  })
})
window.addEventListener('hashchange', statusChange)
