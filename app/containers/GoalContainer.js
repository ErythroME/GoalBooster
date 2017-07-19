import React, { Component, PropTypes } from 'react'
import { View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Swipeout from 'react-native-swipeout'

import theme from '../theme'
import styled from 'styled-components/native'

import { ActionCreators } from '../actions'
import Checkbox from '../components/Checkbox'

const GoalItemView = styled.View`
  width: 100%;
  height: 46px;
  align-items: center;
  border-bottom-width: 0.5px;
  border-color: #eee;
  padding-left: 15px;
  flex-direction: row;
`

class Goal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isTextShown: true,
      text: props.goal.name
    }
    this.toggleView = this.toggleView.bind(this)
    this.editGoal = this.editGoal.bind(this)
    this.renderText = this.renderText.bind(this)
    this.renderInput = this.renderInput.bind(this)
    this.handleGoalCheck = this.handleGoalCheck.bind(this)
    this.handleGoalDelete = this.handleGoalDelete.bind(this)
  }

  toggleView() {
    this.setState({ isTextShown: !this.state.isTextShown })
  }

  editGoal(event) {
    const id = this.props.goal.id
    const name = event.nativeEvent.text.trim()
    this.props.editGoal({ id, name })
    this.setState({
      isTextShown: true,
      text: name
    })
  }

  renderText(styles) {
    const { id, name } = this.props.goal
    const swipeoutButtons = [
      {
        text: 'Edit',
        backgroundColor: 'lightseagreen',
        onPress: () => this.toggleView()
      },
      {
        text: 'Delete',
        backgroundColor: 'salmon',
        onPress: () => this.handleGoalDelete(id)
      }
    ]
    return (
      <Swipeout
        autoClose={true}
        right={swipeoutButtons}
        style={{ backgroundColor: 'transparent' }}
      >
        <GoalItemView>
          <Checkbox
            targetId={id}
            handleCheck={this.handleGoalCheck}
            isChecked={this.props.goal.achieved}
          />
          <Text>
            {name}
          </Text>
        </GoalItemView>
      </Swipeout>
    )
  }

  handleGoalCheck(id, state) {
    if (state) {
      this.props.achieveGoal(id)
    } else {
      this.props.resetGoal(id)
    }
  }

  handleGoalDelete(id) {
    this.props.deleteGoal({ id, achieved: this.props.goal.achieved })
  }

  renderInput(styles) {
    return (
      <GoalItemView>
        <TextInput
          style={styles.goalInput}
          autoFocus={true}
          onChangeText={text => this.setState({ text })}
          onSubmitEditing={event => this.editGoal(event)}
          value={this.state.text}
        />
      </GoalItemView>
    )
  }

  render() {
    const { styles } = theme
    if (this.state.isTextShown) {
      return this.renderText(styles)
    } else {
      return this.renderInput(styles)
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(null, mapDispatchToProps)(Goal)

Goal.proptypes = {
  achieveGoal: PropTypes.func.isRequired,
  resetGoal: PropTypes.func.isRequired,
  editGoal: PropTypes.func.isRequired,
  deleteGoal: PropTypes.func.isRequired,
  goal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    achieved: PropTypes.bool.isRequired
  }).isRequired
}
