import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(client)" />
      <Stack.Screen name="(employee)" />
      <Stack.Screen name="(manager)" />
    </Stack>
  )
}