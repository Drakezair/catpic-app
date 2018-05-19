import { createStore } from 'redux';
import * as firebase from 'firebase';
import config from './Config'

const reducer = (state, action) => {

    //HandleUser
    switch(action.type){
        case "CURRENT_USER": 
            return {
                ...state,
                user: action.user
            }
            break;
        case "GET_USERS":
            return{
                ...state,
                users: action.users
            }
    }


    return state;
}

export default createStore(reducer,{
    user: null,
    users: null
 });