import { useContext, createContext } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

import { auth } from "../../../utils/firebase";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
        //signInWithRedirect(auth, provider)
      };

    return (
        <AuthContext.Provider value={{ googleSignIn }}>
            {children}
        </AuthContext.Provider>
    );
};


export const UserAuth = () => {
    return useContext(AuthContext);
};