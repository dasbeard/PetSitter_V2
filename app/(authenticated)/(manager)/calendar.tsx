import { StyleSheet } from 'react-native'
import { View, Text, BGView } from '@/components/Themed'
import {Calendar, CalendarUtils} from 'react-native-calendars';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Colors from '@/constants/Colors';
import dayjs from 'dayjs'
dayjs.locale('en') // use locale

import dummyDataSource from '@/dummydata.js'

const dummyDataDated = dummyDataSource.map((item) => {
  const formatedDate = dayjs(item.appointmentDate + ':00').format('YYYY-MM-DD')
  return {...item, date: formatedDate}
})

const INITIAL_DATE = dayjs().format('YYYY-MM-DD')

const Marked_Dates = () => {
  let dd = {};
  const morning = {key: 'morning', color: Colors.blue[500], selectedDotColor: Colors.brand[500]}
  const afternoon = {key: 'afternoon', color: Colors.green[500], selectedDotColor: Colors.brand[500]}
  const evening = {key: 'evening', color: Colors.orange[500], selectedDotColor: Colors.brand[500]}

    dummyDataSource.map((item) => {
    let dots: any=[];
    const date = dayjs(item.appointmentDate + ':00').format('YYYY-MM-DD')
    
    if (date in dd){
      if (item.appointmentTime.toLowerCase() === 'morning'){
        dd[date].dots.splice(0,0, morning)
      } else if (item.appointmentTime.toLowerCase() === 'afternoon'){
        if (dd[date].dots[0].key === 'morning'){
          dd[date].dots.push(afternoon)
        } else {
          dd[date].dots.splice(0,0, afternoon)
        }
      } else if (item.appointmentTime.toLowerCase() === 'evening'){
        dd[date].dots.push(evening)
      }     

    } else {

      if (item.appointmentTime.toLowerCase() === 'morning'){
        dots.push(morning)
      } else if (item.appointmentTime.toLowerCase() === 'afternoon'){
        dots.push(afternoon)
      } else if (item.appointmentTime.toLowerCase() === 'evening'){
        dots.push(evening)
      }
      
      dd={...dd, [date]:{dots}}
    }

  })

  // console.log(JSON.stringify(dd));

  return dd
}





// Marked_Dates();

export default function ManagerCalendar() {
  const [selected, setSelected] = useState(INITIAL_DATE);
  // const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);
  const [markedDates, setMarkedDates] = useState<any>();
  const [displayDates, setDisplayDates] = useState();
  

  const marked = useMemo(() => {
    const result = Marked_Dates();

    return {
      ...result, 
      [selected]: {
        selected: true,
        // disableTouchEvent: true,
        selectedColor: Colors.brand[500],
        selectedTextColor: Colors.dark.text
      }
    };
  }, [selected]);


  const getDate = (count: number) => {
    const date = new Date(INITIAL_DATE);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const returnSelectedDates = (date:any) => {
    const results = dummyDataDated.filter((item) => item.date === date)
    return results
  }

  const onDayPress = useCallback((day: any) => {
    setSelected(day.dateString);
    // console.log({day});
    const dates = returnSelectedDates(day.dateString)
    setDisplayDates(dates)

  }, []);

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
          markedDates={marked}

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
        
          <Text>{dayjs(selected).format('MMM D, YYYY')}</Text>
          {/* map over all dates on selectyed date */}
          {displayDates &&
            displayDates.map((d) => (
              
              // Should return a component with all data of the event
              
              <Text key={d.id}>
                {d.id}
              </Text>
            ))
          }
             


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