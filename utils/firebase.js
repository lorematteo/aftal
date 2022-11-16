import AsyncStorage from '@react-native-async-storage/async-storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_HVwhUQxSlNIRVLSm7LZRYXZO8Dgg1S0",
  authDomain: "aftal-b674.firebaseapp.com",
  projectId: "aftal-b674",
  storageBucket: "aftal-b674.appspot.com",
  messagingSenderId: "802202870854",
  appId: "1:802202870854:web:2d137e3d03eff690ab9647",
  measurementId: "G-WYGGVY060R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });;
