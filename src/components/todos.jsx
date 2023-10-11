import React, { useEffect } from 'react'
import { TodoForm } from './todoForm'
import { TodoProvider, useTodosContext } from './todoContext'

const TodosContent = () => {
  const { url, todos, refetch, setTodos } = useTodosContext()

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch(() => alert('There was an issue with getting todos.'));
  }, [url, refetch, setTodos])

  const todoFormsContent = todos.map((todo) => <TodoForm key={todo.id} todo={todo} />)

  const todosContent = todos.length > 0 && (
    <div className='existing-todos'>
      <b>Manage Todos</b>
      {todoFormsContent}
    </div>
  )

  return (
    <div className='todo-container'>
       <b>Add New Todo</b>
      <TodoForm />
      {todosContent}
    </div>
  )
}

export const Todos = () => (
  <TodoProvider>
    <TodosContent />
  </TodoProvider>
)