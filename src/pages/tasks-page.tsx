import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 } from 'uuid'

import { useTypedSelector } from '../hooks/useTypedSelector'
import InputForm from '../components/input-form'
import { INewProjectForm, IProject } from '../types/project'
import { INewTodoForm, ITodo } from '../types/todo'
import { useActions } from '../hooks/useActions'
import TaskList from '../components/task-list'

const TasksPage = () => {
  const { id } = useParams<{ id: string }>()
  const project: IProject = useTypedSelector(
    state => state.projectsData.projects.find(proj => id === proj.id) || { id: '', todoList: [], title: '' }
  )
  const [isNewTask, setNewTaskDialog] = useState(false)
  const { addTodo } = useActions()
  console.log(project)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INewTodoForm>({
    mode: 'onBlur',
  })
  const onSubmit: SubmitHandler<INewTodoForm> = data => {
    reset()
    console.log(data)
    addTodo(id || '', { ...data, createTime: new Date().toString(), status: false })
    setNewTaskDialog(false)
  }
  console.log(project)
  return (
    <div style={{ padding: '10px' }}>
      {Boolean(project.todoList.length) && <TaskList todoList={project.todoList} />}

      <button onClick={() => setNewTaskDialog(!isNewTask)}>Добавить задачу </button>

      <dialog open={isNewTask} className='new-project'>
        <div className='new-project__wrapper'>
          <form onSubmit={handleSubmit(onSubmit)} className='new-project__inner'>
            <InputForm
              register={register}
              name='title'
              type='text'
              rules={{ required: 'Поле обязательное для заполнения' }}
              label='Название задачи'
              placeholder='название'
            />
            <InputForm
              register={register}
              name='description'
              type='text'
              rules={{ required: 'Поле обязательное для заполнения' }}
              label='Описание задачи'
              placeholder='описание'
            />
            <InputForm
              register={register}
              name='deadline'
              type='date'
              rules={{ required: 'Поле обязательное для заполнения' }}
              label='Срок'
            />
            <InputForm
              register={register}
              name='priority'
              type='text'
              rules={{ required: 'Поле обязательное для заполнения' }}
              label='Приоритет'
              placeholder='название'
            />
            <InputForm
              register={register}
              name='id'
              type='number'
              rules={{ required: 'Поле обязательное для заполнения' }}
              label='Номер'
              placeholder='номер задачи'
            />
            <button type='submit'>Добавить проект</button>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default TasksPage
