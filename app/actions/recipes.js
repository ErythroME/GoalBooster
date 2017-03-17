import { AsyncStorage } from 'react-native'
import * as types from './types'


const STORAGE_KEY = 'GoalBoosterStorage'
export function fetchGoals() {
  return async function(dispatch) {
    dispatch(requestGoals())
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      if (value !== null) {
        console.log('get initial value')
      } else {
        console.log('get null')
      }
      dispatch(receiveGoals(value || []))
    } catch (err) {
      console.log('AsyncStorage error: ${err.message}')
    }
  }
}

function requestGoals() {
  return {
    type: types.REQUEST_GOALS
  }
}

function receiveGoals(payload) {
  return {
    type: types.RECEIVE_GOALS,
    payload
  }
}

function requestGoalsError(payload) {
  return {
    type: types.REQUEST_GOALS_ERROR,
    payload
  }
}

export function addGoal(payload) {
  return {
    type: types.ADD_GOAL,
    payload
  }
}

export function deleteGoal(payload) {
  return {
    type: types.DELETE_GOAL,
    payload
  }
}

export function editGoal(payload) {
  return {
    type: types.EDIT_GOAL,
    payload
  }
}

export function achieveGoal(payload) {
  return {
    type: types.ACHIEVE_GOAL,
    payload
  }
}

export function resetGoal(payload) {
  return {
    type: types.RESET_GOAL,
    payload
  }
}

export function incrementProgress() {
  return {
    type: types.INCREMENT_PROGRESS
  }
}

export function decrementProgress() {
  return {
    type: types.DECREMENT_PROGRESS
  }
}
