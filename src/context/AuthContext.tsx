import { FC, createContext, useState, useEffect } from "react";

import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { 
  auth, 
  db, 
  getById, 
  googleAuthProvider 
} from "../services";
import { toast } from "react-toastify";




interface UserProps {
    id: string | undefined;
    uid: string | undefined;
    name: string;
    email: string;
    authorized: boolean;    
    displayName: string;
    photoURL: string;
    accessToken: string | undefined;
}

interface LoginProps {
    email: string;
    password: string;
}

const defaultUser: UserProps = {
  id: undefined,
  uid: undefined,
  name: "",
  email: "",
  authorized: false,  
  displayName: "",
  photoURL: "",
  accessToken: undefined,
}
const defaultReturn = async () => {};

interface AuthProps { 
  loading: boolean,
  user: UserProps,
  login: any,
  logout: any,
}

export const defaultContext : AuthProps = {
    loading: false,
    user: defaultUser,
    login: defaultReturn,
    logout: () => {},
}


const AuthContext = createContext(defaultContext);
const AuthProvider : FC<any> = ({ children }) => {
  const [user, setUser] = useState<UserProps | undefined>();
  const [loading, setLoading] = useState(true);
  const USER_COLLECTION_NAME = 'users';

  const getUser = async () => {
    setLoading(true);
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userResponse = await getById({
          collectionName: USER_COLLECTION_NAME,
          ...user,
          id: user?.uid,           
        });
       
        setUser((prevState : any) => ({
          ...prevState, 
          ...user,
          ...userResponse,
          id: user?.uid,
        }));
        setLoading(false);
        console.log('[GetUser]: response => ', userResponse, ' user: ', user);
      } else {
        setLoading(false);
        toast('User not found', { type: 'error'});
      }
    });
  };

  useEffect(() => {
    if(!user?.uid || !user) {
      console.log('[AuthContext] :  start');
      (async () => {
          await getUser();
      })();
    }
  }, [user?.uid]);

  const handleLogin = async () : Promise<any> => {
    console.log('[Init][handleLogin] : User ');
    await signInWithPopup(auth, googleAuthProvider)
    .then((response) => {
      const credential = GoogleAuthProvider.credentialFromResult(response);
      const token = credential?.accessToken;
      const user = response.user;
      setUser((prevState : any) => ({
        ...prevState, 
        ...user,
        accessToken: token,
      }));
      console.log('[Success][handleLogin] : User ', user, ' Token: ', token);
      return user;
    })
    .catch((error) => {       
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error('[Error][handleLogin]:', error, ' credential: ', credential);
    }).finally(() => console.log('[Finally] : handleLogin'))
    
  };


  const handleLogout = async () => {
    signOut(auth);
    setUser(undefined);
    return user;
  };

  return (
    <AuthContext.Provider value={{ 
        loading,
        user: user ?? defaultUser,
        login: handleLogin,
        logout: handleLogout
    }}>
      {loading || children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };