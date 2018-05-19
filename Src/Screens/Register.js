import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import store from '../store';
import {register} from '../actionCreators';

class Register extends Component{

    state={
        animate: new Animated.Value(0),
        loading: false,
        usersExist: [],
    }

    background = this.state.animate.interpolate({
        inputRange:[0,1,2,3,4],
        outputRange:["#5000bf", "#8843e8",'#c76adc','#41a296','#34a8d8']
    })


    componentWillMount(){
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

    backToLogin = () => this.props.navigation.navigate('Login');

    handleRegister= () => register(this.state.username,this.state.email,this.state.password,this.state.repassword);

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
                        <Icon name="at" size={20} color="#919191" />
                    </View>
                    <TextInput 
                        style={this.style.input}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Username"
                        value={this.state.username}
                        onChangeText={(username)=>this.setState({username})}
                    />
                </View>
                <View style={this.style.inputContain} >
                    <View style={this.style.iconContainer} >
                        <Icon name="envelope" size={20} color="#919191" />
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
                <View style={this.style.inputContain} >
                    <View style={this.style.iconContainer} >
                        <Icon name="lock" size={20} color="#919191" />
                    </View>
                    <TextInput 
                        style={this.style.input}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Re-Password"
                        secureTextEntry={true} 
                        value={this.state.repassword}
                        onChangeText={(repassword)=>this.setState({repassword})}
                    />
                </View>
                <TouchableOpacity style={this.style.loginButton} activeOpacity={.8} onPress={()=>this.handleRegister()} >
                    <Text style={this.style.loginText} >Register</Text>
                </TouchableOpacity>
                <View style={this.style.optionsContaine} >
                    <TouchableOpacity activeOpacity={.8} onPress={()=>this.backToLogin()} >
                        <Text style={this.style.backText} >If you have an account, click here</Text>
                    </TouchableOpacity>
                </View>
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
            width: "90%",
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


export default Register;