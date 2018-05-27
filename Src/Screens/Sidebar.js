import React,{Component} from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ActivityIndicator
}from 'react-native';
import store from '../store';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import {draweAction} from '../actionCreators';
import RNFetchBlob from 'react-native-fetch-blob';

var ImagePicker = require('react-native-image-picker');

var options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const UploadImage = (uri, imageName, mime = 'image/jpg') => {
  return new Promise((resolve, reject) => {
    const uploadUri = uri
    let uploadBlob = null
    const imageRef = firebase.storage().ref('Posts').child(`${store.getState().user.displayName}_${imageName}`)
    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, {type: `${mime};BASE64`})
      })
      .then((blob) => {
        console.log(blob)
        uploadBlob = blob
        return imageRef.put(blob)
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}


class Sidebar extends Component{

    state={
        avatar: require('../Assets/Logo.png'),
        loading: false,
        loadin1: false
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

    handleUpload = () => {
      if(!this.state.loading){
        ImagePicker.showImagePicker(options,(response)=>{
          if(response.uri){
            this.setState({loading: true})
            UploadImage(response.uri,response.fileName)
            .then(responseData => {
              var newKey = firebase.database().ref().child('posts').push().key;

              firebase.database().ref('posts/' + newKey).set({
                user: store.getState().user.displayName,
                likes: 0,
                comments:"",
                imgUrl:responseData,
                key: newKey,
                usersliked: ""
              })
              .then(()=>this.setState({loading: false}))
            })
            .done()
          }
        })
      }
    }

    handleProfile = () => {
      if(!this.state.loadin1){
        ImagePicker.showImagePicker(options,(response)=>{
          if(response.uri){
            this.setState({loading1: true})
            UploadImage(response.uri,response.fileName)
            .then(responseData => {
              var newKey = firebase.database().ref().child('posts').push().key;

              firebase.database().ref(`users/${store.getState().user.displayName}`).update({profileUrl:responseData})
              .then(()=>this.setState({loading1: false}))
            })
            .done()
          }
        })
      }
    }



    render(){
      const Indicator = () => {
        return this.state.loading1 ? <ActivityIndicator size="large" style={styles.profileLoader} /> : null
      };
        return(
            <View style={styles.container} >
              <TouchableOpacity style={styles.exitButton} onPress={()=> draweAction()} >
                <Icon name="times-circle" size={40} color="red" />
              </TouchableOpacity>
              <Image
                source={this.state.avatar}
                style={styles.image}
              />
              <Text style={styles.username} >{store.getState().user.displayName}</Text>
              <TouchableOpacity style={styles.button} onPress={()=>this.handleProfile()} >
                <Text style={styles.textButton} ><Icon name="edit" size={20} color="white" />Set profile pic</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=>this.handleUpload()} >
                <Text style={styles.textButton} ><Icon name="cloud-upload" size={20} color="white" />Set profile pic</Text>
              </TouchableOpacity>
              <Indicator/>
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
    margin: 20,
    marginTop: 0
  },
  username:{
    color: '#1f1f1f',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: 28,
    marginBottom:20
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
    alignItems: 'center',
    marginBottom: 20
  },
  textButton:{
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  },
  profileLoader:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: 10
  }
});

export default Sidebar;
