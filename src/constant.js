import React from 'react';
import { Dimensions } from 'react-native';

//Base URL
export const BASE_URL = 'http://api.reactnatively.venny.co/';


export const PROJECTNAME = 'TypeOrDraw';
export const EMAILREG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORDREG = /^\S{3,}$/;
export const AlPHABETREG = /^[A-z]+$/;

export const HeaderColor = 'rgba(87,139,59,1)';
export const ButtonColor = 'rgba(173,32,33,1)';

export const ApiMethods = {
    login: 'v2/login?',
    regisration: 'v2/register?',
    getQuotes: 'includes/api/quotes.json',
    postQuotes: 'v2/posts?',
    getcomments: 'v2/comments?',
    postcomments: 'v2/comments?',
};

export const Images = {
};

export const Messages = {
    server_error: 'Something went wrong, please try again.',
    no_internet: 'No internet, please check your internet.',
    logout_message: 'Are you sure you want to logout?'
};

export const RoleType = {
    NCL: 1,
    RCL: 2,
    CL: 3,
    CM: 4,
    None: 5
};

export const EventActions = {
    InterestedandComing: 1,
    NotInterested: 2,
    MaybeComing: 3,
    None: 0
};

export const ScreenSize = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
};
