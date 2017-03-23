import React, { Component, PropTypes } from 'react'
import {
  AsyncStorage,
  View,
  ListView,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native'

import GoalContainer from '../containers/GoalContainer'
import AddGoalContainer from '../containers/AddGoalContainer'
import theme from '../theme'
import { GOALS_STORAGE_KEY } from '../lib/storageKeys'


const ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1.id !== row2.id
})

export default class GoalList extends Component {
  constructor(props) {
    super(props)

    this.state = { dataSource: ds.cloneWithRows(props.goals) }
    this.renderRow = this.renderRow.bind(this)
    this.updateDataSource = this.updateDataSource.bind(this)
    this.updateStorage = this.updateStorage.bind(this)
  }

  renderRow(goal) {
    const key = `goal-${goal.id}`
    return <GoalContainer
              key={key}
              goal={goal}
           />
  }

  updateDataSource(goals) {
    this.updateStorage(goals)
    this.setState({ dataSource: ds.cloneWithRows(goals) })
  }

  async updateStorage(goals) {
    try {
      await AsyncStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals))
    } catch(error) {
      console.log('error')
    }
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
          renderRow={this.renderRow}
          enableEmptySections={true} />
      </View>
    )
  }
}

GoalList.propTypes = {
  goals: PropTypes.array.isRequired
}

