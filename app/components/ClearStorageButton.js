import React, { PropTypes } from 'react'
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native'

import theme from '../theme'


const ClearStorageButton = ({ clearStorage }) => {
  const { styles } = theme
  return (
    <View style={styles.addGoal}>
      <TouchableHighlight onPress={clearStorage}>
        <Text style={styles.addGoalText}>Clear Storage</Text>
      </TouchableHighlight>
    </View>
  )
}

export default ClearStorageButton

ClearStorageButton.propTypes = {
  clearStorage: PropTypes.func.isRequired
}
