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
  ScrollView,
  Keyboard,
  Platform,
  TouchableOpacity
} from "react-native";
import React, { Component } from "react";
import SplashScreen from "react-native-splash-screen";
import dimens, { sdp } from "./values/dimens";
import mstyles from "./values/styles";
import ButtonApp from "./uiComponents/ButtonApp";
import { Actions } from "react-native-router-flux";
import * as Constant from "./constant";
import * as Common from "./common_function";
import { userRegistration } from "./services/user";
import * as Database from "./database";
import SharedManager from "./sharedmanager";
import { RNProgressHUD, mixin } from "react-native-simplest-hud";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class Register extends mixin(RNProgressHUD.Mixin) {
  constructor(props) {
    super(props);
    _this = this;

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      validate: () => {
        let message = "";
        const reg = Constant.EMAILREG;
        const preg = Constant.PASSWORDREG;
        if (this.state.firstname === "") {
          message = "Please enter firstname.";
        } else if (this.state.lastname === "") {
          message = "Please enter lastname.";
        } else if (this.state.email === "") {
          message = "Please enter email.";
        } else if (!reg.test(this.state.email)) {
          message = "Please enter valid email.";
        } else if (this.state.username === "") {
          message = "Please enter username.";
        } else if (this.state.password === "") {
          message = "Please enter password.";
        } else if (!preg.test(this.state.password)) {
          message = "Password does not allow space.";
        }
        if (message === "") {
          return true;
        }

        Common.showAlertWithDefaultTitle(message);
        return false;
      }
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.instructions}>TypeOrDraw</Text>

        <View
          style={{
            flex: 1,
            paddingLeft: dimens.very_space_large,
            paddingRight: dimens.very_space_large,
            paddingTop: dimens.space_large
          }}
        >
          <ScrollView>
            <View style={styles.bgView}>
              <TextInput
                onChangeText={firstname => this.setState({ firstname })}
                underlineColorAndroid="transparent"
                placeholder="First Name"
                style={[mstyles.etDark]}
              />
            </View>
            <View style={styles.bgView}>
              <TextInput
                onChangeText={lastname => this.setState({ lastname })}
                underlineColorAndroid="transparent"
                placeholder="Last Name"
                style={[mstyles.etDark]}
              />
            </View>
            <View style={styles.bgView}>
              <TextInput
                onChangeText={email => this.setState({ email })}
                underlineColorAndroid="transparent"
                placeholder="Email"
                style={[mstyles.etDark]}
              />
            </View>
            <View style={styles.bgView}>
              <TextInput
                onChangeText={username => this.setState({ username })}
                underlineColorAndroid="transparent"
                placeholder="Username"
                style={[mstyles.etDark]}
              />
            </View>
            <View style={styles.bgView}>
              <TextInput
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
                underlineColorAndroid="transparent"
                placeholder="Password"
                style={[mstyles.etDark]}
              />
            </View>

            <ButtonApp
              text="Register   "
              mstyle={{ width: "100%", marginTop: dimens.space_small }}
              onPress={() => this.registerUser()}
            />

            <TouchableOpacity
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                this.login();
              }}
            >
              <Text style={[mstyles.tvLargeBold, { color: "#13B9B4" }]}>
                Login >
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <RNProgressHUD
          isVisible={this.state.isLoading} //Fixed writing
          color="rgb(19,185,180)" //hud color
          label="Loading..." //"" or "Prompt string"
          isActivityIndicator={true} //true or false
        />
      </View>
    );
  }
  login() {
    Actions.login();
  }

  registerUser() {
    Keyboard.dismiss();
    if (this.state.validate()) {
      this.setState({ isLoading: true });
      this.showHUD();
      const url =
        "username=" +
        this.state.username +
        "&password=" +
        this.state.password +
        "&email=" +
        this.state.email +
        "&fullname=" +
        this.state.firstname +
        " " +
        this.state.lastname;
      userRegistration(url, {}, (flag, response, msg) => {
        this.setState({ isLoading: false });
        this.hideHUD();
        console.log("111--" + response);
        if (flag) {
          if (response !== undefined) {
            try {
              Database.saveTODB("User", response, flag => {
                SharedManager.getInstance().setUserInfo();
              });
              SharedManager.getInstance().setLogged(true);
              Actions.quotes();
            } catch (error) {}
          }
        } else {
          if (response !== undefined && response === 501) {
            Common.showAlertwithAction(Constant.PROJECTNAME, msg, actions);
          } else {
            Common.showAlertWithDefaultTitle(msg);
          }
        }
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    flexDirection: "column"
  },

  welcome: {
    fontSize: 20,
    textAlign: "center",
    color: "#13B9B4",
    margin: 10
  },
  instructions: {
    fontSize: 40,
    textAlign: "center",
    color: "#13B9B4",
    marginBottom: 5
  },
  login: {
    flex: 1,
    marginTop: 100,
    flexDirection: "column",
    paddingLeft: dimens.very_space_large,
    paddingRight: dimens.very_space_large
  },
  bgView: {
    width: "100%",
    marginBottom: dimens.space_small,
    borderColor: "#d8d8d8",
    borderRadius: dimens.buttonHightLarge / 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: dimens.space_small,
    paddingRight: dimens.space_small,
    height: dimens.buttonHightLarge
  }
});
