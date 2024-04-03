import { StyleSheet } from 'react-native'
import { BGView, Text, View } from '@/components/Themed'
import { FlashList } from '@shopify/flash-list'

import EventComponent_Manager from '@/components/EventComponent_Manager'

import dummyDataSource from '@/dummydata.js'
import DateDivider from '@/components/DateDivider'


// const DateHeader = ({date}: any) => {

//   return (
//     <View>
//       <Text>{date.toDateString()}</Text>
//     </View>
//   )

// }

export default function ManagerDashboard() {

  const dummyData = dummyDataSource.sort(((firstItem:any, secondItem:any) => firstItem.appointmentDate - secondItem.appointmentDate))

  let currentDate: any;

  const renderItem = ( item : any) => {
    if (!currentDate || item.appointmentDate > currentDate) {
        currentDate = item.appointmentDate;
        currentDate.setHours(currentDate.getHours() + 8)
        
      return (
        <>
          <DateDivider date={currentDate.toDateString()} />
          <EventComponent_Manager data={item} />
        </>
      )
    } else {
      return <EventComponent_Manager data={item} />
    }
  }


  return (
    <BGView style={styles.container}>
      <Text style={styles.header}>Upcoming Visits</Text>
      <FlashList
        data={dummyData}
        // renderItem={({ item }) => <EventComponent_Manager data={item} /> }
        renderItem={({ item }) => renderItem(item) }
        estimatedItemSize={50}
        
      />
    </BGView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // padding: 10,
  },
  header:{
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginBottom: 4,
  },
})