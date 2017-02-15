import * as types from './types'


export function addGoal(payload) {
  return {
    type: types.ADD_GOAL,
    payload
  }
}
