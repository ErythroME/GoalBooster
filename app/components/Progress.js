import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'

import theme from '../theme'


export default class Progress extends Component {
  render() {
    const { styles } = theme
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{this.props.progress}%</Text>
      </View>
    )
  }
}

Progress.propTypes = {
  progress: PropTypes.number.isRequired
}
