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
