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
  return (
    <>
      <StatusBar style='light' />
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(client)" />
        <Stack.Screen name="(employee)" />
        <Stack.Screen name="(manager)" />
      </Stack>
    </>
  )
}