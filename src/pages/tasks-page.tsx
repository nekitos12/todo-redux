import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 } from 'uuid'

import { useTypedSelector } from '../hooks/useTypedSelector'
import InputForm from '../components/input-form'
import { INewProjectForm, IProject } from '../types/project'
import { INewTodoForm, ITodo } from '../types/todo'
import { useActions } from '../hooks/useActions'
import TaskLists from '../components/task-lists'

const TasksPage = () => {
  const { id } = useParams<{ id: string }>()
  const [isNewTask, setNewTaskDialog] = useState(false)
  const project: IProject = useTypedSelector(
    state => state.projectsData.projects.find(proj => id === proj.id) || { id: '', todoList: [], title: '' }
  )

  console.log(project)
  return (
    <div style={{ padding: '10px' }}>
      <h4>
        <Link to='/'>Вернуться к списку проектов</Link>
      </h4>
      {(Boolean(project.todoList.length) || isNewTask) && (
        <TaskLists
          id={id || ''}
          todoList={project.todoList}
          isNewTask={isNewTask}
          setNewTaskDialog={setNewTaskDialog}
        />
      )}
      <button onClick={() => setNewTaskDialog(!isNewTask)}>Добавить задачу </button>
    </div>
  )
}

export default TasksPage
