import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export const handleSignUp = async (email, password) => {
    auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user created successfully");
            console.log(user)
        })
        .catch((error) => {
            console.log(error);
        });
}

export const handleSignIn = async (email, password) => {
    auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user logged successfully");
        })
        .catch((error) => {
            console.log(error);
        });
}

export const signOut = () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}

GoogleSignin.configure({
    webClientId: "802202870854-69ncrjel7ora5olfptons8lptl2f9va3.apps.googleusercontent.com",
  });

export async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}