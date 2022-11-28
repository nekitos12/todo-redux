import React, { useState } from 'react'

import './task.scss'
import { ITodo } from '../../types/todo'

interface TaskProps {
  id: string
  todo: ITodo
  handleDelete: () => void
  handleEdit: () => void
  handleAddSubTask: any
  onHandler: any
  boards: Array<{ id: number; array: Array<ITodo> }>
  setBoards: any
  onStartHandler: any
  handleDoneSub: any
  cl?: boolean
  board: { id: number; array: Array<ITodo>; title: string; status: string }
}

export default function Task({
  handleDelete,
  handleEdit,
  handleDoneSub,
  todo,
  board,
  handleAddSubTask,
  cl,
  onHandler,
  onStartHandler,
}: TaskProps) {
  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }
  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    b: { id: number; array: Array<ITodo>; title: string; status: string },
    item: ITodo
  ) => {
    e.preventDefault()
    onHandler(b, item)
  }
  return (
    <div
      className={`todo ${cl && 'opacity'}`}
      draggable={true}
      onDragOver={e => dragOverHandler(e)}
      onDragStart={e => onStartHandler(e, board, todo)}
      onDrop={e => dropHandler(e, board, todo)}
    >
      <header className='todo__title'>{todo.title}</header>
      <ul>
        {todo.subtasks &&
          todo.subtasks.map(sub => (
            <li style={{ display: 'flex', justifyContent: 'space-between' }} key={sub.todoId}>
              {sub.title}
              <input type='checkbox' onChange={() => handleDoneSub(sub)} />
            </li>
          ))}
      </ul>
      <div className='todo__button-list'>
        <button aria-label='Add task' className='icon icon-add' onClick={handleAddSubTask} />
        <button aria-label='Edit task' className='icon icon-edit' onClick={handleEdit} />
        <button aria-label='Delete task' className='icon icon-destroy' onClick={handleDelete} />
      </div>
    </div>
  )
}
