import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Alert,
    Animated,
    FlatList,
    TouchableOpacity,
    Dimensions
}from 'react-native';
import store from '../store';
import * as firebase from 'firebase';
import ImageLoad from 'react-native-image-placeholder';
import Icon from 'react-native-vector-icons/FontAwesome';
import {draweAction} from '../actionCreators';
import { createBottomTabNavigator } from 'react-navigation';
import Large from './Large';
import Grid from './Grid';

const Tab = createBottomTabNavigator(
  {
    List: Large,
    Grid: Grid
  },
  {
    tabBarOptions: {
      style:{
        height:60
      },
      activeTintColor: '#9226ba',
      labelStyle: {
        fontSize: 13,
        fontFamily: 'Roboto'
      }
    }
  }
);

class Timeline extends Component{

    static router = Tab.router;

    render(){

        return(
            <View style={styles.container} >
              <View style={styles.header} >
                <Image source={require('../Assets/whiteLogo.png')} style={{margin: 5,height:60, width:60}} />
                <TouchableOpacity style={styles.button} onPress={()=>draweAction()} >
                  <Icon name="bars" size={40} color="white" />
                </TouchableOpacity>
              </View>
              <Tab navigation={this.props.navigation}  />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    header:{
        height: 70,
        backgroundColor: "#9226ba",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    list:{
        flex: 1,
    },
    card:{
        marginTop: 40,
        backgroundColor: "#d5d5d5",
    },
    headerText:{
      fontWeight: 'bold',
      fontFamily: 'Roboto',
      fontSize: 20,
      color: "#1f1f1f",
      margin: 5
    },
    button:{
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      marginRight: 20
    }
});

export default Timeline;
