import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

var config = {
  apiKey: "AIzaSyBkivLv_tYDmy5jXIMpzugGl8hdp40uJ2o",
  authDomain: "present-sir-b4aec.firebaseapp.com",
  databaseURL: "https://present-sir-b4aec.firebaseio.com",
  projectId: "present-sir-b4aec",
  storageBucket: "present-sir-b4aec.appspot.com",
  messagingSenderId: "113563962343"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots: true});

export default firebaseApp.firestore()
