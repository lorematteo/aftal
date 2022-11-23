import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

import MainScreen from "./src/Main/index";
import SignScreen from "./src/Sign/sign";

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <SignScreen/>
    );
  }

  return (
    <MainScreen/>
  );
}
