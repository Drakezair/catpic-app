import * as firebase from 'firebase';
import { YellowBox } from 'react-native';

const config = {
    apiKey: "AIzaSyCpeOtbDXyjAjbJN8sjOxKAE8WeqZ-al1U",
    authDomain: "catpics-d106c.firebaseapp.com",
    databaseURL: "https://catpics-d106c.firebaseio.com",
    projectId: "catpics-d106c",
    storageBucket: "catpics-d106c.appspot.com",
    messagingSenderId: "411834796226"
  };
  firebase.initializeApp(config);

  console.ignoredYellowBox = ['Setting a timer'];
  YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
  export default config;
