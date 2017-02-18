import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import Swipeout from 'react-native-swipeout'

import theme from '../theme'


const Goal = ({ goal, deleteGoal }) => {
  const { id, name } = goal
  const { styles } = theme
  const swipeoutButtons = [
    {
      text: 'Edit',
      backgroundColor: 'lightseagreen'
    },
    {
      text: 'Delete',
      backgroundColor: 'salmon',
      onPress: () => deleteGoal(id)
    }
  ]
  return (
    <Swipeout style={styles.swipeoutStyles}
              right={swipeoutButtons}>
      <View style={styles.goalItem}>
        <Text>{name}</Text>
      </View>
    </Swipeout>
  )
}

export default Goal
