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
  Keyboard,
  TextInput,
  View,
  ScrollView,
  AsyncStorage,
  Platform,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { Component } from "react";
import SplashScreen from "react-native-splash-screen";
import dimens, { sdp } from "./values/dimens";
import mstyles from "./values/styles";
import ButtonApp from "./uiComponents/ButtonApp";
import { Actions } from "react-native-router-flux";
import * as Constant from "./constant";
import * as Common from "./common_function";
import { getQuotesData } from "./services/user";
import { getCommentsData } from "./services/user";
import { postQuotes } from "./services/user";
import yes from "./images/yes.png";
import no from "./images/no.png";
import * as Database from "./database";
import SharedManager from "./sharedmanager";
import { EventRegister } from "react-native-event-listeners";
import { NetInfo } from "react-native";
import { postDataComment, postDataWithImage, getData } from "./services/index";

import { RNProgressHUD, mixin } from "react-native-simplest-hud";
import { SketchCanvas } from "@terrylinla/react-native-sketch-canvas";
import RNSketchCanvas from "@terrylinla/react-native-sketch-canvas";
import { RNS3 } from "react-native-aws3";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class Quotes extends mixin(RNProgressHUD.Mixin) {
  constructor(props) {
    super(props);
    _this = this;

    this.state = {
      user: {},
      comment: "",
      isLoading: false,
      data: [],
      comments: [],
      index: 0,
      isType: true,
      path: undefined,
      validate: () => {
        let message = "";

        if (this.state.comment === "") {
          message = "Please enter message.";
        }
        if (message === "") {
          return true;
        }

        Common.showAlertWithDefaultTitle(message);
        return false;
      }
    };
  }

  componentDidMount() {
    this.userInfo = SharedManager.getInstance().getUserInfo();
    if (this.userInfo !== undefined) {
      this.setState({
        user: this.userInfo
      });
    }
  }

  setQuoteText() {
    if (this.state.data) {
      if (this.state.data.length > 0) {
        console.log("1111000" + this.state.data[this.state.index].text);
        return this.state.data[this.state.index].text;
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  changeTypeOrDraw(type) {
    if (type) {
      let paths = this.canvas.getPaths();
      this.setState({
        isType: true,
        path: paths
      });
    } else {
      if (
        this.state.path != undefined &&
        this.state.path &&
        this.state.path.length > 0
      ) {
        setTimeout(() => {
          for (let i = 0; i < this.state.path.length; i++) {
            this.canvas.addPath(this.state.path[i]);
          }
        }, 1000);
      }
      this.setState({
        isType: false
      });
    }
  }

  render() {
    console.log("1111");
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, marginBottom: 60 }}>
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Text style={styles.welcome}>
              {"Welcome, " + this.state.user.fullname}
            </Text>

            <View
              style={{
                paddingVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  this.changeTypeOrDraw(true);
                }}
              >
                <Text
                  style={[
                    styles.tvSmall,
                    {
                      color: this.state.isType ? "#13B9B4" : "#A9A9A9",
                      flex: 1,
                      alignItems: "flex-start"
                    }
                  ]}
                >
                  Type
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => {
                  this.changeTypeOrDraw(false);
                }}
              >
                <Text
                  style={[
                    styles.tvSmall,
                    {
                      color: this.state.isType ? "#A9A9A9" : "#13B9B4",
                      alignItems: "flex-end"
                    }
                  ]}
                >
                  Draw
                </Text>
              </TouchableOpacity>
            </View>

            {this.state.isType && (
              <View style={{ flex: 1 }}>
                <TextInput
                  style={{
                    flex: 1,
                    height: "100%",
                    color: "#fff",
                    textAlignVertical: "top",
                    backgroundColor: "#13B9B4",
                    fontSize: 20
                  }}
                  onChangeText={comment => this.setState({ comment })}
                  underlineColorAndroid="transparent"
                  placeholder="type.."
                  placeholderTextColor="#ffffff"
                  multiline={true}
                  value={this.state.comment}
                  ref={input => {
                    this.textInput = input;
                  }}
                />
              </View>
            )}
            {!this.state.isType && (
              <View style={{ flex: 1, backgroundColor: "#13B9B4" }}>
                <SketchCanvas
                  style={{ flex: 1 }}
                  strokeColor={"#ffffff"}
                  strokeWidth={7}
                  ref={ref => (this.canvas = ref)}
                  onPathsChange={pathsCount => {
                    console.log("pathsCount", pathsCount);
                  }}
                  onSketchSaved={(success, path) => {
                    this.showHUD();
                    setTimeout(() => {
                      this.uploadFile(path);
                    }, 1000);
                  }}
                />
              </View>
            )}

            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                alignContent: "flex-end"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  let paths = "";
                  if (this.canvas) {
                    paths = this.canvas.getPaths();
                  }
                  if (paths) {
                    this.saveImage();
                  } else {
                    this.postComment();
                  }
                }}
              >
                <Text
                  style={[
                    styles.tvSmall,
                    { color: "#13B9B4", alignItems: "flex-end", fontSize: 30 }
                  ]}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottomView}>
          <View
            style={{
              width: "100%",
              height: 0.5,
              backgroundColor: "#13B9B4"
            }}
          />
          <View>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                this.logout();
              }}
            >
              <Text style={styles.welcomeone}>logout ></Text>
            </TouchableOpacity>
          </View>
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

  uploadFile(path) {
    this.setState({ isLoading: true });
    this.showHUD();
    const devicePath = Platform.select({
        ios: path,
        android: "file://" +path
      });
    const file = {
      uri: devicePath,
      name: Date.parse(new Date()) + "_" + this.state.user.id + ".png",
      type: "image/*"
    };

    const options = {
      keyPrefix: "uploads/",
      bucket: "reactnatively",
      region: "us-east-2",
      accessKey: "AKIAIUY6HK3C4BLK2NUA",
      secretKey: "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",
      successActionStatus: 201
    };

    RNS3.put(file, options).then(response => {
      this.setState({ isLoading: false });
      this.hideHUD();
      if (response.status !== 201) {
        console.log(response);
        Common.showAlertwithAction(
          Constant.PROJECTNAME,
          "Failed to upload image to S3"
        );
        throw new Error("Failed to upload image to S3");
      }
      console.log(response.body.postResponse.location);
      this.postImage(response.body.postResponse.location);
    });
  }

  postComment() {
    Keyboard.dismiss();
    if (this.state.validate()) {
      this.setState({ isLoading: true });
      this.showHUD();
      const url =
        "text=" + this.state.comment + "&author=" + this.state.user.id;
      NetInfo.isConnected.fetch().done(isConnected => {
        if (isConnected) {
          postDataComment(Constant.ApiMethods.postQuotes + url, "")
            .then(response => {
              this.setState({ isLoading: false });

              this.hideHUD();
              if (response !== undefined) {
                console.log("RES---" + response);
                console.log("RESO---" + response.message);
                Common.showAlert(Constant.PROJECTNAME, response.message);
                this.textInput.clear();
              } else {
                Common.showAlertwithAction(
                  Constant.PROJECTNAME,
                  Constant.Messages.server_error
                );
              }
            })
            .catch(e => {
              console.log("Api call error--" + e);
            });
        } else {
          Common.showAlert(Constant.PROJECTNAME, Constant.Messages.no_internet);
        }
      });
    }
  }

  successCallback = (err, result) => {
    console.log("BASE 64 ----" + result);
  };

  saveImage() {
    const filename = Date.parse(new Date()) + "_" + this.state.user.id;
    this.canvas.save("png", true, "TypeOrDraw", filename, false, false, false);
  }

  postImage(path) {
    Keyboard.dismiss();
    this.setState({ isLoading: true });
    this.showHUD();
    let url;
    if (this.state.comment && this.state.comment != "") {
      url =
        "text=" +
        this.state.comment +
        "&author=" +
        this.state.user.id +
        "&path=" +
        path;
    } else {
      url = "text=NULL&author=" + this.state.user.id + "&path=" + path;
    }

    NetInfo.isConnected.fetch().done(isConnected => {
      if (isConnected) {
        postDataComment(Constant.ApiMethods.postQuotes + url, "")
          .then(response => {
            this.setState({ isLoading: false });

            this.hideHUD();
            if (response !== undefined) {
              Common.showAlert(Constant.PROJECTNAME, response.message);
              this.setState({
                comment: "",
                path: []
              });
              _this.canvas.clear();
            } else {
              Common.showAlertwithAction(
                Constant.PROJECTNAME,
                Constant.Messages.server_error
              );
            }
          })
          .catch(e => {
            console.log("Api call error--" + e);
          });
      } else {
        Common.showAlert(Constant.PROJECTNAME, Constant.Messages.no_internet);
      }
    });
  }

  logout() {
    const actions = [
      { text: "No", onPress: () => console.log("OK Pressed") },
      {
        text: "Yes",
        onPress: () => {
          try {
            Database.fetchListFromDB("User", (flag, response) => {
              if (flag) {
                Database.deleteFromDB("User", response, success => {
                  this.userInfo = undefined;
                  SharedManager.getInstance().setUserInfo();
                });
              }
              EventRegister.emit("refreshRootRounter", "logout add");
              Actions.auth({ type: "reset" });
            });
          } catch (e) {}
        }
      }
    ];
    Common.showAlertwithAction(
      Constant.PROJECTNAME,
      Constant.Messages.logout_message,
      actions
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20
  },

  welcome: {
    fontSize: 20,
    textAlign: "center",
    color: "#13B9B4",
    margin: 10
  },
  welcomeone: {
    fontSize: 20,
    textAlign: "center",
    color: "#13B9B4"
  },
  instructions: {
    fontSize: 30,
    textAlign: "center",
    color: "#D8D8D8",
    marginBottom: 5,
    marginTop: dimens.space_large
  },
  instructionsname: {
    fontSize: 30,
    textAlign: "center",
    color: "#D8D8D8",
    marginBottom: 5
  },
  login: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: dimens.very_space_large,
    paddingRight: dimens.very_space_large
  },
  bgView: {
    width: "70%",
    borderColor: "#d8d8d8",
    borderRadius: dimens.buttonHightLarge / 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: dimens.space_small,
    paddingRight: dimens.space_small,
    height: dimens.buttonHightLarge
  },
  bottomView: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    marginLeft: 20
  },

  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  }
});
