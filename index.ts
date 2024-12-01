import firebase from '@react-native-firebase/app';
import { registerRootComponent } from 'expo';

import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyAx9SNaSQ7156t23_VuJoNSf7IEaIE5tgk",
  authDomain: "flow-day-dc1de.firebaseapp.com",
  projectId: "flow-day-dc1de",
  storageBucket: "flow-day-dc1de.firebasestorage.app",
  messagingSenderId: "428576715841",
  appId: "1:428576715841:web:e09529d7ea8372e4fbc2c0",
  measurementId: "G-XJ9TD9FYCB"
};

firebase.initializeApp(firebaseConfig);

registerRootComponent(App);
