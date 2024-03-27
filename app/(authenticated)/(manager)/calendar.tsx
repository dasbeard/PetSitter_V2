import { StyleSheet } from 'react-native'
import { View, Text, AlertView, AlertText } from '@/components/Themed'

export default function ManagerCalendar() {
  return (
    <View style={styles.container}>
      <Text>ManagerCalendar</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10, 
  },
})