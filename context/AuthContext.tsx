import { supabase } from "@/util/supabase";
import { Session, User, AuthError } from "@supabase/supabase-js";
import "core-js/stable/atob";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

// export interface Roles {
//   Client: 'client';
//   Employee: 'employee';
//   Manager: 'manager';
// }

type AuthProps = {
  session: Session | null;
  // onRegister: (email: string, password: string) => Promise<any>;
  onRegister: (email: string, password: string) => Promise<Session | AuthError | null>;
  onLogin: (email: string, password: string) => Promise<Session | AuthError | null>;
  // onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => void;
  initialized: boolean;
  role: string | null;
};


const AuthContext = createContext<Partial<AuthProps>>({});

export function useAuth() {
  return useContext(AuthContext);
}


interface JWT extends JwtPayload {
  user_role: string
}
export const AuthProvider = ({ children }: any ) => {
  const [ session, setSession ] = useState<Session | null>(null);
  const [ role, setRole ] = useState<string | null>(null);
  const [ initialized, setInitialized ] = useState(false);

  useEffect(() =>{
    supabase.auth.getSession().then(({ data: { session } }) => {
      // setSession(session)
      if (session){
        const jwt = jwtDecode<JWT>(session.access_token)
        setSession(session)
        setRole(jwt.user_role)
      }
    })
    
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)     
      if (session !== null){
        const jwt = jwtDecode<JWT>(session.access_token)
        setRole(jwt.user_role)
      } else {
        setRole(null)
      }
    })
    setTimeout(() => {
      setInitialized(true)
    }, 15);

  },[])

  const handleLogin = async (email: string, password: string) => {
    if (!email) return Promise.reject('Email is required');
    if (!password) return Promise.reject('Password is required');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {     
      return Promise.reject(error)
    };
        
    const jwt = jwtDecode<JWT>(data.session.access_token)
    setRole(jwt.user_role)
    setSession(data.session)
        
    return Promise.resolve(data.session);
  }


  const handleRegister = async (email: string, password: string) => {
    if (!email) return Promise.reject('Email is required');
    if (!password) return Promise.reject('Password is required');
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if(error) return Promise.reject(error);
    
    if (data.session){
      const jwt = jwtDecode<JWT>(data.session.access_token)
      setRole(jwt.user_role)
      setSession(data.session) 
      console.log('Has Token Data');
      
      return Promise.resolve(data.session);
    } else {
      console.log('NO Token Data');
      return Promise.resolve(data.session);
    }
  
  }

  const handleLogout = () => {
    supabase.auth.signOut();
    setSession(null);
    setRole(null);
  }

  const value ={
    initialized,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    session,
    role
  }
  
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  
}