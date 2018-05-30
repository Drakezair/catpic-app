/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator  } from 'react-navigation';

//Screens

import Splash from './Src/Screens/Splash';
import Login from './Src/Screens/Login';
import Register from './Src/Screens/Register';
import Forget from './Src/Screens/Forget';
import Timeline from './Src/Screens/Timeline';
import Sidebar from './Src/Screens/Sidebar';
import Post from './Src/Screens/Post';

const widthScreen = Dimensions.get('window').width

const Auth = createStackNavigator(
  {
  Login: Login,
  Register: Register,
  Forget: Forget
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: {
        height: 0
      }
    }
  }
);

const InApp = createDrawerNavigator(
  {
    timeline: Timeline,
    post: Post
  },
  {
    drawerPosition: 'right',
    drawerWidth: widthScreen,
    contentComponent: Sidebar,
  }
)

const App = createSwitchNavigator(
  {
    splash: Splash,
    auth: Auth,
    inApp: InApp
  },
  {
    initialRouteName:'splash'
  }
)

export default App;
