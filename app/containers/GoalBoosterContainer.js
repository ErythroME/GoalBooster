import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreators } from '../actions'
import theme from '../theme'


class GoalBooster extends Component {
  render() {
    const { styles } = theme
    return (
      <View style={styles.container}>
        <Text>Hello GoalBooster!</Text>
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(() => { return {} }, mapDispatchToProps)(GoalBooster)
