import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


let maxIndex = 0
const findGoalIndexById = (goals, id) => goals.findIndex(goal => goal.id === id)
const toggleGoalState = (state, action) => {
  const index = findGoalIndexById(state, action.payload)
  const targetGoal = state[index]
  const currentAchievedState = targetGoal.achieved
  return [
    ...state.slice(0, index),
    { ...targetGoal, achieved: !currentAchievedState },
    ...state.slice(index + 1)
  ]
}

const initialState = {
  fetching: false,
  fetched: false,
  goals: [],
  error: null
}
export const goalRecipes = createReducer(initialState, {
  [types.REQUEST_GOALS](state, action) {
    return { ...state, fetching: true }
  },
  [types.REQUEST_GOALS_ERROR](state, action) {
    return {
      ...state,
      fetching: false,
      error: action.payload
    }
  },
  [types.RECEIVE_GOALS](state, action) {
    return {
      ...state,
      fetching: false,
      fetched: true,
      goals: action.payload
    }
  },
  [types.ADD_GOAL](state, action) {
    const name = action.payload
    const id = maxIndex++
    return {
      ...state,
      goals: [
        ...state.goals,
        {
          id, name,
          createAt: new Date(),
          achieved: false
        }
      ]
    }
  },
  [types.DELETE_GOAL](state, action) {
    const targetId = action.payload.id
    const goals = state.goals
    const index = findGoalIndexById(goals, targetId)
    const currentGoals = [ ...goals ]
    const removed = currentGoals.splice(index, 1)
    return { ...state, goals: currentGoals }
  },
  [types.EDIT_GOAL](state, action) {
    const { id, name } = action.payload
    const index = findGoalIndexById(state, id)
    const goals = state.goals
    const currentGoals = [ ...goals ]
    const removed = currentGoals.splice(index, 1)
    const { createAt, achieved } = removed[0]
    const temp = currentGoals.splice(index, 0, {
      id, name, createAt, achieved
    })
    return { ...state, goals: currentGoals }
  },
  [types.ACHIEVE_GOAL](state, action) {
    return {
      ...state,
      goals: toggleGoalState(state.goals, action)
    }
  },
  [types.RESET_GOAL](state, action) {
    return {
      ...state,
      goals: toggleGoalState(state.goals, action)
    }
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

