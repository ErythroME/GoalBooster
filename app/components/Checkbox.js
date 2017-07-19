import React, { Component, PropTypes } from 'react'
import { TouchableHighlight, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import styled from 'styled-components/native'

const CheckboxIcon = styled.Text`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  color: dimgray;
`

const CheckboxIconChecked = CheckboxIcon.extend`color: #9aaf48;`

export default class Checkbox extends Component {
  constructor(props) {
    super(props)

    this.state = { isChecked: this.props.isChecked }
    this.toggleState = this.toggleState.bind(this)
  }

  toggleState() {
    this.props.handleCheck(this.props.targetId, !this.state.isChecked)
    this.setState({ isChecked: !this.state.isChecked })
  }

  render() {
    const iconName = this.state.isChecked
      ? 'ios-checkmark-circle'
      : 'ios-checkmark-circle-outline'
    const iconObj = <Icon name={iconName} size={20} />
    return (
      <TouchableHighlight
        onPress={this.toggleState}
        underlayColor="transparent"
      >
        {this.state.isChecked
          ? <CheckboxIconChecked>
              {iconObj}
            </CheckboxIconChecked>
          : <CheckboxIcon>
              {iconObj}
            </CheckboxIcon>}
      </TouchableHighlight>
    )
  }
}

Checkbox.propTypes = {
  handleCheck: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  targetId: PropTypes.number.isRequired
}
