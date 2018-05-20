import * as firebase from 'firebase';
import store from './store';
import {Alert} from 'react-native';

//Persistant state
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

//Session state

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        store.dispatch({
            type: "CURRENT_USER",
            user:user
        });
    }else{
        store.dispatch({
            type: "CURRENT_USER",
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

const register = (username, email, pass, repass) => {
    var obj = store.getState().users;
    var arr = Object.keys(obj)
    if(arr.includes(username)){
        Alert.alert(`Sorry, ${username} is already in uso`)
    }else if(pass !== repass){
        Alert.alert(`The password must be the same`)
    }else{
        firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(()=>{
            usersRef.child(`${username}`).set({
                likes: 0,
                posts: 0,
                profileUrl:""
            })
        })
        .catch((error)=>{

            Alert.alert(error.message);
        })
    }
}

export { login, register };