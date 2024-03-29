import { Stack } from "expo-router";
import EmployeeHeader from "@/components/Headers/EmployeeHeader";

export default function EmployeeLayout() {
  return (
    <>
      <EmployeeHeader />
      <Stack 
        screenOptions={{
          headerShown: false, 
        }}
      >
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="calendar" options={{presentation: 'modal'}} />
        <Stack.Screen name="profile" />
      </Stack>
    </>
  )
}