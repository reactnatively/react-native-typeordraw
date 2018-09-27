import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux';
import { responsiveScreen } from 'react-native-responsive-dimensions';
import { EventRegister } from 'react-native-event-listeners';

import Login from './Login';
import Register from './Register';
import Quotes from './Quotes';

import SharedManager from './sharedmanager';

const Device = require('react-native-device-detection');


class RouterComponent extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            logged: false,
            loading: true,
        };
    }

    componentWillMount() {
        this.listener = EventRegister.addEventListener('refreshRootRounter', () => {
            this.setState({ logged: false });
            Actions.auth({ type: 'reset' });
        });

    }
    componentDidMount() {
        console.log('come on this screen on click on app icon');
        this.checkUserLogged();
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener);
    }

    checkUserLogged() {
        try {
            SharedManager.getInstance().setUserInfo();
            const response = SharedManager.getInstance().getUserInfo();
            console.log("RES----"+JSON.stringify(response));
            if (response !== undefined) {
                console.log('come on this screen check user');
                this.setState({
                    logged: true,
                    loading: false,
                }, () => {
                    Actions.auth({ type: 'reset' });
                  }); 
            } else {
                this.setState({
                    logged: false,
                    loading: false,
                });
            }
        } catch (error) {
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <Text>Loading...</Text>
                </View>
            );
        }
        return (
            <Router>
                <Scene overlay>
                    <Scene key="modal" hideNavBar>
                        <Scene type={ActionConst.RESET} key="auth">
                            <Scene key="login" component={Login} hideNavBar panHandlers={null} initial={!this.state.logged} />
                            
                            <Scene key="register" component={Register} hideNavBar panHandlers={null} />
                            <Scene key="quotes" component={Quotes} hideNavBar panHandlers={null} initial={this.state.logged}/>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        );
    }
}

export default RouterComponent;
