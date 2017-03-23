import { AsyncStorage } from 'react-native'
import * as types from './types'
import * as keys from '../lib/storageKeys'


export function fetchGoals() {
  // AsyncStorage.clear()
  return async function(dispatch) {
    dispatch(requestGoals())
    try {
      await AsyncStorage.getAllKeys((err, keysArr) => {
        if (!keysArr.length) {
          dispatch(receiveGoals([]))
          dispatch(receiveProgress({}))
          return
        }
        AsyncStorage.multiGet(keysArr, (err, stores) => {
          stores.map((result, i, store) => {
            const key = store[i][0]
            const value = store[i][1]
            switch (key) {
              case keys.GOALS_STORAGE_KEY:
                dispatch(receiveGoals(JSON.parse(value) || []))
                break
              case keys.PROGRESS_STORAGE_KEY:
                dispatch(receiveProgress(JSON.parse(value)))
                break
              default:
                break
            }
          })
        })
      })
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

function receiveProgress(payload) {
  return {
    type: types.RECEIVE_PROGRESS,
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
