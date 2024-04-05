import { StyleSheet } from 'react-native'
import { BGView, Text, View } from '@/components/Themed'
import { FlashList } from '@shopify/flash-list'

import EventComponent_Manager from '@/components/EventComponent_Manager'

import dummyDataSource from '@/dummydata.js'
import DateDivider from '@/components/DateDivider'

import dayjs from 'dayjs'
dayjs.locale('en') // use locale
// dayjs.extend(utc)

// const testDate = '2024-02-23 09:01:05+00'
// const testDate2 = '2024-04-05 17:09:16+00'
// // console.log({testDate2});
// const UTCTime = dayjs(testDate + ':00').valueOf()
// console.log({UTCTime});

// const testing = dayjs(UTCTime).format('ddd MMM D, YYYY')
// console.log({testing});


// const now = dayjs(testDate + ':00').valueOf()
// console.log({now});




const dummyDataDated = dummyDataSource.map((item) => {
  const UTCTime = dayjs(item.appointmentDate + ':00').valueOf()
  return {...item, UTCAppointmentDate: UTCTime}
})

// console.log(dummyDataDated[0]);

const dummyData = dummyDataDated.sort(((firstItem:any, secondItem:any) => firstItem.UTCAppointmentDate - secondItem.UTCAppointmentDate))

export default function ManagerDashboard() {

  let currentDate: any;

  const renderItem = ( item : any) => {
    if (!currentDate || item.UTCAppointmentDate > currentDate) {
        currentDate = item.UTCAppointmentDate;
        
      return (
        <>
          <DateDivider date={dayjs(currentDate).format('ddd MMM D, YYYY')} />
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