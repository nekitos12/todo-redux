import React, { useEffect, useState } from 'react'
import './task-lists.scss'
import cn from 'classnames'
import { SubmitHandler, useForm } from 'react-hook-form'

import Task from '../task'
import { INewTodoForm, ITodo } from '../../types/todo'
import { useActions } from '../../hooks/useActions'
import InputForm from '../input-form'

interface TaskListProps {
  id: string
  isNewTask?: boolean
  setNewTaskDialog: (a: boolean) => void
  todoList: ITodo[]
}

export default function TaskLists({ id, todoList, isNewTask, setNewTaskDialog }: TaskListProps) {
  const [boards, setBoards] = useState([] as Array<{ id: number; array: Array<ITodo>; title: string; status: string }>)
  const [currentTask, setCurrentTask] = useState({} as ITodo)
  const { deleteTodo, addTodo, toggleDoneTodo, addNewSub, toggleDoneSub } = useActions()
  const [isEdit, setTaskEditDialog] = useState(false)
  const [isNewSubTask, setNewSubTask] = useState(false)
  const [currentBoard, setCurrentBoard] = useState(
    {} as { id: number; array: Array<ITodo>; title: string; status: string }
  )
  const [currentItem, setCurrentItem] = useState({} as ITodo)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INewTodoForm>({
    mode: 'onBlur',
  })
  const getFilterElems = (status: string) => {
    return todoList.filter(todo => todo.status == status)
  }
  useEffect(() => {
    setBoards([
      { id: 1, array: getFilterElems('done'), title: 'Done', status: 'done' },
      { id: 2, array: getFilterElems('development'), title: 'Development', status: 'development' },
      { id: 3, array: getFilterElems('queue'), title: 'Queue', status: 'queue' },
    ])
  }, [isNewTask, isEdit, todoList, currentTask])
  const onSubmit: SubmitHandler<INewTodoForm> = data => {
    reset()
    alert(JSON.stringify(data))
    if (isEdit) {
      deleteTodo(id, currentTask.todoId)
      addTodo(id, { ...data, todoId: currentTask.todoId, priority: false })
      setTaskEditDialog(false)
      return
    }
    if (isNewSubTask) {
      addNewSub(id, currentTask.todoId, { ...data, priority: false })
      setNewSubTask(false)
      return
    }
    addTodo(id || '', { ...data, createTime: new Date().toString(), priority: false })
    setNewTaskDialog(false)
    setCurrentTask({} as ITodo)
  }
  const onEdit = (todo: ITodo) => {
    setTaskEditDialog(true)
    setCurrentTask(todo)
  }
  const onDeleted = (prid: string, todoId: string) => {
    deleteTodo(prid, todoId)
  }

  function onStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    board: { id: number; array: Array<ITodo>; title: string; status: string },
    item: ITodo
  ) {
    setCurrentItem(item)
  }
  function onHandler(board: { id: number; array: Array<ITodo>; title: string; status: string }, item: ITodo) {
    toggleDoneTodo(board.status, id, currentItem.todoId)
  }
  const onAddSubTask = (todo: ITodo) => {
    setNewSubTask(true)
    setCurrentTask(todo)
  }
  const onDoneSub = (sub: ITodo, todo: ITodo) => {
    toggleDoneSub(id, todo.todoId, sub)
  }
  return (
    <>
      <div className='todo-lists'>
        {boards.map(board => {
          return (
            <div className='todo-list' key={board.id}>
              <h3 style={{ textAlign: 'center' }}>{board.title}</h3>
              <ul>
                {!board.array.length ? (
                  <li style={{ minHeight: '71px' }}>
                    <Task
                      handleDoneSub='ds'
                      handleAddSubTask={onStartHandler}
                      onStartHandler={onStartHandler}
                      cl={true}
                      onHandler={onHandler}
                      todo={{ todoId: '0', status: board.status, title: '', priority: false }}
                      id={id}
                      boards={boards}
                      setBoards={setBoards}
                      board={board}
                      handleDelete={() => onDeleted(id, '0')}
                      handleEdit={() => onEdit({ todoId: '0', status: board.status, title: '', priority: false })}
                    />
                  </li>
                ) : (
                  board.array.map((todo, ind, array) => {
                    return (
                      <li key={todo.todoId} style={{ minHeight: '71px' }}>
                        <Task
                          handleDoneSub={(sub: ITodo) => onDoneSub(sub, todo)}
                          handleAddSubTask={() => onAddSubTask(todo)}
                          onStartHandler={onStartHandler}
                          todo={todo}
                          id={id}
                          boards={boards}
                          setBoards={setBoards}
                          onHandler={onHandler}
                          board={board}
                          handleDelete={() => onDeleted(id, todo.todoId)}
                          handleEdit={() => onEdit(todo)}
                        />
                      </li>
                    )
                  })
                )}
              </ul>
            </div>
          )
        })}
      </div>

      <dialog open={isNewTask || isEdit || isNewSubTask} className='new-project'>
        <div className='new-project__wrapper'>
          <form onSubmit={handleSubmit(onSubmit)} className='new-project__inner'>
            <InputForm
              register={register}
              name='title'
              value={!isNewSubTask ? currentTask.title : ''}
              type='text'
              rules={{ required: 'Поле обязательное для заполнения' }}
              label='Название задачи'
              placeholder='название'
            />
            <InputForm
              register={register}
              name='description'
              value={!isNewSubTask ? currentTask.description : ''}
              type='text'
              rules={{ required: 'Поле обязательное для заполнения' }}
              label='Описание задачи'
              placeholder='описание'
            />
            <InputForm
              register={register}
              name='deadline'
              value={!isNewSubTask ? currentTask.deadline : ''}
              type='date'
              rules={{ required: 'Поле обязательное для заполнения' }}
              label='Срок'
            />
            <label htmlFor='status'> Статус </label>
            <select {...register('status', { required: 'Поле обязательное для заполнения' })} id='status' name='status'>
              <option value='development'>Development</option>
              <option value='queue'>Queue</option>
              <option value='done'>Done</option>
            </select>
            <InputForm
              register={register}
              name='todoId'
              type='number'
              value={!isNewSubTask ? currentTask.todoId : ''}
              rules={{ required: 'Поле обязательное для заполнения' }}
              label='Номер'
              placeholder='номер задачи'
            />
            <button type='submit'>Сохранить задачу</button>
          </form>
        </div>
      </dialog>
    </>
  )
}
