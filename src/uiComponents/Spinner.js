import PropTypes from "prop-types";
import { Component, default as React } from "react";
import { ActivityIndicator, View } from "react-native";
import colors from "../values/colors";

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  show() {
    this.setState({ visible: true });
  }
  hide() {
    this.setState({ visible: false });
  }
  render() {
    return (
      <View style={this.props.style}>
        {this.state.visible && (
          <ActivityIndicator size="large" color={colors.primary} />
        )}
      </View>
    );
  }
}
Spinner.propTypes = {
  style: PropTypes.object
};
export default Spinner;
