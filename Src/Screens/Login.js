import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Alert,
    ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import store from '../store';
import {login} from '../actionCreators';

import * as firebase from 'firebase';

class Login extends Component{

    state={
        animate: new Animated.Value(0),
        loading: false
    }

    background = this.state.animate.interpolate({
        inputRange:[0,1,2,3,4],
        outputRange:["#5000bf", "#8843e8",'#c76adc','#41a296','#34a8d8']
    })


    componentDidMount(){

        //Background anim

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

        store.subscribe(()=>{
            this.setState({
                loading : store.getState().loginLoader
            })
        })
        
    }

    toRegister = () => this.props.navigation.navigate('Register');

    toForget = () => this.props.navigation.navigate('Forget');

    handleLogin= () => login(this.state.email,this.state.password)

    render(){
        if(!this.state.loading){
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
                        <Icon name="email" size={20} color="#919191" />
                    </View>
                    <TextInput 
                        style={this.style.input}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Email"
                        keyboardType="email-address"
                        value={this.state.email}
                        onChangeText={(email)=>this.setState({email})}
                    />
                </View>
                <View style={this.style.inputContain} >
                    <View style={this.style.iconContainer} >
                        <Icon name="lock" size={20} color="#919191" />
                    </View>
                    <TextInput 
                        style={this.style.input}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Password"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(password)=>this.setState({password})}
                    />
                </View>
                <View style={this.style.optionsContaine} >
                    <TouchableOpacity  activeOpacity={.8} onPress={()=>this.toRegister()} >
                        <Text style={this.style.loginText} >Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} onPress={()=>this.toForget()} >
                        <Text style={this.style.loginText} >Forget?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={this.style.loginButton} activeOpacity={.8} onPress={()=>this.handleLogin()} >

                    <Text style={{fontFamily: 'Roboto',color: '#6d6d6d',fontWeight: 'bold',}} >Login</Text>
                </TouchableOpacity>
              </Animated.View>  
            );
        }else{
            return(
                <Animated.View 
                    style={{
                     flex: 1,
                     justifyContent: "center",
                     alignItems: "center",
                     backgroundColor: this.background
                    }} 
                >
                    <ActivityIndicator size={80} color="#fff" />
                </Animated.View>
            );
        }
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
            justifyContent: 'space-between',
            width: "80%",
            marginBottom: 10,
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
            color: '#fff',
            fontWeight: 'bold',
        }
    });
}


export default Login;