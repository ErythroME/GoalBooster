import { AsyncStorage } from 'react-native'

import createReducer from '../lib/createReducer'
import * as types from '../actions/types'
import * as keys from '../lib/storageKeys'


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

const getMaxIndex = async () => {
  try {
    return await AsyncStorage.getItem(keys.INDEX_STORAGE_KEY)
  } catch (err) {
    console.log(`AsyncStorage error: ${err.message}`)
  }
}
const updateMaxIndex = async (index) => {
  try {
    await AsyncStorage.setItem(keys.INDEX_STORAGE_KEY, JSON.stringify(index))
  } catch (err) { console.log(`AsyncStorage error: ${err.message}`) }
}
let maxIndex = 0
getMaxIndex().then((value) => {
  maxIndex = value
})

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
      goals: action.payload || []
    }
  },
  [types.ADD_GOAL](state, action) {
    const name = action.payload
    const id = maxIndex++
    updateMaxIndex(maxIndex)
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
    const goals = state.goals
    const index = findGoalIndexById(goals, id)
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
  total: 0,
  achieved: 0
}
const updateProgressStorage = async (progressObj) => {
  try {
    await AsyncStorage.setItem(keys.PROGRESS_STORAGE_KEY, JSON.stringify(progressObj))
  } catch(err) { `AsyncStorage error: ${err.message}` }
}
export const progressRecipes = createReducer(initialProgressObj, {
  [types.RECEIVE_PROGRESS](state, action) {
    const progressObj = action.payload.total ? action.payload : state
    return { ...progressObj }
  },
  [types.CLEAR_PROGRESS](state, action){
    return { ...initialProgressObj }
  },
  [types.ADD_GOAL](state, action) {
    const { achieved, total } = state
    const nextProgress = { ...state, total: total + 1 }
    updateProgressStorage(nextProgress)
    return nextProgress
  },
  [types.DELETE_GOAL](state, action) {
    const { achieved, total } = state
    const isGoalAchieved = action.payload.achieved
    const currentAchieved = isGoalAchieved ? achieved - 1 : achieved
    const nextProgress = { achieved: currentAchieved, total: total - 1 }
    updateProgressStorage(nextProgress)
    return nextProgress
  },

  [types.ACHIEVE_GOAL](state, action) {
    const { achieved, total } = state
    const nextProgress = { ...state, achieved: achieved + 1 }
    updateProgressStorage(nextProgress)
    return nextProgress
  },
  [types.RESET_GOAL](state, action) {
    const { achieved, total } = state
    const nextProgress = { ...state, achieved: achieved - 1 }
    updateProgressStorage(nextProgress)
    return nextProgress
  }
})
