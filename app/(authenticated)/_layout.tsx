import { Stack } from "expo-router";

// AppState.addEventListener('change', (state) => {
//   if (state === 'active') {
//     supabase.auth.startAutoRefresh()
//   } else {
//     supabase.auth.stopAutoRefresh()
//   }
// })



export default function Layout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(client)" />
      <Stack.Screen name="(employee)" />
      <Stack.Screen name="(manager)" />
    </Stack>
  )
}