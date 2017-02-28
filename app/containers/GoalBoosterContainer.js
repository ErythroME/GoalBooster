import React, { Component, PropTypes } from 'react'
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
  const { achieved, total } = state.progressRecipes
  const progress = Math.round((achieved / total) * 100)
  return {
    goals: state.goalRecipes,
    progress
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalBooster)

GoalBooster.propTypes = {
  goals: PropTypes.array.isRequired,
  progress: PropTypes.number.isRequired
}
