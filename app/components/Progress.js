import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'

import styled from 'styled-components/native'

const Header = styled.View`
  width: 100%;
  height: 160px;
  justify-content: center;
`
const HeaderText = styled.Text`
  font-size: 40px;
  text-align-vertical: center;
  align-self: center;
`

export default class Progress extends Component {
  render() {
    return (
      <Header>
        <HeaderText>
          {this.props.progress}%
        </HeaderText>
      </Header>
    )
  }
}

Progress.propTypes = {
  progress: PropTypes.number.isRequired
}
