import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBSiQ0CjFUXOi-n8CwWmDVCPKQODSHMknE',
  authDomain: 'ml-website-5ae7a.firebaseapp.com',
  projectId: 'ml-website-5ae7a',
  storageBucket: 'ml-website-5ae7a.appspot.com',
  messagingSenderId: '479790400720',
  appId: '1:479790400720:web:1a992bed5171df74690ad5',
  measurementId: "G-NYKFMMJ1Y6",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default firebaseApp;
