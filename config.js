import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD2I1CPsN6GTPvzSTxe7vAQgkAioqBbefQ",
  authDomain: "abilitycraft-d37cc.firebaseapp.com",
  databaseURL:
    "https://abilitycraft-d37cc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "abilitycraft-d37cc",
  storageBucket: "abilitycraft-d37cc.appspot.com",
  messagingSenderId: "317565837465",
  appId: "1:317565837465:web:b8e8feb0c016b252a89808",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();
export { db };
