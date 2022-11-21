import auth from '@react-native-firebase/auth';


export const handleSignUp = async (email, password) => {
    await auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("user created successfully");
        })
        .catch((error) => {
            console.log(error);
        });
}

export const handleSignIn = async (email, password) => {
    await auth().signInWithEmailAndPassword(email, password)
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