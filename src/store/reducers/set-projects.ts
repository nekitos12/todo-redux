import { IProject, ProjectAction, ProjectActionTypes } from '../../types/project'

const initialState: { projects: Array<IProject> | [] } = {
  projects: [],
}

export const setProjects = (state: { projects: Array<IProject> | [] } = initialState, action: ProjectAction) => {
  console.log(state)
  switch (action.type) {
    case ProjectActionTypes.ADD_PROJECT:
      return { ...state, projects: [...state.projects, action.payload] }
    case ProjectActionTypes.DELETE_PROJECT:
      return { ...state, projects: state.projects.filter(project => action.payload !== project.id) }
    case ProjectActionTypes.ADD_TODO:
      const project = state.projects.find(proj => action.payload.id == proj.id)
      return {
        ...state,
        projects: state.projects.map(proj =>
          proj.id === project?.id ? { ...proj, todoList: [...proj.todoList, action.payload.todo] } : { ...proj }
        ),
      }
    default:
      return { ...state }
  }
}
