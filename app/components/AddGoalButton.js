import React, { PropTypes } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import theme from "../theme";

const AddGoalButton = ({ onButtonClick }) => {
  const { styles } = theme;
  return (
    <View
      style={[
        styles.circleFixedButtonContainer,
        styles.circleFixedButtonContainerLeft
      ]}
    >
      <TouchableHighlight
        style={styles.circleFixedButtonWrapper}
        onPress={onButtonClick}
      >
        <Icon name="ios-add" size={45} style={styles.circleFixedButton} />
      </TouchableHighlight>
    </View>
  );
};

export default AddGoalButton;

AddGoalButton.propTypes = {
  onButtonClick: PropTypes.func.isRequired
};
