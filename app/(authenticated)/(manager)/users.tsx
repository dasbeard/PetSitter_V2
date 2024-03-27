import { StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'

export default function ManageUsers() {
  return (
    <View style={styles.container}>
      <Text>Users Managment</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10, 
  },
})