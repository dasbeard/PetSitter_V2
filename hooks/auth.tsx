import { supabase } from '@/util/supabase';
import { AuthError, Session, User } from '@supabase/supabase-js'
import { JwtPayload, jwtDecode } from 'jwt-decode';
import {create} from 'zustand'

// export interface RoleTypes {
//   Client: 'client';
//   Employee: 'employee';
//   Manager: 'manager';
// }

interface JWT extends JwtPayload {
  user_role: string
}

export interface UserDataInterface {
  username: string | null;
  first_name: string | null;
  last_name: string| null;
  avatar_url: string | null;
}

export interface AuthState {
  session: Session | null;
  userData: UserDataInterface | null;
  signIn: (email: string, password: string) => Promise<Session | AuthError | null>
  register: (email: string, password: string) => Promise<Session | AuthError | null>
  role: string | null;
  logout: () => Promise<void>;
  getProfile: (session: Session) => Promise<any>;
}

const userAuthStore = create<AuthState>((set) => ({
  userData: null,
  session: null,
  role: null,

  signIn: async (email, password) => {
    if (!email || !password) return Promise.reject('Email or Password not valid')

    // attempt to login with pssed credentials
    const { data, error } = await supabase.auth.signInWithPassword({email, password})

    if (error) return Promise.reject(error);

    // set the users role and session
    set({session: data.session})
    const jwt = jwtDecode<JWT>(data.session.access_token)
    set({role: jwt.user_role})

    // return the session to the caller
    return Promise.resolve(data.session)
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if( error ) return Promise.reject('Error logging out from server')

    // Null out session/role and userData
    set({session: null})
    set({role: null})
    set({userData: null})

    return Promise.resolve();
  },

  register: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({email, password});

    if(error) return Promise.reject({error});

    // set the session and role
    set({session: data.session})
    const jwt = jwtDecode<JWT>(data.session?.access_token!)
    if(jwt.user_role){
      set({role: jwt.user_role})
    }

    return Promise.resolve(data.session)
  },

  getProfile: async (session) => {
    try {
      const userID = session.user.id;
      const { data, error, status } = await supabase
        .from('users')
        .select('username, first_name, last_name, avatar_url')
        .eq('id', userID)
        .single()

      if(error && status !== 406){
        throw error
      }

      const tempData = {
        username: data?.username,
        first_name: data?.first_name,
        last_name: data?.last_name,
        avatar_url: data?.avatar_url,
      }
      // set the users data
      set({userData: {
        username: data?.username,
        first_name: data?.first_name,
        last_name: data?.last_name,
        avatar_url: data?.avatar_url,        
      }})
      // return the user data to the caller

      return Promise.resolve(tempData)

    } catch (error) {
      
    }


  }



}))


export default userAuthStore;