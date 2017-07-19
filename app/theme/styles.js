import { StyleSheet, Dimensions } from 'react-native'

import colors from './colors'

const { height, width } = Dimensions.get('window')
const HEADER_HEIGHT = 160
export const BUTTON_HEIGHT = 46

const styles = StyleSheet.create({
  goalInput: {
    width: width - 30,
    height: BUTTON_HEIGHT - 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 3,
    backgroundColor: '#fff',
    alignSelf: 'center'
  },
  circleFixedButtonContainer: {
    position: 'absolute',
    flex: 2,
    bottom: 15,
    borderRadius: 25,
    shadowColor: '#2DF6F7',
    borderWidth: 0,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  circleFixedButtonContainerRight: {
    right: 15,
    shadowColor: 'lightslategray',
    shadowRadius: 1,
    shadowOffset: { hight: 1 }
  },
  circleFixedButtonContainerLeft: {
    left: 15
  },
  circleFixedButtonWrapper: {
    borderRadius: 25,
    backgroundColor: '#fff'
  },
  circleFixedButton: {
    width: 50,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
    borderRadius: 25,
    color: '#fff',
    overflow: 'hidden',
    backgroundColor: '#27C172'
  },
  circleFixedButtonDim: {
    backgroundColor: 'gainsboro'
  }
})

export default styles
