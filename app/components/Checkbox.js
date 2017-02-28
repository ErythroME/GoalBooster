import React, { Component, PropTypes } from 'react'
import {
  TouchableHighlight,
  View,
  Image
} from 'react-native'

import theme from '../theme'


export default class Checkbox extends Component {
  constructor(props) {
    super(props)

    this.state = { isChecked: this.props.isChecked }
    this.renderImage = this.renderImage.bind(this)
    this.toggleState = this.toggleState.bind(this)
  }

  renderImage(styles) {
    const source = this.state.isChecked
                   ? require('../assets/check_checked.png')
                   : require('../assets/check.png')
    return (
      <Image style={styles.checkbox} source={source} />
    )
  }

  toggleState() {
    this.props.handleCheck(this.props.targetId, !this.state.isChecked)
    this.setState({ isChecked: !this.state.isChecked })
  }

  render() {
    const { styles } = theme
    return (
      <TouchableHighlight style={styles.checkboxContainer}
                          onPress={this.toggleState}
                          underlayColor='transparent'>
        {this.renderImage(styles)}
      </TouchableHighlight>
    )
  }
}

Checkbox.propTypes = {
  handleCheck: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  targetId: PropTypes.number.isRequired
}
