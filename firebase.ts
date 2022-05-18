import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyBbeA8F5y9YZuOzcglJ3qrbk2QX3b-H1zY",
    authDomain: "hullaballoo-ddd3f.firebaseapp.com",
    projectId: "hullaballoo-ddd3f",
    storageBucket: "hullaballoo-ddd3f.appspot.com",
    messagingSenderId: "1035417203735",
    appId: "1:1035417203735:web:75600d1952f1126d195852",
    measurementId: "G-NKQ4CT5T44"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export default db;