import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import boosterApp from './reducers'
import SceneContainer from './containers/SceneContainer'


const store = createStore(boosterApp)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SceneContainer />
      </Provider>
    )
  }
}
