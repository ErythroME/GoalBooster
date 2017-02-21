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
  },
  [types.EDIT_GOAL](state, action) {
    const { id, name } = action.payload
    return [
      ...state.slice(0, id), {
        id,
        name,
        createAt: new Date(),
        achieved: false
      },
      ...state.slice(id + 1)
    ]
  },
  [types.ACHIEVE_GOAL](state, action) {
    const id = action.payload
    const targetGoal = state[id]
    return [
      ...state.slice(0, id), { ...targetGoal, achieved: true }, ...state.slice(id + 1)
    ]
  },
  [types.RESET_GOAL](state, action) {
    const id = action.payload
    const targetGoal = state[id]
    return [
      ...state.slice(0, id), { ...targetGoal, achieved: false }, ...state.slice(id + 1)
    ]
  }
})

export const progressRecipes = createReducer(0, {
  [types.INCREMENT_PROGRESS](state, action) {
    return state + 1
  },
  [types.DECREMENT_PROGRESS](state, action) {
    return state - 1
  }
})

