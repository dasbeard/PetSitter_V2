import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/Buttons/Button'

export default function ManagerDashboard() {
  const { onLogout } = useAuth()
  
  return (
    <View>
      <Text>Manager Dashboard</Text>
      <Button TextValue='Logout' Function={onLogout} />
    </View>
  )
}

const styles = StyleSheet.create({})