import { Dispatch } from 'redux'

import { IProject, ProjectAction, ProjectActionTypes } from '../../types/project'
import { ITodo } from "../../types/todo";

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
    dispatch({ type: ProjectActionTypes.ADD_TODO, payload: { id , todo } })
  }
}