import ManagerHeader from "@/components/Headers/ManagerHeader";
import { Stack } from "expo-router";

export default function ManagerLayout() {

  return (
    <>
      <ManagerHeader />
      <Stack 
        screenOptions={{
          headerShown: false, 
        }}
        >
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="users" />
        <Stack.Screen name="calendar" options={{presentation: 'modal'}} />
        <Stack.Screen name="profile" />
      </Stack>
    </>
    
  )
}