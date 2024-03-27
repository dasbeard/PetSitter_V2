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
        <Stack.Screen redirect={role !== 'manager'} name="dashboard" />
        <Stack.Screen redirect={role !== 'manager'} name="users" />
        <Stack.Screen redirect={role !== 'manager'} name="calendar" options={{presentation: 'modal'}} />
        <Stack.Screen redirect={role !== 'manager'} name="profile" />
      </Stack>
    </>
    
  )
}