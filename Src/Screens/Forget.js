import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';


class Forget extends Component{

    state={
        animate: new Animated.Value(0),
        emailAddress: ""
    }

    background = this.state.animate.interpolate({
        inputRange:[0,1,2,3,4],
        outputRange:["#5000bf", "#8843e8",'#c76adc','#41a296','#34a8d8']
    })


    componentDidMount(){
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.animate,{
                    toValue:1,
                    duration: 3000
                }),
                Animated.timing(this.state.animate,{
                    toValue:2,
                    duration: 3000
                }),
                Animated.timing(this.state.animate,{
                    toValue:3,
                    duration: 3000
                }),
                Animated.timing(this.state.animate,{
                    toValue:4,
                    duration: 3000
                }),
                Animated.timing(this.state.animate,{
                    toValue:0,
                    duration: 12000
                })
            ])
        ).start()
    }

    backToLogin = () => {
        this.props.navigation.navigate('Login')
    }

    handleSend = () => {


        Alert.alert(
            'Restore password',
            'We send a restauration link to your email',
            [
              {text: 'Ok', onPress: ()=>{  firebase.auth().sendPasswordResetEmail(this.state.emailAddress).then(()=> this.props.navigation.navigate('Login')) }}
            ],
            {cancelable: false}
        )
    }

    render(){
        return(
          <Animated.View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: this.background
            }}
          >
            <Image
              source={require('../Assets/profile.png')}
              style={this.style.image}
            />
            <View style={this.style.inputContain} >
              <View style={this.style.iconContainer} >
                <Icon name="envelope" size={20} color="#919191" />
              </View>
              <TextInput
                style={this.style.input}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="email"
                onChangeText={(text)=>this.setState({emailAddress: text})}
                />
            </View>
            <TouchableOpacity style={this.style.loginButton} activeOpacity={.8} onPress={()=>this.handleSend()} >
                <Text style={this.style.loginText} >Send</Text>
            </TouchableOpacity>
            <View style={this.style.optionsContaine} >
                <TouchableOpacity activeOpacity={.8} onPress={()=>this.backToLogin()} >
                    <Text style={this.style.backText} >Back to login screen</Text>
                </TouchableOpacity>
            </View>
          </Animated.View>
        );
    }

    style = StyleSheet.create({
        image:{
            height: 80,
            width: 80
        },
        inputContain:{
            width: "80%",
            height: 40,
            backgroundColor: "#fff",
            borderRadius: 5,
            margin: 10,
            flexDirection: 'row',
        },
        input:{
            width: "90%"
        },
        iconContainer:{
           alignItems: 'center',
           justifyContent: 'center',
           width: "10%"
        },
        optionsContaine:{
            flexDirection: 'row',
            justifyContent: 'center',
            width: "80%",
            marginTop: 10,
        },
        loginButton:{
            height: 40,
            width: 80,
            backgroundColor: '#dfe0e1',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
        },
        loginText:{
            fontFamily: 'Roboto',
            color: '#6d6d6d',
            fontWeight: 'bold',
        },
        backText:{
            fontFamily: 'Roboto',
            color: '#fff',
            fontWeight: 'bold',
        }
    });
}


export default Forget;
