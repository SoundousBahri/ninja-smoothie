import firebase from 'firebase'
import firestore from 'firebase/firestore'

let config = {
  apiKey: "AIzaSyDBCeeCtYRJi2wyhsF29BPuRMgygByHaNI",
  authDomain: "ninja-smoothie-b0757.firebaseapp.com",
  databaseURL: "https://ninja-smoothie-b0757.firebaseio.com",
  projectId: "ninja-smoothie-b0757",
  storageBucket: "ninja-smoothie-b0757.appspot.com",
  messagingSenderId: "889089101207",
  appId: "1:889089101207:web:3571ea57fba51c77f348d2",
  measurementId: "G-45CSDYE8T0"
};

const firebaseApp = firebase.initializeApp(config);
//firebaseApp.firestore().settings({timestampsInSnapshots:true})


//export firestore database
export default firebaseApp.firestore()
