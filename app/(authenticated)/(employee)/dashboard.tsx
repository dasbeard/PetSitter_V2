import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/components/Buttons/Button'
import { useAuth } from '@/context/AuthContext'

export default function EmployeeDashboard() {
  const { onLogout } = useAuth()

  return (
    <View>
      <Text>Employee Dashboard</Text>
      <Button TextValue='Logout' Function={onLogout} />
    </View>
  )
}

const styles = StyleSheet.create({})