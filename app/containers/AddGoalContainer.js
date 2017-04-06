import React, { Component, PropTypes } from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/Ionicons";

import { ActionCreators } from "../actions";
import theme from "../theme";

class AddGoal extends Component {
  constructor(props) {
    super(props);

    this.state = { text: "" };
    this.addGoal = this.addGoal.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  addGoal(event) {
    const name = event.nativeEvent.text.trim();
    if (name) {
      this.props.addGoal(name);
      this.setState({ text: "" });
    } else {
      this.props.toggleView();
    }
  }

  renderInput(styles) {
    return (
      <TextInput
        style={styles.goalInput}
        autoFocus={true}
        onChangeText={text => this.setState({ text })}
        onSubmitEditing={event => this.addGoal(event)}
        onBlur={this.props.toggleView}
        value={this.state.text}
      />
    );
  }

  render() {
    const { styles } = theme;
    return (
      <View style={styles.addGoal}>
        {this.props.isInputShown
          ? this.renderInput(styles)
          : <Text style={styles.addGoalText}>I have these goals...</Text>}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { goals: state.goalRecipes.goals };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGoal);

AddGoal.propTypes = {
  addGoal: PropTypes.func.isRequired,
  goals: PropTypes.array.isRequired
};
