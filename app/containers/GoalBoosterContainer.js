import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ActionCreators } from '../actions'
import Progress from '../components/Progress'
import GoalList from '../components/GoalList'
import theme from '../theme'


class GoalBooster extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { styles } = theme
    return (
      <View style={styles.container}>
        <Progress progress={this.props.progress}/>
        <GoalList goals={this.props.goals} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    goals: state.goalRecipes,
    progress: state.progressRecipes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalBooster)
