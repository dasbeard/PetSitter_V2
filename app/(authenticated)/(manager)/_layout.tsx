import ManagerHeader from "@/components/Headers/ManagerHeader";
import { useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { useColorScheme } from '@/components/useColorScheme';
import Colors from "@/constants/Colors";
import { View } from "@/components/Themed";

export default function ManagerLayout() {
  const { role } = useAuth();
  const colorScheme = useColorScheme(); 

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