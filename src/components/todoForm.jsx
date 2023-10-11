import React, { useEffect, useState } from 'react'
import { useTodosContext } from './todoContext'

export const TodoForm = ({ todo }) => {
  const { addTodo, updateTodo, completeTodo, deleteTodo } = useTodosContext()

  const [currentTodo, setCurrentTodo] = useState({})

  useEffect(() => todo && setCurrentTodo(todo), [todo])

  const isNew = currentTodo?.id === undefined

  const handleSubmit = () => isNew ? addTodo(currentTodo) : updateTodo(currentTodo)

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
        {currentTodo?.id && (
          <div className={`${currentTodo.complete ? '' : 'not '} complete`}>
            {currentTodo.complete ? 'Completed' : 'Not Completed'}
          </div>
        )}
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