import {  createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading]=useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();
    
    const createUser=(email,password)=>{
        setLoading(true);
       return createUserWithEmailAndPassword(auth,email,password);
    }
    const signInUser=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }
    
    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }
    const updateUserProfile = (name,photo) =>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    const authInfo={
        user,
        setUser,
        loading,
        createUser,
        signInUser,
        googleSignIn,
        logOut,
        updateUserProfile
    }
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            
            console.log('old user',currentUser);
            setUser(currentUser);
            if(currentUser){
                // get token and store client
                const userInfo = {email:currentUser.email};
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token);
                        
                        
                    }
                })

            }
            else{
                localStorage.removeItem('access-token');
                
                


            }
            setLoading(false);
            
            
            
        })
        return ()=>{
            unsubscribe();
        }
    },[axiosPublic])
    // uporer line a axiosPublic dependenccy hobe

    return (
        <AuthContext.Provider value={authInfo}>
                 {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    
    children: PropTypes.node,
    
}

export default AuthProvider;
