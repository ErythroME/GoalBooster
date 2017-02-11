import {
  StyleSheet,
  Dimensions
} from 'react-native'

import colors from './colors'


const { height, width } = Dimensions.get('window')
const HEADER_HEIGHT = 160

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.colorBackground
  },
  header: {
    width,
    height: HEADER_HEIGHT,
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 40,
    textAlignVertical: 'center',
    alignSelf: 'center'
  },
  goalList: {
    width,
    height: height - HEADER_HEIGHT,
    backgroundColor: 'ghostwhite'
  }
})

export default styles
