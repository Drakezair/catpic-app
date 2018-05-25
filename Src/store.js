import { createStore } from 'redux';
import * as firebase from 'firebase';
import config from './Config'

const reducer = (state, action) => {

    //HandleUser
    switch(action.type){
        default:
            return state;
            break;
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
            break;
        case "LOGIN_LOADER":
            return{
                ...state,
                loginLoader: action.loginLoader
            }
            break;
        case "DRAWER":
            return{
              ...state,
              toggle: action.toggle
            }
    }
}

export default createStore(reducer,{
    user: null,
    users: null,
    loginLoader: false,
    toggle: false
})
