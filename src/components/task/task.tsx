import React from 'react'

import './task.scss'
import { ITodo } from '../../types/todo'

export default function Task({ title, description }: ITodo) {
  // const revertTimetoString = (time) => {
  //   return !isNaN(time) ? `${Math.floor(time / 60)}:${time - Math.floor(time / 60) * 60}` : ''
  // }
  const onToggleDone = () => {}
  const onToggleEdit = () => {}
  const onDeleted = () => {}
  // const timeToDone = revertTimetoString(timetoComplete)
  return (
    <div className='view'>
      <input className='toggle' onClick={onToggleDone} type='checkbox' defaultChecked={false} />
      <div className='create'>
        <span className='title'>{title}</span>
        <div className='description'>{description}</div>
        <span className='description'> created currentBornTime</span>
      </div>
      <button aria-label='Edit task' className='icon icon-edit' onClick={onToggleEdit} />
      <button aria-label='Delete task' className='icon icon-destroy' onClick={onDeleted} />
    </div>
  )
}
