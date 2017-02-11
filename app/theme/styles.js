import {
  StyleSheet,
  Dimensions
} from 'react-native'

import colors from './colors'


const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.colorBackground
  }
})

export default styles
