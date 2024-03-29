import { StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'
import { FlashList } from '@shopify/flash-list'

import ClientComponent from '@/components/ClientComponent'

import dummyData from '@/dummydata.js'


export default function EmployeeDashboard() {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Visits</Text>
      <FlashList
        data={dummyData}
        renderItem={({ item }) => <ClientComponent data={item} /> }
        estimatedItemSize={50}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10, 
    marginHorizontal: 4,   
  },
  header:{
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginBottom: 4,
  },
})