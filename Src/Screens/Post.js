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

widthScreen = Dimensions.get('window').width

class Post extends Component{

  state={
    item: null,
    animateY: new Animated.Value(0),
    avatar: require('../Assets/Logo.png')
  }

  componentWillMount(){
    const items = this.props.navigation.getParam('item', null)
    this.setState({item: items})

    var ref = firebase.database().ref(`users/${items.user}/profileUrl`);
    ref.on('value',(snapshot)=>{
      if(snapshot.val()){
        this.setState({ avatar: {uri: snapshot.val()}})
      }
    })
  }

  back=()=>{
    this.props.navigation.navigate('timeline')
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
          <TouchableOpacity onPress={()=>this.refs.hola.isFocused(false)} >
            <Animated.View
              style={{
                backgroundColor: "black",
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                borderRadius: 50
              }}
            >
              <Icon name="paw" size={25} color="white" />
            </Animated.View>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.ScrollView} >

        </ScrollView>
        <View>
          <TextInput
            ref={'hola'}
            multiline
            placeholder="Comment something"
          />
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
    }
  });

export default Post;
