import { StyleSheet } from 'react-native'
import { View, Text, BGView } from '@/components/Themed'
import {Calendar, CalendarUtils} from 'react-native-calendars';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Colors from '@/constants/Colors';

import dummyDataSource from '@/dummydata.js'
import dummyData from '@/dummydata.js';


// const INITIAL_DATE = '2022-07-06'
const Today = new Date()
const TodaySplit = new Date(Today.setHours(0)).toISOString().split('T')
const INITIAL_DATE = TodaySplit[0]

export default function ManagerCalendar() {
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);
  const [markedDates, setMarkedDates] = useState();


  const getDate = (count: number) => {
    const date = new Date(INITIAL_DATE);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const onDayPress = useCallback((day: any) => {
    setSelected(day.dateString);
    console.log({day});
    console.log('Pressed day:', day.dateString);
    // console.log('Pressed day:', new Date(day.dateString));
    
  }, []);



  // '2024-04-16': {
  //   selected: true,
  //   dots: [
  //     {key: 'vacation', color: 'blue', selectedDotColor: 'red'},
  //     {key: 'massage', color: 'red', selectedDotColor: 'white'},
  //   ]
  // },
  
// const getDays = () => {
  // const dummyData = dummyDataSource.sort(((firstItem:any, secondItem:any) => firstItem.appointmentDate - secondItem.appointmentDate))
  
  // const Dates = dummyDataSource.map((item) => {
  //   const date = item.appointmentDate.toISOString().split('T')
  //   const dateParse = date[0]
      
  //   const subset:any = {...Dates, [dateParse]: {selected: false, dots: [{key: 'vacation', color: 'blue', selectedDotColor: 'red'}]}}

  //   return subset
  // })
  // console.log(Dates);

//   let returnObj = {}
//   Dates.map((item) => {
//     console.log(item);
    
//     // returnObj={...returnObj, item}
//   })

//   console.log(returnObj);
//   return Dates
// }

  // useEffect(() => {
  //   const days = getDays()
  //   console.log(days[0]);
    
  //   setMarkedDates(days[0])
  // },[])
  

// getDays()
  
  // const marked = useMemo(() => {
  //   return {
  //     [getDate(-2)]: {
  //       dotColor: 'red',
  //       marked: true
  //     },
  //     [selected]: {
  //       selected: true,
  //       // disableTouchEvent: true,
  //       selectedColor: Colors.brand[500],
  //       selectedTextColor: Colors.dark.text
  //     }
  //   };
  // }, [selected]);

  // const markedDates = {
  //   '2024-04-02': { marked: true, selectedColor: 'blue'},
  //   '2024-04-04': { marked: true, dotColor: 'red', activeOpacity: 0},
  //   '2024-04-05': { marked: true},
  //   '2024-04-06': { disabled: true, disableTouchEvent: true},
  // }


  return (
    <BGView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Overview Of Events</Text>
      </View>

      <BGView style={styles.content}>
        <View style={styles.calendarContainer}>

        <Calendar
          style={styles.calendar}
          enableSwipeMonths
          markingType={'multi-dot'}
          current={INITIAL_DATE}
          onDayPress={onDayPress}
          // markedDates={markedDates}
          // markedDates={marked}
          markedDates={{
            '2024-04-16': {
              // selected: true,
              dots: [
                {key: 'vacation', color: 'blue', selectedDotColor: 'red'},
                {key: 'massage', color: 'red', selectedDotColor: 'white'},
              ]
            },
            [getDate(2)]: {
              selected: true,
              dots: [
                {key: 'vacation', color: 'blue', selectedDotColor: 'red'},
                {key: 'massage', color: 'red', selectedDotColor: 'white'},
              ]
            },
            [getDate(3)]: {
              disabled: true,
              dots: [
                {key: 'vacation', color: 'green', selectedDotColor: 'red'},
                {key: 'massage', color: 'red', selectedDotColor: 'green'}
              ]
            }
          }}

          theme={{
            calendarBackground: 'rgba(0,0,0,0)',
            textSectionTitleColor: Colors.brand[900],
            // textSectionTitleDisabledColor: 'red',
            dayTextColor: Colors.brand[900],
            todayTextColor: Colors.brand[500],
            // selectedDayTextColor: 'green',
            monthTextColor: Colors.brand[900],
            textMonthFontWeight: '500',
            indicatorColor: 'red',
            // selectedDayBackgroundColor: 'red',
            arrowColor: Colors.brand[900],
            // textDisabledColor: 'red',
            stylesheet: {
              calendar: {
                header: {
                  week: {
                    marginTop: 30,
                    marginHorizontal: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }
                }
              }
            }
          }}


        />


        </View>

        <View style={styles.selectedDateContainer}>

        </View>

      </BGView>

    </BGView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  header:{
    // flex: 1,
    height: 40,
    backgroundColor: Colors.brand[800],
    justifyContent: 'center',
    marginBottom: 6,
  },
  headerText:{
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.dark.text,
  },  
  content:{
    // flex: 20,
    flex: 1,
    paddingHorizontal: 10,
  },
  calendarContainer:{
    flex: 1.05,
    borderWidth: 1,
    borderRadius: 4
  },
  calendar:{
    // backgroundColor: 'red'
  },
  selectedDateContainer:{
    flex: 1
  },

})