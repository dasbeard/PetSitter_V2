import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { useAuth } from '@/context/AuthContext'
import Button from '@/components/Buttons/Button';
import useAuthStore from '@/hooks/auth';

export default function ClientDashboard() {
  // const { onLogout, role } = useAuth();
  const logout = useAuthStore((state) => state.logout)

  return (
    <View style={styles.container}>
      <Text>Client Dashboard</Text>

      <Button TextValue='Logout' Function={() => logout()} />
      {/* <Button TextValue='Logout' Function={onLogout} /> */}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10, 

  }
})