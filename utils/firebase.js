import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: "802202870854-69ncrjel7ora5olfptons8lptl2f9va3.apps.googleusercontent.com",
});


export const handleSignUp = async (email, password, name, picture, setLoading, step, setStep) => {
    setLoading(true);
    auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            uploadImage(picture, userCredential.user.uid, "profiles").then(url => {
                const update = {
                    displayName: name,
                    photoURL: url,
                };
                userCredential.user.updateProfile(update);
                setLoading(false);
                setStep(step+1);
                console.log("user created successfully");
            })
            .catch((error) => {
                console.log(error)
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

export const handleSignIn = async (email, password, setDisconnected) => {
    auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setDisconnected(false);
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

const uploadImage = async (uri, name, firebasePath) => {
    try {
        const imageRef = storage().ref(`${firebasePath}/${name}`);
        await imageRef.putFile(uri, { contentType: 'image/jpg'}).catch((error) => { throw error });
        return await imageRef.getDownloadURL()
    } catch(err){
        console.log(err);
    }
}