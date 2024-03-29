import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/components/Buttons/Button'
import useAuthStore from '@/hooks/auth'

export default function EmployeeProfile() {
  const logout = useAuthStore((state) => state.logout)
  
  return (
    <View>
      <Text>Employee Profile</Text>
      <Button TextValue='Logout' Function={logout} />
    </View>
  )
}

const styles = StyleSheet.create({})