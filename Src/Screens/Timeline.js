import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    Alert
}from 'react-native';
import store from '../store';
import * as firebase from 'firebase';

import Post from './Post';

class Timeline extends Component{

    state={
        posts: []
    }

    componentWillMount(){

        //Post get

        var postsRef = firebase.database().ref('posts');
        postsRef.on('child_added',(snapshot)=>{
            this.setState({
                posts: this.state.posts.concat(snapshot.val())
            })
        })
    }

    render(){
       
        return(
            <View style={styles.container} >
                <View style={styles.header} >

                </View>
                <FlatList
                    style={styles.list}
                    data={this.state.posts}
                    renderItem={({item}) => <Post item={item} />}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        height: 60,
        backgroundColor: "#9226ba",
        flex: .13
    },
    list:{
        flex: 1,
    }
});

export default Timeline;