import { combineReducers } from 'redux'

import { setProjects } from './set-projects'

export const rootReducer = combineReducers({
  projectsData: setProjects,
})

export type RootState = ReturnType<typeof rootReducer>
