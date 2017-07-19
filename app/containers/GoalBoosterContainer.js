import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styled from 'styled-components/native'

import { ActionCreators } from '../actions'
import Progress from '../components/Progress'
import GoalList from '../components/GoalList'
import theme from '../theme'

const GoalBoosterContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${theme.colors.colorBackground};
`

class GoalBooster extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchGoals()
  }

  render() {
    const { styles } = theme
    const content = this.props.isFetching
      ? <Text>Loading Goals...</Text>
      : <GoalList
          clearStorage={this.props.clearStorage}
          goals={this.props.goals}
        />

    return (
      <GoalBoosterContainer>
        <Progress progress={this.props.progress} />
        {content}
      </GoalBoosterContainer>
    )
  }
}

function mapStateToProps(state) {
  const { achieved, total } = state.progressRecipes
  const progress = total === 0 ? 0 : Math.round(achieved / total * 100)
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
