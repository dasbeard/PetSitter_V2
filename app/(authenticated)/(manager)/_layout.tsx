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
    <View style={{backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background, flex: 1}}>
    <ManagerHeader />
    <Stack 
      screenOptions={{
        headerShown: false, 
        contentStyle: {
          // backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background,
          marginHorizontal:20, 
          marginVertical: 10,

        }
      }}
    >
      <Stack.Screen redirect={role !== 'manager'} name="dashboard" />
      <Stack.Screen redirect={role !== 'manager'} name="users" />
      <Stack.Screen redirect={role !== 'manager'} name="calendar" />
      <Stack.Screen redirect={role !== 'manager'} name="profile" />
    </Stack>
    </View>
  )
}