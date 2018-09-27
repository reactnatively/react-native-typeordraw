import { EventRegister } from 'react-native-event-listeners';
import * as Common from '../common_function';
import * as Constant from '../constant';
import * as Database from '../database';
import SharedManager from '../sharedmanager';

const getHeaders = () => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    try {
        Database.fetchListFromDB('User', (flag, response) => {
            if (flag) {
                if (response !== undefined && response.length > 0) {
                    headers['Authorization'] = 'Bearer ' + response[0].token;
                }
            }
        });
    } catch (errorr) {
        console.log(error);
    }
    return headers;
};


const getImageHeader = () => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data;'
    };

    try {
        Database.fetchListFromDB('User', (flag, response) => {
            if (flag) {
                if (response !== undefined && response.length > 0) {
                    headers['Authorization'] = 'Bearer ' + response[0].token;
                }
            }
        });
    } catch (errorr) {
        console.log(error);
    }

    return headers;
};


export const postData = (methodName, postValue) => {
    console.log(`${Constant.BASE_URL}${methodName}`);
    console.log(JSON.stringify(postValue));
    console.log(JSON.stringify(getHeaders()));
    return fetch(`${Constant.BASE_URL}${methodName}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(postValue)
    }).then(response => {
        // debugger;
        console.log(JSON.stringify(response));
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        
    }).then((responseJson) => {
        console.log(JSON.stringify(responseJson));

        if (responseJson !== undefined && responseJson.code === 401) {
            logoutDeleteCase(responseJson.message);
        } else {
            return responseJson;
        }
    })
        .catch((error) => {
            return error;
            console.error(error);
            
        });
};
export const postDataComment = (methodName, postValue) => {
    console.log(`${Constant.BASE_URL}${methodName}`);
    console.log(JSON.stringify(postValue));
    console.log(JSON.stringify(getHeaders()));
    return fetch(`${Constant.BASE_URL}${methodName}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(postValue)
    }).then(response => {
        console.log(JSON.stringify(response));
            return response.json();
        
    }).then((responseJson) => {
        console.log(JSON.stringify(responseJson));
            return responseJson;
    })
        .catch((error) => {
            return error;
            console.error(error);
            
        });
};

export const getData = (methodName) => {
    console.log(`${Constant.BASE_URL}${methodName}`);
    console.log(JSON.stringify(getHeaders()));
    return fetch(`${Constant.BASE_URL}${methodName}`, {
        method: 'GET',
        headers: getHeaders(),
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
    }).then((responseJson) => {
        if (responseJson !== undefined && responseJson.code === 401) {
            logoutDeleteCase(responseJson.message);
        } else {
            return responseJson;
        }
    })
        .catch((error) => {
            return error;
            console.error(error);
        });
};


export const postDataWithImage = (methodName, postValue) => {
 
    console.log(`${Constant.BASE_URL}${methodName}`);
    console.log(getImageHeader());
    console.log(postValue);
    return fetch(`${Constant.BASE_URL}${methodName}`, {
        method: 'POST',
        headers: getImageHeader(),
        body: postValue
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
    }).then((responseJson) => {
        if (responseJson !== undefined && responseJson.code === 401) {
            logoutDeleteCase(responseJson.message);
        } else {
            return responseJson;
        }
    })
        .catch((error) => {
            return error;
            console.error(error);
        });
};

const logoutDeleteCase = (msg) => {
    const actions = [
        {
            text: 'Ok',
            onPress: () => {
                Database.fetchListFromDB('User', (flag, response) => {
                    if (flag) {
                      Database.deleteFromDB('User', response, (success) => {
                        SharedManager.getInstance().setUserInfo();
                      });
                    }
                  });
                  EventRegister.emit('refreshRootRounter', 'logout add');
            }
        }
    ];
    Common.showAlertwithAction(Constant.PROJECTNAME, msg, actions);
};
