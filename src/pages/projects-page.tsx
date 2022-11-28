import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 } from 'uuid'
import { Link } from 'react-router-dom'

import InputForm from '../components/input-form'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'
import { INewProjectForm } from '../types/project'

const ProjectsPage = () => {
  const [isNewProject, setNewProjectDialog] = useState(false)
  const { projects } = useTypedSelector(state => state.projectsData)
  const { setNewProject, deleteProject } = useActions()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INewProjectForm>({
    mode: 'onBlur',
  })
  console.log(projects)
  const onSubmit: SubmitHandler<INewProjectForm> = data => {
    reset()
    setNewProject({ ...data, id: v4(), todoList: [] })
    setNewProjectDialog(false)
  }
  return (
    <div>
      <header className='main__header'>
        <h1>Список проектов</h1>
        <button className='main__add' onClick={() => setNewProjectDialog(!isNewProject)} />
      </header>
      <ol className='main__list'>
        {projects &&
          projects.map(project => (
            <li className='main__list-item project' key={project.id}>
              <Link to={`/projects/${project.id}/tasks`} style={{ width: '100%', height: '100%' }}>
                {project.title}
                <button
                  aria-label='Edit project'
                  className='icon icon-edit'
                  style={{ position: 'absolute', zIndex: '100', right: '50px', top: '1px' }}
                />
              </Link>

              <button
                style={{ position: 'absolute', zIndex: '100', right: '10px', top: '1px' }}
                className='icon icon-destroy'
                onClick={e => {
                  e.stopPropagation()
                  deleteProject(project.id)
                }}
              ></button>
            </li>
          ))}
      </ol>
      <form hidden={!isNewProject} onSubmit={handleSubmit(onSubmit)} className='new-project__inner'>
        <InputForm
          register={register}
          name='title'
          type='text'
          rules={{ required: 'Поле обязательное для заполнения' }}
          label='Название проекта'
          placeholder='проект'
        />
        <button type='submit'>Добавить проект</button>
      </form>
    </div>
  )
}

export default ProjectsPage
