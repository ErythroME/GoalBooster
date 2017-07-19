import React, { Component, PropTypes } from 'react'
import {
  AsyncStorage,
  ListView,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Dimensions
} from 'react-native'
import { KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view'

import styled from 'styled-components/native'

import GoalContainer from '../containers/GoalContainer'
import AddGoalContainer from '../containers/AddGoalContainer'
import AddGoalButton from './AddGoalButton'
import ClearStorageButton from './ClearStorageButton'
import { GOALS_STORAGE_KEY } from '../lib/storageKeys'

const screenHeight = Dimensions.get('window').height
const goalListHeight = screenHeight - 160
const GoalListWrapper = styled.View`
  width: 100%;
  height: ${goalListHeight}px;
  background-color: ghostwhite;
`

const ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1.id !== row2.id
})

export default class GoalList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: ds.cloneWithRows(props.goals),
      isInputShown: false
    }
    this.renderRow = this.renderRow.bind(this)
    this.updateDataSource = this.updateDataSource.bind(this)
    this.updateStorage = this.updateStorage.bind(this)
    this.toggleInputView = this.toggleInputView.bind(this)
  }

  renderRow(goal) {
    const key = `goal-${goal.id}`
    return <GoalContainer key={key} goal={goal} />
  }

  updateDataSource(goals) {
    this.updateStorage(goals)
    this.setState({ dataSource: ds.cloneWithRows(goals) })
  }

  async updateStorage(goals) {
    try {
      await AsyncStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals))
    } catch (error) {
      console.log('error')
    }
  }

  componentWillReceiveProps(newProps) {
    this.updateDataSource(newProps.goals)
  }

  toggleInputView() {
    this.setState({ isInputShown: !this.state.isInputShown })
  }

  render() {
    return (
      <GoalListWrapper>
        <AddGoalContainer
          isInputShown={this.state.isInputShown}
          toggleView={this.toggleInputView}
        />
        <KeyboardAwareListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />
        <AddGoalButton onButtonClick={this.toggleInputView} />
        <ClearStorageButton clearStorage={this.props.clearStorage} />
      </GoalListWrapper>
    )
  }
}

GoalList.propTypes = {
  clearStorage: PropTypes.func.isRequired,
  goals: PropTypes.array.isRequired
}
