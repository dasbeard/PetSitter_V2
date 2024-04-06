import { supabase } from '@/util/supabase';
import { AuthError, Session } from '@supabase/supabase-js'
import { JwtPayload, jwtDecode } from 'jwt-decode';
import "core-js/stable/atob";
import {create} from 'zustand'

interface JWT extends JwtPayload {
  user_role: string
}

export interface UserDataInterface {
  username: string | '';
  first_name: string | '';
  last_name: string| '';
  avatar_url: string | '';
}

export interface AuthState {
  session: Session | null;
  userData: UserDataInterface | null;
  signIn: (email: string, password: string) => Promise<Session | AuthError | null>
  register: (email: string, password: string) => Promise<Session | AuthError | null>
  role: string | null;
  setSessionAndRole: (session: Session | null) => void;
  logout: () => Promise<void>;
  getProfile: (session: Session) => Promise<UserDataInterface | any>;
  updateProfile: (id: string, username: string, first_name: string, last_name: string, avatar_url: string) => Promise<any>
}


const useAuthStore = create<AuthState>((set) => ({
  userData: null,
  session: null,
  role: null,

  setSessionAndRole: (session) => {
    if (!session){
      //  clear state if no session is passed
      set({role: null})
      set({session: null})
    } else {
      // Decode jwt and set role
      set({session: session})
      const jwt = jwtDecode<JWT>(session.access_token)
      set({role: jwt.user_role})
    }
  },
  
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
      return Promise.resolve({tempData})
      
    } catch (error) {
      console.log('error');
      return Promise.reject({error})
    }
  },

  updateProfile: async (id, username, first_name, last_name, avatar_url) => {    
    try {
      // build values to be sent to the update
      const values = {
        id,
        username,
        first_name,
        last_name,
        avatar_url,
        updated_at: new Date()
      } 
      const { data, error } = await supabase.from('users').upsert(values).select();
      
      // check for error with upload
      if(error) throw error
      
      if(data){
        // update userData state
        const newData = data[0]
        set({userData:{
            username:newData.username,
            first_name:newData.first_name,
            last_name:newData.last_name,
            avatar_url:newData.avatar_url
        }})
      }      
      return Promise.resolve(data[0])
    } catch (error) {
      return Promise.reject({error})      
    }
  },
  



}))


export default useAuthStore;