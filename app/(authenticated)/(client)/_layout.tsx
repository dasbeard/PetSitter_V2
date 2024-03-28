import ClientHeader from "@/components/Headers/ClientHeader";
import { Stack } from "expo-router";

export default function ClientLayout() {
  return (
    <>
      <ClientHeader />
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="calendar" />
        <Stack.Screen name="profile" />

      </Stack>
    </>
  )
}