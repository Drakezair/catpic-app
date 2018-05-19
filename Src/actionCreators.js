import * as firebase from 'firebase';
import store from './store';
import {Alert} from 'react-native';

//Persistant state
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

//Session state

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        store.dispatch({
            type: "User",
            user
        });
    }else{
        store.dispatch({
            type: "User",
            user: null
        });
    }
});

//Users Get

var usersRef = firebase.database().ref('users');

usersRef.on('value', snapshot =>{
    store.dispatch({
        type: "GET_USERS",
        users: snapshot.val()
    })
})

const login = (email, pass) => {
    if(email && pass){
        firebase.auth().signInWithEmailAndPassword(email,pass)
        .catch((error)=>{
            //HandleErrors
            Alert.alert(error.message);
        })
    }else if(!email){
        Alert.alert('email is required');
    }else if(!pass){
        Alert.alert('password is required');
    }
}

const register = (email, pass) => {

}

export { login };