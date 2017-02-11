import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

import { theme } from '../theme'


export default class Goal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>{this.props.name}</Text>
      </View>
    )
  }
}
