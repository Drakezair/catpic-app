/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Slider,
  Modal,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from 'react-navigation';

//Screens

import Login from './Src/Screens/Login';
import Register from './Src/Screens/Register';
import Forget from './Src/Screens/Forget';


const App = createStackNavigator(
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

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
