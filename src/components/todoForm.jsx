import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useTodosContext } from './todoContext';

export const TodoForm = ({ todo }) => {
  const { addTodo, updateTodo, completeTodo, deleteTodo } = useTodosContext();

  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (todo) {
      setId(todo.id);
      setDescription(todo.description);
      setDueDate(todo.dueDate);
      setPriority(todo.priority);
      setComplete(todo.complete);
    }
  }, [todo])

  const isNew = todo?.id === undefined;

  const handleSubmit = () => {
    const formData = { id, description, dueDate, priority, complete };
    isNew ? addTodo(formData) : updateTodo(formData);
  }

  return (
    <div>
      <form className='todo-form'>
        <div>
          <input value={id || ''} type='hidden' name='id'  />
          <span>Description</span>
          <input
            value={description || ''}
            name='description'           
            type='text'
            onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <span>Due Date</span>
            <input
              value={dueDate ? moment(dueDate).format('MM/DD/YYYY') : ''}
              name='dueDate'
              type='text'
              onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <div>
            <span>Priority</span>
            <input
              value={priority || ''}
              name='priority'
              type='text'
              onChange={(e) => setPriority(e.target.value)} />
          </div>
          <div>
            <div className='complete'>
              <span>Complete</span>
              <input
                checked={complete}
                name='complete' 
                type='checkbox'
                onChange={(e) => setComplete(e.target.checked)} />
              </div>
          </div>
        <input className='button' type='submit' onClick={handleSubmit} value={todo ? 'Edit' : 'Create' } />
        {!isNew && (
          <>
            <input className='button' type='submit' onClick={() => completeTodo(todo)} value='Complete' />
            <input className='button' type='submit' onClick={() => deleteTodo(todo.id)} value='Delete' />
          </>
        )}
      </form>
    </div>
  )
}