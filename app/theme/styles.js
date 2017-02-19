import {
  StyleSheet,
  Dimensions
} from 'react-native'

import colors from './colors'


const { height, width } = Dimensions.get('window')
const HEADER_HEIGHT = 160
const BUTTON_HEIGHT = 46

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
  },
  addGoalText: {
    color: colors.colorButtonText,
    fontSize: 18
  },
  addGoal: {
    width,
    height: BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ddd'
  },
  goalItem: {
    width,
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    paddingLeft: 15
  },
  goalInput: {
    width: width - 30,
    height: BUTTON_HEIGHT - 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 3,
    backgroundColor: '#fff',
    alignSelf: 'center'
  },
  editButton: {
    backgroundColor: 'blue'
  },
  swipeoutStyles: {
    backgroundColor: 'transparent'
  }
})

export default styles
