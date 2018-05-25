import React,{Component} from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet
}from 'react-native';
import store from '../store';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import {draweAction} from '../actionCreators';
import {ImageCrop} from 'react-native-image-cropper';

class Sidebar extends Component{

    state={
        avatar: require('../Assets/Logo.png')
    }

    componentDidMount(){
      firebase.database().ref(`users/${store.getState().user.displayName}/profileUrl`)
      .on('value',snapshot=>{
        if(snapshot.val()){
          this.setState({
            avatar: {uri: snapshot.val()}
          })
        }
      })
    }



    render(){
        return(
            <View style={styles.container} >
              <TouchableOpacity style={styles.exitButton} onPress={()=> draweAction()} >
                <Icon name="times-circle" size={40} color="red" />
              </TouchableOpacity>
              <Image
                source={this.state.avatar}
                style={styles.image}
              />
              <TouchableOpacity style={styles.button} >
                <Text style={styles.textButton} ><Icon name="edit" size={20} color="white" />Set profile pic</Text>
              </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
  },
  image:{
    height:200,
    width: 200,
    borderRadius: 100,
    margin: 40,
    marginTop: 0
  },
  exitButton:{
    alignSelf: 'flex-start',
    margin:10,
  },
  button:{
    height:40,
    width: 160,
    backgroundColor: "#9226ba",
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton:{
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  }
});

export default Sidebar;
