import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
    webClientId: "802202870854-69ncrjel7ora5olfptons8lptl2f9va3.apps.googleusercontent.com",
});


export function addUserToDB(setLoading, id, name, profilpic, birthdate, picture1, picture2, picture3, instrument){
    setLoading(true);
    firestore()
        .collection('users')
        .doc(id)
        .set({
            id: id,
            name: name,
            profilpic: profilpic,
            birthdate: birthdate,
            picture1: picture1,
            picture2: picture2,
            picture3: picture3,
            instrument: instrument,
        })
        .then(() => {
            setLoading(false);
            console.log('user added to db!');
        });
}

export const handleSignUp = async (email, password, name, picture, setLoading, step, setStep) => {
    setLoading(true);
    auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            uploadImage(picture, "prof"+userCredential.user.uid, "users/"+userCredential.user.uid).then(url => {
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

export const handleSignIn = async (email, password, setLoading, setDisconnected) => {
    setLoading(true);
    auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setLoading(false);
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

export async function onGoogleButtonPress(setLoading, setDisconnected) {
    setLoading(true);
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    setLoading(false);
    setDisconnected(false);
    return auth().signInWithCredential(googleCredential);
}

export const uploadImage = async (uri, name, firebasePath) => {
    try {
        const imageRef = storage().ref(`${firebasePath}/${name}`);
        await imageRef.putFile(uri, { contentType: 'image/jpg'}).catch((error) => { throw error });
        return await imageRef.getDownloadURL()
    } catch(err){
        console.log(err);
    }
}


export async function checkUserExistence(userUid){
    let unsub;
    unsub = firestore()
        .collection('users')
        .doc(userUid)
        .onSnapshot(documentSnapshot => {
            if (!documentSnapshot.exists){
                return false;
            } else{
                return true;
            }
    });

    return () => unsub();
}

async function fetchCards(setProfiles){
    let unsub;
    unsub = firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        setProfiles(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
        )
    });

    // Stop listening for updates when no longer required
    return () => unsub();
} 