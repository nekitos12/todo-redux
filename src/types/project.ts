import { INewTodoForm, ITodo } from './todo'

export interface IProject {
  id: string
  title: string
  todoList: Array<ITodo>
}

export interface INewProjectForm {
  id: string
  title: string
  todoList: any
}

export enum ProjectActionTypes {
  ADD_PROJECT = 'ADD_PROJECT',
  DELETE_PROJECT = 'DELETE_PROJECT',
  ADD_TODO = 'ADD_TODO',
  CHECK_TODO = 'CHECK_TODO',
}
interface AddProject {
  type: ProjectActionTypes.ADD_PROJECT
  payload: IProject
}

interface DeleteProject {
  type: ProjectActionTypes.DELETE_PROJECT
  payload: string
}

interface AddTodo {
  type: ProjectActionTypes.ADD_TODO
  payload: {
    id: string
    todo: ITodo
  }
}

interface DeleteTodo {
  type: ProjectActionTypes.CHECK_TODO
  payload: string
}

export type ProjectAction = AddProject | DeleteProject | AddTodo | DeleteTodo
