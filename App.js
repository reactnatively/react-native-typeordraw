/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage,
  Platform,
  StatusBar,
  TouchableOpacity,
  NetInfo
} from "react-native";
import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import dimens, { sdp } from "./src/values/dimens";
import mstyles from "./src/values/styles";
import ButtonApp from "./src/uiComponents/ButtonApp";
import { StackActions, NavigationActions } from "react-navigation";
import { createStackNavigator } from "react-navigation";
import RouterComponent from './src/router_component';
import SharedManager from './src/sharedmanager';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var _nav;
type Props = {};


const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    _this = this;
    _nav = props.navigation;
    this.state = {
      name:  "",
      password:  "",
    };
  }
  render() {
    return (
      <View style={styles.container}>
                <MyStatusBar backgroundColor="black" barStyle="light-content" style={styles.statusBar} />
                <RouterComponent />
            </View>
     
    );
  }
  
  componentDidMount() {
      SplashScreen.hide();

      NetInfo.isConnected.fetch().then(isConnected => {
        console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    });

    NetInfo.isConnected.addEventListener('connectionChange', this.networkConnectionChange);
  }


  networkConnectionChange = (isConnected) => {
};
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;


const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  statusBar: {
      height: STATUSBAR_HEIGHT,
  },
  appBar: {
      backgroundColor: '#79B45D',
      height: APPBAR_HEIGHT,
  },
  content: {
      flex: 1,
      backgroundColor: '#33373B',
  },
});
