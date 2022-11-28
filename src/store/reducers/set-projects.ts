import { IProject, ProjectAction, ProjectActionTypes } from '../../types/project'

const initialState: { projects: Array<IProject> | [] } = {
  projects: [],
}

export const setProjects = (state: { projects: Array<IProject> | [] } = initialState, action: ProjectAction) => {
  switch (action.type) {
    case ProjectActionTypes.ADD_PROJECT:
      return { ...state, projects: [...state.projects, action.payload] }
    case ProjectActionTypes.DELETE_PROJECT:
      return { ...state, projects: state.projects.filter(project => action.payload !== project.id) }
    case ProjectActionTypes.ADD_TODO:
      return {
        ...state,
        projects: state.projects.map(proj =>
          proj.id === action.payload.id ? { ...proj, todoList: [...proj.todoList, action.payload.todo] } : { ...proj }
        ),
      }
    case ProjectActionTypes.DELETE_TODO:
      return {
        ...state,
        projects: state.projects.map(proj =>
          proj.id === action.payload.id
            ? { ...proj, todoList: proj.todoList.filter(todo => todo.todoId !== action.payload.todoId) }
            : { ...proj }
        ),
      }
    case ProjectActionTypes.TOGGLE_DONE_TODO:
      return {
        ...state,
        projects: state.projects.map(proj =>
          proj.id === action.payload.id
            ? {
                ...proj,
                todoList: proj.todoList.map(todo =>
                  todo.todoId === action.payload.todoId ? { ...todo, status: action.payload.status } : { ...todo }
                ),
              }
            : { ...proj }
        ),
      }
    case ProjectActionTypes.ADD_NEW_SUB:
      return {
        ...state,
        projects: state.projects.map(proj =>
          proj.id === action.payload.id
            ? {
                ...proj,
                todoList: proj.todoList.map(todo =>
                  todo.todoId === action.payload.todoId
                    ? {
                        ...todo,
                        subtasks: todo.subtasks ? [...todo.subtasks, action.payload.todo] : [action.payload.todo],
                      }
                    : { ...todo }
                ),
              }
            : { ...proj }
        ),
      }
    case ProjectActionTypes.TOGGLE_SUB:
      return {
        ...state,
        projects: state.projects.map(proj =>
          proj.id === action.payload.id
            ? {
                ...proj,
                todoList: proj.todoList.map(todo =>
                  todo.todoId === action.payload.todoId
                    ? {
                        ...todo,
                        subtasks: todo.subtasks
                          ? todo.subtasks.map(sub =>
                              sub.todoId === action.payload.sub.todoId
                                ? { ...sub, priority: !sub.priority }
                                : { ...sub }
                            )
                          : [],
                      }
                    : { ...todo }
                ),
              }
            : { ...proj }
        ),
      }
    default:
      return { ...state }
  }
}
