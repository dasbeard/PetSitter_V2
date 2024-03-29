import { StyleSheet } from 'react-native'
import { BGView, Text, View } from '@/components/Themed'

export default function ManageUsers() {
  return (
    <BGView style={styles.container}>
      <Text>Users Managment</Text>
    </BGView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10,
  },
})