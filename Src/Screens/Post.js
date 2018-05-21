import React,{ Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

class Post extends Component{

    state = {
        avatar: require('../Assets/Logo.png'),
        likedColor: 'purple',
        imageUrl: ""
    }

    async componentWillMount(){
        try{
        this.setState({
            imageUrl: this.props.item.imgUrl
        })

        firebase.database().ref(`users/${this.props.item.user}/profileUrl`).on('value', snapshot=>{
            if(snapshot.val()!== ""){
                this.setState({
                    avatar: {uri: snapshot.val()}
                })
            }
        })
    }catch(error){
        
    }

    }

    isLiked = () => this.setState({likedColor:"black"})



    render(){
        return(
                <View style={styles.card} >
                    <View style={styles.header} >
                        <Image source={this.state.avatar} style={styles.avatar} />                        
                        <Text style={styles.username} >{this.props.item.user}</Text>
                    </View>
                    <View style={styles.image} >
                        <Image source={{uri: this.state.imageUrl}} style={{minHeight: 360,width: "100%"}} />
                    </View>
                    <View style={styles.buttonsContainer} >
                        <TouchableOpacity onPress={()=> this.isLiked()} >
                            <Animated.View
                                style={{
                                    height: 40,
                                    width: 40,
                                    backgroundColor: this.state.likedColor,
                                    borderRadius: 50,
                                    margin: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Icon name="paw" color="white" size={15} />
                            </Animated.View>
                        </TouchableOpacity >
                        <TouchableOpacity style={styles.button1}  onPress={()=>{console.log(this.state.imageUrl)}} >
                            <Icon name="comments" color="white" size={15} />
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#80808066',
        margin: 5,
        borderRadius: 5,
    },
    header:{
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
    },
    username:{
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: "#000",
        fontSize: 25,
    },
    avatar:{
        height: 60,
        width: 60,
        borderRadius: 50,
        margin: 5
    },
    image:{
        alignItems: 'center',
        backgroundColor: "#61616166",
    },
    buttonsContainer:{
        flexDirection: 'row',
    },
    button1:{
        height: 40,
        width: 40,
        backgroundColor: "#1c1d1e",
        borderRadius: 50,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Post;