// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { auth, signInWithGoogle as firebaseSignIn, signOut as firebaseSignOut } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const signInWithGoogle = async () => {
        try {
            setLoading(true);
            await firebaseSignIn();
            message.success('Successfully logged in!');
        } catch (error) {
            message.error('Login failed: ' + error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut();
            setUser(null);
            message.success('Logged out successfully');
        } catch (error) {
            message.error('Logout failed');
        }
    };

    const value = {
        user,
        loading,
        signInWithGoogle,
        signOut
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};