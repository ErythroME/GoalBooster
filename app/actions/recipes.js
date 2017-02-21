import * as types from './types'


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
