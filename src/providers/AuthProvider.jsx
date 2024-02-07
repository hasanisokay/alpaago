/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, sendEmailVerification, FacebookAuthProvider } from "firebase/auth"
import { app } from '../Firebase/firebase.config.mjs';
// eslint-disable-next-line no-unused-vars
import { ref, update, getDatabase, } from 'firebase/database';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const auth = getAuth(app)
    const db = getDatabase(app);
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const varifyEmail = () => {
        return sendEmailVerification(auth.currentUser)
    }
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }
    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
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
    const handleLogin = (userId, name) => {
        const userRef = ref(db, `users/${userId}`);
        update(userRef, { status: "active", name, addedDate: new Date() });
    };

    const handleLogout = (userId) => {
        const userRef = ref(db, `users/${userId}`);
        update(userRef, { status: "inactive", addedDate: new Date() });
    };

    const login = (email, password) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)

    }
    const logOut = () => {
        setLoading(true);
        signOut(auth);
        handleLogout(user?.uid);
    }


    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                handleLogin(currentUser?.uid, currentUser.displayName);
            } else {
                handleLogout(user?.uid);
            }
            setLoading(false)
            setLoading(false)
        })
        return () => unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, auth, register ])

    const authInfo = { user, db, setUser, loading, setLoading, varifyEmail, withGoogle, withGihub, login, register, withFacebook, setProfile, handleLogin, logOut, resetPassword }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;