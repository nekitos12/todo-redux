import { Dispatch } from 'redux'

import { IProject, ProjectAction, ProjectActionTypes } from '../../types/project'
import { ITodo } from '../../types/todo'

export const setNewProject = (project: IProject) => {
  return function (dispatch: Dispatch<ProjectAction>) {
    dispatch({ type: ProjectActionTypes.ADD_PROJECT, payload: project })
  }
}

export const deleteProject = (id: string) => {
  return function (dispatch: Dispatch<ProjectAction>) {
    dispatch({ type: ProjectActionTypes.DELETE_PROJECT, payload: id })
  }
}

export const addTodo = (id: string, todo: ITodo) => {
  return function (dispatch: Dispatch<ProjectAction>) {
    dispatch({ type: ProjectActionTypes.ADD_TODO, payload: { id, todo } })
  }
}

export const deleteTodo = (id: string, todoId: string) => {
  return function (dispatch: Dispatch<ProjectAction>) {
    dispatch({ type: ProjectActionTypes.DELETE_TODO, payload: { id, todoId } })
  }
}

export const toggleDoneTodo = (status: string, id: string, todoId: string) => {
  return function (dispatch: Dispatch<ProjectAction>) {
    dispatch({ type: ProjectActionTypes.TOGGLE_DONE_TODO, payload: { status, id, todoId } })
  }
}

export const addNewSub = (id: string, todoId: string, todo: ITodo) => {
  return function (dispatch: Dispatch<ProjectAction>) {
    dispatch({ type: ProjectActionTypes.ADD_NEW_SUB, payload: { id, todoId, todo } })
  }
}

export const toggleDoneSub = (id: string, todoId: string, sub: ITodo) => {
  return function (dispatch: Dispatch<ProjectAction>) {
    dispatch({ type: ProjectActionTypes.TOGGLE_SUB, payload: { id, todoId, sub } })
  }
}
