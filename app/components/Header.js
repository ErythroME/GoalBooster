import React, { Component } from 'react'
import { View, Text } from 'react-native'

import theme from '../theme'


export default class Header extends Component {
  render() {
    const { styles } = theme
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>20%</Text>
      </View>
    )
  }
}
