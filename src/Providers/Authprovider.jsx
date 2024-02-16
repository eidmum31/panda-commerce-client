import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.init";
export const AuthContext = createContext({});
import { getAuth, createUserWithEmailAndPassword,  signInWithEmailAndPassword,  onAuthStateChanged, signOut,  } from "firebase/auth";
const Authprovider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cart,setCart]=useState(JSON.parse(localStorage.getItem('cart'))||[]);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const AuthInfo = {
    logOut,
    user,
    createUser,
    loginUser,
    loading,
    cart,
    setCart
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default Authprovider;
