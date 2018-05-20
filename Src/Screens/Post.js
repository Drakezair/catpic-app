import React,{ Component } from 'react';
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Post extends Component{

    render(){
        return(
                <View style={styles.card} >
                    <View style={styles.header} >
                        <Text>HOLA mundo </Text>
                    </View>
                    <View style={styles.image} >
                        <Image source={require('../Assets/Logo.png')}  />
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
    },
    image:{
        margin: "auto",
        alignItems: 'center',
    }
})

export default Post;