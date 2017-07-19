import React, { Component, PropTypes } from 'react'
import { View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/Ionicons'

import styled from 'styled-components/native'

import { ActionCreators } from '../actions'
import theme from '../theme'

const AddGoalView = styled.View`
  width: 100%;
  height: 46px;
  justify-content: center;
  border-bottom-width: 0.5px;
  border-color: #ddd;
`
const AddGoalText = styled.Text`
  color: gray;
  font-size: 16px;
  margin-left: 25px;
`

class AddGoal extends Component {
  constructor(props) {
    super(props)

    this.state = { text: '' }
    this.addGoal = this.addGoal.bind(this)
    this.renderInput = this.renderInput.bind(this)
  }

  addGoal(event) {
    const name = event.nativeEvent.text.trim()
    if (name) {
      this.props.addGoal(name)
      this.setState({ text: '' })
    } else {
      this.props.toggleView()
    }
  }

  renderInput(styles) {
    return (
      <TextInput
        style={styles.goalInput}
        autoFocus={true}
        onChangeText={text => this.setState({ text })}
        onSubmitEditing={event => this.addGoal(event)}
        onBlur={this.props.toggleView}
        value={this.state.text}
      />
    )
  }

  render() {
    const { styles } = theme
    return (
      <AddGoalView>
        {this.props.isInputShown
          ? this.renderInput(styles)
          : <AddGoalText>I have these goals...</AddGoalText>}
      </AddGoalView>
    )
  }
}

function mapStateToProps(state) {
  return { goals: state.goalRecipes.goals }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGoal)

AddGoal.propTypes = {
  addGoal: PropTypes.func.isRequired,
  goals: PropTypes.array.isRequired
}
