import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Calendar() {
  return (
    <View style={styles.container}>
      <Text>Client Calendar</Text>
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