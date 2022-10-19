import React, { useEffect } from 'react'
import { TodoForm } from './todoForm';
import { TodoProvider, useTodosContext } from './todoContext';

const TodosContent = () => {
  const {
    todos,
    setTodos,
    refetch,
    getTodos,
    addTodo,
    updateTodo,
    completeTodo,
    deleteTodo
  } = useTodosContext();

  useEffect(() => {
    getTodos();
  }, [refetch, setTodos]);

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