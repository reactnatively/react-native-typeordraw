
import * as Database from './database';

export default class SharedManager {

    static myInstance = null;

    deviceId = 0


    /**
     * @returns {SharedManager}
     */
    static getInstance() {
        if (this.myInstance == null) {
            this.myInstance = new SharedManager();
        }

        return this.myInstance;
    }

    getDeviceID() {
        return this.deviceId;
    }

    setDeviceID(id) {
        this.deviceId = id;
    }

    getLogged() {
        return this.isLogged;
    }

    setLogged(value) {
        this.isLogged = value;
    }


    checkInternet() {
        return this.isConnect === undefined ? true : this.isConnect;
    }

    setInternet(connect) {
        this.isConnect = connect;
    }

    getUserInfo() {
        return this.userInfo;
    }

    setUserInfo() {
        const response = Database.realm.objects('User');
        if ((response !== undefined) && (response.length > 0)) {
            console.log('exist user');
                this.userInfo = response[0];
        } else {
            this.userInfo = undefined;
        }
    }
}
