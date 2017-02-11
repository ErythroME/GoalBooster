import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreators } from '../actions'
import Header from '../components/Header'
import GoalList from '../components/GoalList'
import theme from '../theme'


class GoalBooster extends Component {
  render() {
    const { styles } = theme
    const goals = [{
      id: 0,
      name: 'Learn TypeScript',
      createAt: new Date(),
      achieved: false
    }]
    return (
      <View style={styles.container}>
        <Header />
        <GoalList goals={goals} />
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(() => { return {} }, mapDispatchToProps)(GoalBooster)
