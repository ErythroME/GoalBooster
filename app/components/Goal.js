import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

import theme from '../theme'


export default class Goal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name } = this.props.goal
    const { styles } = theme
    return (
      <View style={styles.goalItem}>
        <Text>{name}</Text>
      </View>
    )
  }
}
