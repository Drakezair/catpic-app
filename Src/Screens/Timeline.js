import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList
}from 'react-native';

import Post from './Post';

class Timeline extends Component{

    render(){
        return(
            <View style={styles.container} >
                <View style={styles.header} >

                </View>
                <FlatList
                    style={styles.list}
                    data={[{key: 'a'}, {key: 'b'},{key: 'b'},{key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}, {key: 'b'}]}
                     renderItem={({item}) => <Post />}
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