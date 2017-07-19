import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import theme from '../theme'

const ClearStorageButton = ({ clearStorage }) => {
  const { styles } = theme
  return (
    <View
      style={[
        styles.circleFixedButtonContainer,
        styles.circleFixedButtonContainerRight
      ]}
    >
      <TouchableHighlight
        style={styles.circleFixedButtonWrapper}
        onPress={clearStorage}
      >
        <Icon
          name="ios-trash"
          size={35}
          style={[styles.circleFixedButton, styles.circleFixedButtonDim]}
        />
      </TouchableHighlight>
    </View>
  )
}

export default ClearStorageButton

ClearStorageButton.propTypes = {
  clearStorage: PropTypes.func.isRequired
}
