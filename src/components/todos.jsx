import React, { useEffect } from 'react'
import { TodoForm } from './todoForm';
import { TodoProvider, useTodosContext } from './todoContext';

const TodosContent = () => {
  const { url, todos, refetch, setTodos, addTodo, updateTodo, completeTodo, deleteTodo } = useTodosContext();

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch(() => alert('There was an issue with getting todos.'));
  }, [url, refetch, setTodos]);

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

export const Todos = () => (
  <TodoProvider>
    <TodosContent />
  </TodoProvider>
);