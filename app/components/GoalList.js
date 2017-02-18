import React, { Component } from 'react'
import {
  View,
  ListView,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native'

import Goal from './Goal'
import theme from '../theme'


const ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1.id !== row2.id
})

export default class GoalList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: ds.cloneWithRows(props.goals),
      isButtonShown: true,
      text: ''
    }
    this.renderRow = this.renderRow.bind(this)
    this.renderAddTodo = this.renderAddTodo.bind(this)
    this.toggleAddTodo = this.toggleAddTodo.bind(this)
    this.addGoal = this.addGoal.bind(this)
    this.updateDataSource = this.updateDataSource.bind(this)
  }

  renderRow(goal) {
    return <Goal goal={goal}
                 deleteGoal={this.props.deleteGoal} />
  }

  renderAddTodo(styles) {
    if (this.state.isButtonShown) {
      return (
        <TouchableHighlight onPress={this.toggleAddTodo}>
          <Text style={styles.addTodoText}>Add a goal</Text>
        </TouchableHighlight>
      )
    } else {
      return (
        <TextInput style={styles.goalInput}
                   onChangeText={text => this.setState({text})}
                   onSubmitEditing={event => this.addGoal(event)}
                   value={this.state.text} />
      )
    }
  }

  updateDataSource(goals) {
    this.setState({
      dataSource: ds.cloneWithRows(goals)
    })
  }

  componentWillReceiveProps(newProps) {
    this.updateDataSource(newProps.goals)
  }

  toggleAddTodo() {
    this.setState({
      isButtonShown: !this.state.isButtonShown
    })
  }

  addGoal(event) {
    const goalText = event.nativeEvent.text
    const currentId = this.props.goals.length
    this.props.addGoal({
      id: currentId,
      name: goalText
    })
    this.setState({
      text: '',
      isButtonShown: !this.state.isButtonShown
    })
  }

  render() {
    const { styles } = theme
    return (
      <View style={styles.goalList}>
        <View style={styles.addTodo}>
          {this.renderAddTodo(styles)}
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
}
