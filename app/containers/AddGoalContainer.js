import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreators } from '../actions'
import theme from '../theme'


class AddGoal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isButtonShown: true,
      text: ''
    }
    this.toggleView = this.toggleView.bind(this)
    this.addGoal = this.addGoal.bind(this)
    this.renderButton = this.renderButton.bind(this)
    this.renderInput = this.renderInput.bind(this)
  }

  toggleView() {
    this.setState({ isButtonShown: !this.state.isButtonShown })
  }

  addGoal(event) {
    const id = this.props.goals.length
    const name = event.nativeEvent.text
    this.props.addGoal({ id, name })
    this.setState({
      text: '',
      isButtonShown: !this.state.isButtonShown
    })
  }

  renderButton(styles) {
    return (
      <TouchableHighlight onPress={this.toggleView}>
        <Text style={styles.addGoalText}>Add a goal</Text>
      </TouchableHighlight>
    )
  }

  renderInput(styles) {
    return (
      <TextInput style={styles.goalInput}
                 onChangeText={text => this.setState({text})}
                 onSubmitEditing={event => this.addGoal(event)}
                 value={this.state.text}>
      </TextInput>
    )
  }

  render() {
    const { styles } = theme
    return (
      <View style={styles.addGoal}>
        {this.state.isButtonShown
         ? this.renderButton(styles)
         : this.renderInput(styles)}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { goals: state.goalRecipes }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGoal)

AddGoal.propTypes = {
  addGoal: PropTypes.func.isRequired,
  goals: PropTypes.array.isRequired
}
