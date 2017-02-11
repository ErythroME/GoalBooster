import React, { Component } from 'react'
import { View, ListView } from 'react-native'

import Goal from './Goal'
import theme from '../theme'


const ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1.id !== row2.id
})

export default class GoalList extends Component {
  constructor(props) {
    super(props)

    this.state = { dataSource: ds.cloneWithRows(props.goals) }
    this.renderRow = this.renderRow.bind(this)
  }

  renderRow(goal) {
    return <Goal goal={goal} />
  }

  render() {
    const { styles } = theme
    return (
      <View style={styles.goalList}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
}
