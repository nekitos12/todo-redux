export interface ITodo {
  todoId: string
  title: string
  description?: string
  createTime?: string
  timeInDone?: number
  deadline?: string
  priority: boolean
  status: string
  files?: Array<any>
  subtasks?: Array<ITodo> | []
  comments?: Array<IComment>
}

interface IComment {
  text: string
  comments?: Array<IComment>
}

export interface INewTodoForm {
  title: string
  description: string
  deadline: string
  status: string
  todoId: string
}
