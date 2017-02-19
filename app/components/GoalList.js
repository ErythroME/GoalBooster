import React, { Component } from 'react'
import {
  View,
  ListView,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native'

import Goal from './Goal'
import AddGoalContainer from '../containers/AddGoalContainer'
import theme from '../theme'


const ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1.id !== row2.id
})

export default class GoalList extends Component {
  constructor(props) {
    super(props)

    this.state = { dataSource: ds.cloneWithRows(props.goals) }
    this.renderRow = this.renderRow.bind(this)
    this.updateDataSource = this.updateDataSource.bind(this)
  }

  renderRow(goal) {
    return <Goal goal={goal}
                 editGoal={this.props.editGoal}
                 deleteGoal={this.props.deleteGoal} />
  }

  updateDataSource(goals) {
    this.setState({ dataSource: ds.cloneWithRows(goals) })
  }

  componentWillReceiveProps(newProps) {
    this.updateDataSource(newProps.goals)
  }

  render() {
    const { styles } = theme
    return (
      <View style={styles.goalList}>
        <AddGoalContainer />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow} />
      </View>
    )
  }
}
