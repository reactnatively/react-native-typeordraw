// import { Button } from "native-base";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text, Button, TouchableOpacity } from "react-native";
import colors from "../values/colors";
import dimens, { sdp } from "../values/dimens";
import styles from "../values/styles";

class ButtonApp extends Component {
  render() {
    const props = this.props;
    const buttonSize = props.small
      ? dimens.buttonHightSmall
      : dimens.buttonHightLarge;
    const borderRadius = buttonSize / 5;
    return (
      <TouchableOpacity
        style={[
          {
            borderRadius: borderRadius,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            height: buttonSize,
            backgroundColor: props.disabled?colors.light_Gray:colors.primary
          },
          props.mstyle
        ]}
        underlayColor={colors.primaryLight}
        onPress={props.onPress}
        disabled = {props.disabled}
        activeOpacity={props.disabled ? 1 : 0.7}
      >
        <Text
          style={[styles.tvNormal, { color: colors.white, fontWeight: "bold" }]}
        >
          {props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

ButtonApp.propTypes = {
  text: PropTypes.string,
  small: PropTypes.bool,
  onPress: PropTypes.func,
  mstyle: PropTypes.object
};

export default ButtonApp;
