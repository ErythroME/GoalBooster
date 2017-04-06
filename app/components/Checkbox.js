import React, { Component, PropTypes } from "react";
import { TouchableHighlight, View, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import theme from "../theme";

export default class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = { isChecked: this.props.isChecked };
    this.toggleState = this.toggleState.bind(this);
  }

  toggleState() {
    this.props.handleCheck(this.props.targetId, !this.state.isChecked);
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    const { styles } = theme;
    return (
      <TouchableHighlight
        onPress={this.toggleState}
        underlayColor="transparent"
      >
        {this.state.isChecked
          ? <Icon
              name="ios-checkmark-circle"
              size={20}
              style={[styles.checkbox, styles.checkboxChecked]}
            />
          : <Icon
              name="ios-checkmark-circle-outline"
              size={20}
              style={styles.checkbox}
            />}
      </TouchableHighlight>
    );
  }
}

Checkbox.propTypes = {
  handleCheck: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  targetId: PropTypes.number.isRequired
};
