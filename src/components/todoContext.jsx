import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext(null);

const url = 'http://localhost:3001/tasks';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const fetcher = (method, formData) => {
    const params = formData.id ? `/${formData.id}` : ''
    const currentUrl = `${url}${params}`;

    fetch(currentUrl, { method: method, headers: headers, body: JSON.stringify(formData)})
      .then((response) => response.json())
      .then(() => setRefetch(!refetch));
  }

  const addTodo = (todo) => fetcher('POST', todo);

  const updateTodo = (todo) => fetcher('PUT', todo);

  const completeTodo = (todo) => fetcher('PUT', { ...todo, complete: true });

  const deleteTodo = (id) => {
    fetch(`${url}/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => setRefetch(!refetch));
  }

  const contextValues = {
    url,
    todos,
    setTodos,
    refetch,
    addTodo,
    updateTodo,
    completeTodo,
    deleteTodo
  };

  return (
    <TodoContext.Provider value={contextValues}>{children}</TodoContext.Provider>
  )
}

export const useTodosContext = () => useContext(TodoContext);