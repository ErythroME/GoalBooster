import React, { Component } from 'react'
import { createStore, applyMiddleware, combineReduxers, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import boosterApp from './reducers'
import GoalBoosterContainer from './containers/GoalBoosterContainer'

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__
})

function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware))
  return createStore(boosterApp, initialState, enhancer)
}

const store = configureStore({})

const App = () =>
  <Provider store={store}>
    <GoalBoosterContainer />
  </Provider>

export default App
