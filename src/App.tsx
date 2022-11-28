import React, { useState } from 'react'
import { v4 } from 'uuid'
import './App.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Route, Routes } from 'react-router-dom'

import InputForm from './components/input-form'
import { useActions } from './hooks/useActions'
import { INewProjectForm } from './types/project'
import { useTypedSelector } from './hooks/useTypedSelector'
import ProjectsPage from './pages/projects-page'
import TasksPage from './pages/tasks-page'

interface ITodo {
  id: string
  title: string
  description: string
  createTime: number
  timeInDone: number
  deadlineTime: number
  priority: string
  files?: Array<any>
  status: boolean
  subtasks?: Array<ITodo>
  comments?: Array<any>
}

function App() {
  return (
    <div className='app'>
      <div className='app__container'>
        <header className='app__header'>Todo Uptraider</header>
        <main className='app__main main'>
          <div className='main__wrapper'>
            <Routes>
              <Route path='/' element={<ProjectsPage />} />
              <Route path='/projects/:id/tasks' element={<TasksPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
