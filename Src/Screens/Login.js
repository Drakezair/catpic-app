import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';


class Login extends Component{
    static navigationOptions = {
        
    }

    state={
        animate: new Animated.Value(0),
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
                    <Icon name="email" size={20} color="#919191" />
                </View>
                <TextInput 
                    style={this.style.input}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Email"
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
                />
            </View>
            <View style={this.style.optionsContaine} >
                <TouchableOpacity  activeOpacity={.8} >
                    <Text style={this.style.loginText} >Register</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8} >
                    <Text style={this.style.loginText} >Forget?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={this.style.loginButton} activeOpacity={.8} >
                <Text style={this.style.loginText} >Login</Text>
            </TouchableOpacity>
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
            justifyContent: 'space-between',
            width: "80%",
            marginBottom: 10,
        },
        loginButton:{
            height: 40,
            width: 80,
            backgroundColor: 'gray',
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