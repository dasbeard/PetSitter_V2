import { Stack } from "expo-router";

export default function ClientLayout() {
  return (
    <Stack>
      <Stack.Screen name="dashboard" />
    </Stack>
  )
}