import React,{ Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Alert,
  Dimensions,
  TextInput,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import store from '../store';

widthScreen = Dimensions.get('window').width

class Post extends Component{

  state={
    item: null,
    animateY: new Animated.Value(0),
    avatar: require('../Assets/Logo.png'),
    input:"",
    comentarios: [],
    likes: 0,
    likedButton: 'black',
    comAvatar: "https://firebasestorage.googleapis.com/v0/b/catpics-d106c.appspot.com/o/Logo.png?alt=media&token=56e25256-af35-4e34-ac36-4b620559dbb9"


  }

  componentWillMount(){


    const items = this.props.navigation.getParam('item', null)
    this.setState({item: items})

    var refCom = firebase.database().ref(`users/${items.displayName}/profileUrl`);

    refCom.on('value',s=>{
      if(s.val() !== ""){
        this.setState({commentAvatar: s.val()})
      }
    })

    var ref = firebase.database().ref(`users/${items.user}/profileUrl`);
    ref.on('value',(snapshot)=>{
      if(snapshot.val()){
        this.setState({
            avatar: {uri: snapshot.val()},
           comAvatar: snapshot.val()
         })
      }
    });

    var comen = firebase.database().ref(`posts/${items.key}/comments`);
    comen.on('child_added', snapshot => {
      this.setState({
        comentarios: this.state.comentarios.concat(snapshot.val())
      })
    })

    var likesRef = firebase.database().ref(`posts/${items.key}/likes`);

  likesRef.on('value', snapshot => {
    this.setState({
      likes: snapshot.val()
    })
  })

    var likedRef = firebase.database().ref(`posts/${items.key}/usersliked/${store.getState().user.displayName}`);

  likedRef.once('value',s=>{

    var likesOpRef = firebase.database().ref(`posts/${items.key}`);
    if(s.child('name').val() !== null && s.child('boolean').val() === true ){
      this.setState({
        likedButton: "#a333c8"
      })
    }else{
      this.setState({
        likedButton: "black"
      })
    }
  })
  }

  back=()=>{
    this.props.navigation.navigate('timeline')
  }

  handleLike = () => {

    var likedRef = firebase.database().ref(`posts/${this.state.item.key}/usersliked/${store.getState().user.displayName}`);

    likedRef.once('value',s=>{
      if(s.child("name").val() === null){
        likedRef.set({
          name: store.getState().user.displayName,
          boolean:true
        })
      }

      var likesOpRef = firebase.database().ref(`posts/${this.state.item.key}`);
      if(s.child('boolean').val() === true){
        likesOpRef.update({likes: this.state.likes - 1});
        likedRef.child("boolean").set(false)
        firebase.database().ref(`users/${this.state.item.user}`).once('value',snapshot=>{
          firebase.database().ref(`users/${this.state.item.user}`).update({
            likes: snapshot.child('likes').val() - 1
          })
        })
        this.setState({
          likedButton: "black"
        })

      }else{
        likesOpRef.update({likes: this.state.likes + 1});
        likedRef.child("boolean").set(true)
        firebase.database().ref(`users/${this.state.item.user}`).once('value',snapshot=>{
          firebase.database().ref(`users/${this.state.item.user}`).update({
            likes: snapshot.child('likes').val() + 1
          })
        })
        this.setState({
          likedButton: "#a333c8"
        })
      }
    })

  }


  handleComment = () =>{

  firebase.database().ref(`posts/${this.state.item.key}/comments`).push().set({
    username: store.getState().user.displayName,
    comment: this.state.input,
    avatar: this.state.comAvatar
  });


  this.setState({
    input: ""
  });

}

  render(){
    return(
      <View style={styles.container} >
        <View style={styles.header} >
          <Image
            source={this.state.avatar}
            style={{margin: 5,height:60, width:60, borderRadius: 50}}
          />
          <Text style={styles.headerText} >{this.state.item.user}</Text>
          <TouchableOpacity style={styles.button} onPress={()=>this.back()} >
            <Icon name="arrow-left" size={40} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, width:widthScreen}} >
          <Image
            resizeMode={Image.resizeMode.contain}
            source={{uri: this.state.item.imgUrl}}
            style={{flex: 1, width:widthScreen, marginTop: 5,}}
          />
        </View>
        <View style={styles.buttonViews} >
          <TouchableOpacity onPress={()=>this.handleLike()} >
            <Animated.View
              style={{
                backgroundColor: this.state.likedButton,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                borderRadius: 50
              }}
            >
              <Icon name="paw" size={20} color="white" />
            </Animated.View>
          </TouchableOpacity>
          <Text>{this.state.likes.toString()}</Text>
        </View>
        <ScrollView style={styles.ScrollView} >
          {
            this.state.comentarios.map((comment, index) => (
              <View key={index} style={styles.comContain} >
                <View style={styles.userComment} >
                  <Image
                    source={{uri: comment.avatar}}
                    style={styles.avatar}
                  />
                  <Text style={styles.textUserCom} >{comment.username}</Text>
                </View>
                <Text style={styles.textCom} >{`${comment.comment}`}</Text>
              </View>
            ))
          }
        </ScrollView>
        <View style={styles.inputContainer} >
          <View style={styles.textInput} >
            <TextInput
              ref={'hola'}
              multiline
              value={this.state.input}
              placeholder="Comment something"
              onChangeText={(text)=>this.setState({input: text})}
            />
          </View>
          <TouchableOpacity onPress={()=>this.handleComment()} >
            <View style={styles.send} >
              <Icon name="paper-plane" size={25} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>
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
        alignItems: 'center',
    },
    button:{
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      marginRight: 20
    },
    headerText:{
      fontWeight: 'bold',
      fontFamily: 'Roboto',
      fontSize: 30,
      color: "#fff",
      margin: 5
    },
    ScrollView:{
    },
    buttonViews:{
      alignItems: 'center',
      flexDirection: 'row'
    },
    inputContainer:{
      flexDirection: 'row',
      backgroundColor: "#9226ba",
      alignItems: 'center'
    },
    textInput:{
      width: "85%",
      margin: 5,
      backgroundColor: '#fff',
      borderRadius: 8
    },
    send:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      height:45,
      width: 45,
      borderRadius: 50
    },
    avatar:{
      width: 35,
      height: 35,
      borderRadius: 50,
      margin: 5
    },
    userComment:{
      flexDirection:'row',
     alignItems:'center'
   },
   textUserCom:{
     fontFamily: 'Roboto',
     fontWeight: 'bold',
     color: '#000',
     fontSize: 20
   },
   textCom:{
     fontFamily: 'Roboto',
     fontWeight: 'bold',
     color: '#000',
     fontSize: 25
   },
   comContain:{
     backgroundColor: '#cdcdcd',
     margin: 5,
     borderRadius: 10
   }
  });

export default Post;
