import { combineReducers } from 'redux'

import * as recipesReducer from './recipes'


const boosterApp = combineReducers(Object.assign({}, recipesReducer))

export default boosterApp
