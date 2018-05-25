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

const itemWidth = Dimensions.get('window').width -12


class Large extends Component{

  static navigationOptions ={
    tabBarIcon: ({ tintColor }) => (<Icon name='th' size={25} color={tintColor} />)
  }

  state={
      posts: [],
      loadin: false
  }

  componentDidMount(){

      //Post get
      this.setState({loadin: true})
      var postsRef = firebase.database().ref('posts')
      postsRef.once('value',(snapshot)=>{
         var arr = []
         snapshot.forEach(child=>{
             arr = arr.concat(child.val())
         })
         this.setState({
             posts: this.state.posts.concat(arr.reverse())
         })
      })
      .then(()=>{
          this.setState({
              loadin: false
          })
      })

      store.subscribe(()=>{
        if(store.getState().toggle){
          this.props.navigation.openDrawer();
        }else{
          this.props.navigation.closeDrawer();
        }
      })
  }

  handleLimit= ()=>{
      this.setState({loadin: true, posts: []})

      var postsRef = firebase.database().ref('posts')
      postsRef.once('value',(snapshot)=>{
         var arr = []
         snapshot.forEach(child=>{
             arr = arr.concat(child.val())
         })
         this.setState({
             posts: this.state.posts.concat(arr.reverse())
         })
      })
      .then(()=>{
          this.setState({
              loadin: false
          })
      })
  }


  render(){
    return(
          <FlatList
            data={this.state.posts}
            onRefresh={()=>this.handleLimit()}
            refreshing={this.state.loadin}
            numColumns={3}
            renderItem={({item})=>(
              <TouchableOpacity >
                <Image source={{uri: item.imgUrl}}
                  style={{
                    width: itemWidth / 3,
                    height: itemWidth / 3,
                    margin: 2
                  }}
                />
              </TouchableOpacity>
            )}
          />
    )
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

export default Large;
