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

  componentDidMount() {
    this.props.fetchGoals()
  }

  render() {
    const { styles } = theme
    const content = () => {
      return this.props.isFetching ?
          <Text>Loading Goals...</Text> :
          (
            <View>
              <GoalList goals={this.props.goals} />
            </View>
          )
    }

    return (
      <View style={styles.container}>
        <Progress progress={this.props.progress}/>
        {content()}
      </View>
    )
  }
}

function mapStateToProps(state) {
  const { achieved, total } = state.progressRecipes
  const progress = total === 0 ? 0 : Math.round((achieved / total) * 100)
  return {
    goals: state.goalRecipes.goals,
    isFetching: state.goalRecipes.fetching,
    progress
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalBooster)

GoalBooster.propTypes = {
  goals: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired
}
