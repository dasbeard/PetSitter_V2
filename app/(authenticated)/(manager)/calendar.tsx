import { StyleSheet } from 'react-native'
import { View, Text, AlertView, AlertText, BGView } from '@/components/Themed'

export default function ManagerCalendar() {
  return (
    <BGView style={styles.container}>
      <Text>ManagerCalendar</Text>
    </BGView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10,
  },
})