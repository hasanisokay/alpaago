/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, sendEmailVerification, FacebookAuthProvider } from "firebase/auth"
import { app } from '../Firebase/firebase.config.mjs';


export const AuthContext = createContext(null);

const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

console.log(user);
    const varifyEmail = () => {
        return sendEmailVerification(auth.currentUser)
    }
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }
    const register = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const setProfile = (displayName, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName, photoURL
        })
    }
    const withGoogle = () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }
    const withFacebook = () => {
        const provider = new FacebookAuthProvider();
        return signInWithPopup(auth, provider);
    }
    const withGihub = () => {
        const provider = new GithubAuthProvider()
        return signInWithPopup(auth, provider)
    }
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true);
        signOut(auth);
    }


    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const authInfo = { user, setUser, loading, setLoading, varifyEmail, withGoogle, withGihub, login, register, withFacebook, setProfile, logOut, resetPassword }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;