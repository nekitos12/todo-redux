export interface ITodo {
  id: string
  title: string
  description: string
  createTime: string
  timeInDone?: number
  deadlineTime?: number
  priority: string
  status: boolean
  files?: Array<any>
  subtasks?: Array<ITodo>
  comments?: Array<any>
}

export interface INewTodoForm {
  title: string
  description: string
  deadline: string
  priority: string
  id: string
}

