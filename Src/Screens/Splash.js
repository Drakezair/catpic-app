import React,{Component} from 'react';
import {
    View,
    Image,
    ActivityIndicator,
    Animated,
    Text
} from 'react-native';
import store from '../store';


class Splash extends Component{
    state={
        animate: new Animated.Value(0),
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

        store.subscribe(()=>{
            if(store.getState().user){
                this.props.navigation.navigate('inApp');
            }else{
                this.props.navigation.navigate('auth');
            }
        })
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
                  style={{height: 80, width: 80}}
                />
                <Text>CatPic's</Text>
            </Animated.View>
        )
    }
}

export default Splash;
