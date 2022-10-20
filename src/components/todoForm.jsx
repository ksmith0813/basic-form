import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useTodosContext } from './todoContext';

export const TodoForm = ({ todo }) => {
  const { addTodo, updateTodo, completeTodo, deleteTodo } = useTodosContext();

  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() =>  todo && setCurrentTodo(todo), [todo]);

  const isNew = currentTodo?.id === undefined;

  const handleSubmit = () => isNew ? addTodo(currentTodo) : updateTodo(currentTodo);

  return (
    <div>
      <form className='todo-form'>
        <div>
          <input value={currentTodo?.id || ''} type='hidden' name='id'  />
          <span>Description</span>
          <input
            value={currentTodo.description || ''}
            name='description'           
            type='text'
            onChange={(e) => setCurrentTodo({ ...currentTodo, description: e.target.value} )} />
          </div>
          <div>
            <span>Due Date</span>
            <input
              value={currentTodo?.dueDate ? moment(currentTodo.dueDate, 'MM/DD/YYYY').format('MM/DD/YYYY') : ''}
              name='dueDate'
              type='text'
              onChange={(e) => setCurrentTodo({ ...currentTodo, dueDate: e.target.value })} />
          </div>
          <div>
            <span>Priority</span>
            <input
              value={currentTodo?.priority || ''}
              name='priority'
              type='text'
              onChange={(e) => setCurrentTodo({ ...currentTodo, priority: e.target.value })} />
          </div>
          <div>
            <div className='complete'>
              <span>Complete</span>
              <input
                checked={currentTodo?.complete || false}
                name='complete' 
                type='checkbox'
                onChange={(e) => setCurrentTodo({ ...currentTodo, complete: e.target.checked })} />
              </div>
          </div>
        <input className='button' type='submit' onClick={handleSubmit} value={todo ? 'Edit' : 'Create' } />
        {!isNew && (
          <>
            <input className='button' type='submit' onClick={() => completeTodo(todo)} value='Complete' />
            <input className='button' type='submit' onClick={() => deleteTodo(todo)} value='Delete' />
          </>
        )}
      </form>
    </div>
  )
}