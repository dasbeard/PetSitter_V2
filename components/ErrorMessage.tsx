import { StyleSheet } from 'react-native'
import { View, Text } from './Themed'
import Colors from '@/constants/Colors'

export default function ErrorMessage({message}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Error: {message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.red[500],
    padding: 6,
    backgroundColor: Colors.red[100],
    marginBottom: 3,
  },
  text:{
    color: Colors.red[900],
    fontWeight: '600',
  }
})