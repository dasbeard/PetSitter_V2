// import { useAuth } from "@/context/AuthContext";
import userAuthStore from "@/hooks/auth";
import { supabase } from "@/util/supabase";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppState } from "react-native";

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})


export default function Layout() {
  // const { role } = useAuth();
  const role = userAuthStore((state) => state.role)

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