import React, { createContext, useContext, useState } from 'react'

const TodoContext = createContext(null)

const url = 'http://localhost:3001/todos'
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([])
  const [refetch, setRefetch] = useState(false)

  const fetcher = (method, formData) => {
    const params = formData.id ? `/${formData.id}` : ''
    const currentUrl = `${url}${params}`

    fetch(currentUrl, { method: method, headers: headers, body: JSON.stringify(formData)})
      .then((response) => response.json())
      .then(() => setRefetch(!refetch))
  }

  const validate = (todo) => {
    if (!todo.description) {
      alert('Please add a todo description')
      return false
    }

    return true
  }

  const addTodo = (todo) => validate(todo) && fetcher('POST', todo)

  const updateTodo = (todo) => validate(todo) && fetcher('PUT', todo)

  const completeTodo = (todo) => validate(todo) && fetcher('PUT', { ...todo, complete: true })

  const deleteTodo = (todo) => fetcher('DELETE', todo)

  const contextValues = {
    url,
    todos,
    setTodos,
    refetch,
    addTodo,
    updateTodo,
    completeTodo,
    deleteTodo
  }

  return (
    <TodoContext.Provider value={contextValues}>{children}</TodoContext.Provider>
  )
}

export const useTodosContext = () => useContext(TodoContext)