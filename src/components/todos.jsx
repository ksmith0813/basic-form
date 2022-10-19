import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { TodoForm } from './todoForm';

const url = 'http://localhost:3001/tasks';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch(() => alert('There was an issue with getting todos.'))
  }, [refetch])

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
    const params = formData.id ? `/${formData.id}` : ''
    const currentUrl = `${url}${params}`;

    fetch(currentUrl, { method: method, headers: headers, body: JSON.stringify(formData)})
      .then((response) => response.json())
      .then(() => setRefetch(!refetch));
  }

  const addTodo = (todo) => fetcher('POST', getFormData(todo, true));

  const updateTodo = (todo) => fetcher('PUT', getFormData(todo));

  const completeTodo = (id) => fetcher('PUT', {id: id, complete: true});

  const deleteTodo = (id) => {
    fetch(`${url}/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => setRefetch(!refetch));
  }

  const todoFormsContent = todos.map((todo) => (
    <TodoForm
      key={todo.id}
      todo={todo}
      onSubmit={updateTodo}
      onDelete={deleteTodo}
      onComplete={completeTodo} />
  ));

  const todosContent = todos?.length ? (
    <div className='existing-todos'>
      <b>Manage Todos</b>
      {todoFormsContent}
    </div>
  ) : undefined;

  return (
    <div className='todo-container'>
      <div>
        <b>Add New Todo</b>
        <TodoForm onSubmit={addTodo} />
        {todosContent}
      </div>
    </div>
  );
}