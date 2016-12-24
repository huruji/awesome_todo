function toggleTodo(data, todoEl) {
  const _i = Array
    .prototype
    .indexOf
    .call(todoEl.parentNode.children, todoEl)
  const _todo = data.todos[_i]
  let state
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
  }).then((res) => res.json())
    .then((json) => {
      if(json.finish) {
        _todo.finish = 'done'
      } else {
        _todo.finish = 'undone'
      }
    })
}

function updateTodo(data) {
  const _todoEl = this.parentNode.parentNode.parentNode.parentNode
  const _i = Array
    .prototype
    .indexOf
    .call(
      _todoEl.parentNode.children, 
      _todoEl
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
  }).then((res) => res.json()).then((json) => {
    _todo.todo = json.todo
    _node.classList.remove('edit')
  })
}

function removeTodo(data, todoEl) {
  const _i = Array
    .prototype
    .indexOf
    .call(todoEl.parentNode.children, todoEl)
  let _todo = data.todos[_i]
  fetch(`/todo/${_todo._id}`, {
    method: 'DELETE',
  }).then(function(res){
    if(res) {
      data.todos.splice(_i, 1)
    }
  })
}

export {toggleTodo, updateTodo, removeTodo}
