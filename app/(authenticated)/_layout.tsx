import useAuthStore from "@/hooks/auth";
import { supabase } from "@/util/supabase";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, AppState } from "react-native";

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})



export default function Layout() {
  const role = useAuthStore((state) => state.role)
  const session = useAuthStore((state) => state.session)
  const userData = useAuthStore((state) => state.userData)
  const getProfile = useAuthStore((state) => state.getProfile)

  const [ loading, setLoading ] = useState<boolean>(true)


  useEffect( () => {
    if(!session) return

    if(userData) {
      // userdate already fetched
      setLoading(false)
      return
    }

    //  Fetch the users data
    setLoading(true)    
    const fetchUserData = async () =>{
      await getProfile(session!)
    } 
    fetchUserData();

    setLoading(false)
        
  }, [])

  if(loading){
    // console.log('*** Checking for data');    
    return <ActivityIndicator />
  }

  return (
    <>
      <StatusBar style='light' />
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen redirect={role !== 'client'} name="(client)" />
        <Stack.Screen redirect={role !== 'employee'}name="(employee)" />
        <Stack.Screen redirect={role !== 'manager'} name="(manager)" />
      </Stack>
    </>
  )
}