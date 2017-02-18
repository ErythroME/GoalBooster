import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


const defaultGoals = [
  {
    id: 0,
    name: 'Learn TypeScript',
    createAt: new Date(),
    achieved: false
  }, {
    id: 1,
    name: 'Read React Native Tutorials',
    createAt: new Date(),
    achieved: false
  }
]

export const goalRecipes = createReducer(defaultGoals, {
  [types.ADD_GOAL](state, action) {
    const { id, name } = action.payload
    return [
      ...state,
      {
        id,
        name,
        createAt: new Date(),
        achieved: false
      }
    ]
  },
  [types.DELETE_GOAL](state, action) {
    const index = action.payload
    return [
      ...state.slice(0, index), ...state.slice(index + 1)
    ]
  }
})

