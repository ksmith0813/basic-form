import moment from 'moment';
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

  const getTodos = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch(() => alert('There was an issue with getting todos.'));
  }

  const getFormData = (todo, isNew = false) => {
    const formData = new FormData();
    if (!isNew) formData.id = parseInt(todo.id);
    formData.description = todo.description;
    formData.dueDate = moment(todo.dueDate).toISOString();
    formData.priority = parseInt(todo.priority);
    formData.complete = todo.complete;
    return formData;
  }

  const fetcher = (method, formData) => {
    debugger;
    const params = formData.id ? `/${formData.id}` : ''
    const currentUrl = `${url}${params}`;

    fetch(currentUrl, { method: method, headers: headers, body: JSON.stringify(formData)})
      .then((response) => response.json())
      .then(() => setRefetch(!refetch));
  }

  const addTodo = (todo) => fetcher('POST', getFormData(todo, true));

  const updateTodo = (todo) => fetcher('PUT', getFormData(todo));

  const completeTodo = (todo) => fetcher('PUT', getFormData({ ...todo, complete: true }));

  const deleteTodo = (id) => {
    fetch(`${url}/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => setRefetch(!refetch));
  }

  const contextValues = {
    todos,
    setTodos,
    refetch,
    setRefetch,
    getTodos,
    getFormData,
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