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
  DELETE_TODO = 'DELETE_TODO',
  TOGGLE_DONE_TODO = 'TOGGLE_DONE_TODO',
  ADD_NEW_SUB = 'ADD_NEW_SUB',
  TOGGLE_SUB = 'TOGGLE_SUB',
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
  type: ProjectActionTypes.DELETE_TODO
  payload: {
    id: string
    todoId: string
  }
}
interface ToggleDoneTodo {
  type: ProjectActionTypes.TOGGLE_DONE_TODO
  payload: {
    status: string
    id: string
    todoId: string
  }
}

interface AddNewSub {
  type: ProjectActionTypes.ADD_NEW_SUB
  payload: {
    id: string
    todoId: string
    todo: ITodo
  }
}

interface ToggleSub {
  type: ProjectActionTypes.TOGGLE_SUB
  payload: {
    id: string
    todoId: string
    sub: ITodo
  }
}

export type ProjectAction = AddProject | DeleteProject | AddTodo | DeleteTodo | ToggleDoneTodo | AddNewSub | ToggleSub
