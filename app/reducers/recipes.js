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

let maxIndex = 1
const findGoalIndexById = (goals, id) => goals.findIndex(goal => goal.id === id)

export const goalRecipes = createReducer(defaultGoals, {
  [types.ADD_GOAL](state, action) {
    const name = action.payload
    const id = ++maxIndex
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
    const targetId = action.payload.id
    const index = findGoalIndexById(state, targetId)
    const currentState = [ ...state ]
    const removed = currentState.splice(index, 1)
    return currentState
  },
  [types.EDIT_GOAL](state, action) {
    const { id, name } = action.payload
    const index = findGoalIndexById(state, id)
    const currentState = [ ...state ]
    const removed = currentState.splice(index, 1)
    const { createAt, achieved } = removed[0]
    const temp = currentState.splice(index, 0, {
      id, name, createAt, achieved
    })
    return currentState
  },
  [types.ACHIEVE_GOAL](state, action) {
    const id = action.payload
    const index = findGoalIndexById(state, id)
    const targetGoal = state[index]
    return [
      ...state.slice(0, index), { ...targetGoal, achieved: true }, ...state.slice(index + 1)
    ]
  },
  [types.RESET_GOAL](state, action) {
    const id = action.payload
    const index = findGoalIndexById(state, id)
    const targetGoal = state[index]
    return [
      ...state.slice(0, index), { ...targetGoal, achieved: false }, ...state.slice(index + 1)
    ]
  }
})

const initialProgressObj = {
  total: 2,
  achieved: 0
}
export const progressRecipes = createReducer(initialProgressObj, {
  [types.ADD_GOAL](state, action) {
    const { achieved, total } = state
    return {
      ...state,
      total: total + 1
    }
  },
  [types.DELETE_GOAL](state, action) {
    const { achieved, total } = state
    const isGoalAchieved = action.payload.achieved
    const currentAchieved = isGoalAchieved ? achieved - 1 : achieved
    return {
      achieved: currentAchieved,
      total: total - 1
    }
  },

  [types.ACHIEVE_GOAL](state, action) {
    const { achieved, total } = state
    return {
      ...state,
      achieved: achieved + 1
    }
  },
  [types.RESET_GOAL](state, action) {
    const { achieved, total } = state
    return {
      ...state,
      achieved: achieved - 1
    }
  }
})

