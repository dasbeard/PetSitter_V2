import { StyleSheet, Image, Pressable } from 'react-native'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { View, Text, AlertText, AlertView } from "@/components/Themed";

import Colors from '@/constants/Colors'
import { InteractiveStyles } from '@/constants/Styles';
import { useColorScheme } from './useColorScheme';


export default function EventComponent_Manager({ data }: any) {
  const colorScheme = useColorScheme();

  const imageTypes = [
    {
      id:'boarding',
      light: require('@/assets/icons/Boarding_Icon.png'),
      dark: require('@/assets/icons/Boarding_Icon_Alt.png'),
    },
    {
      id:'dogwalk',
      light: require('@/assets/icons/Dog_Walk_Icon.png'),
      dark: require('@/assets/icons/Dog_Walk_Icon_Alt.png'),
    },
    {
      id:'homevisit',
      light: require('@/assets/icons/Pet_Food_Icon.png'),
      dark: require('@/assets/icons/Pet_Food_Icon_Alt.png'),
    },
  ]

  let Icon = imageTypes.find(ob => ob.id === data.type.replace(' ','').toLowerCase());

  return(
    <Pressable style={{paddingHorizontal: 10}}>
      {({ pressed }) =>(
      
      // <View style={styles.outer}>
      //   <View style={styles.tag}>
      //     <Text style={styles.tagText}>Morning</Text>
      //   </View>
      

      <View style={[styles.container, InteractiveStyles(pressed, colorScheme!).Shadow]}>
        { 
          (data.id % 2 == 0) &&
            <AlertView style={styles.alertsContainer}>          
            <Ionicons name='alert' color={Colors.red[500]} size={16} />
            <AlertText style={styles.alertText}>Warning goes here</AlertText>                
            </AlertView>
        } 

        <View style={styles.topRow}>
          <View style={styles.userContainer}>
            <Image style={styles.clientImage} source={{uri: data.employee.picture.avatar_url}} />
            <Text style={styles.userName}>{data.employee.firstName}</Text>
          </View>

          <View style={styles.arrow}>
            <Entypo name='arrow-right' size={26} />
          </View>
          
          <View style={styles.userContainer}>
            <Image style={styles.clientImage} source={{uri: data.client.picture.avatar_url}} />
            <Text style={styles.userName}>{data.client.firstName}</Text>
          </View>

          <View style={styles.eventTypeContainer}>
            <View style={styles.eventTypeImageContainer}>
              <Image style={styles.eventTypeImage} source={ colorScheme === 'light' ? Icon?.light : Icon?.dark } />
            </View>
            <Text style={styles.userName}>{data.type}</Text>
          </View>

        </View>
        
        <View style={styles.bottomRow}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{data.client.location.address}, {data.client.location.city}</Text>
          </View>

          <View style={styles.checklist}>
            <View style={styles.checklistItem}>
              <Entypo name='check' size={18} color={colorScheme === 'light' ? Colors.green[700]: Colors.green[500]} />
              <Text style={{color: colorScheme === 'light' ? Colors.green[700]: Colors.green[500]}}>Checked-In</Text>
            </View>
            <View style={styles.checklistItem}>
              <Entypo name='check' size={18} color={colorScheme === 'light' ? Colors.light.disabled : Colors.dark.disabled} />
              <Text style={{color: colorScheme === 'light' ? Colors.light.disabled : Colors.dark.disabled}}>Completed</Text>
            </View>

          </View>

        </View>
        
      </View>
      // </View>
      )}
    </Pressable>
  )
}


const styles = StyleSheet.create({
  outer:{
    flex: 1,
    flexDirection: 'row',
  },
  tag:{

  },
  tagText:{
    
  },
  container: {
    flex: 1,
    // marginVertical: 8,
    marginBottom: 12,
    marginTop: 3,
    paddingVertical: 8,
    // paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 6,
  },

  topRow: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  clientImage:{
    height: 90,
    width: 90,
    borderRadius: 90 / 2,
    objectFit: 'contain',
    overflow: 'hidden',
  },
  userName:{

  },

  arrow:{
    flex: .2,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  eventTypeContainer:{
    flex: .75,
    alignItems: 'center',
    // height: '100%',
    // justifyContent: 'space-around',
    // paddingVertical: 2,
    

  },
  eventTypeImageContainer:{
    height: 90,
    justifyContent: 'center',
  },
  eventTypeImage:{
    height: 55,
    width: 55,
    objectFit: 'contain',
    overflow: 'hidden',
  },
  
  bottomRow:{
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    marginVertical: 4,
  },  
  addressContainer:{
    flex: 1.5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    // backgroundColor: 'rgba(0,0,0,0)',
  },
  address:{
    fontWeight: '300',
    fontSize: 13,
    
  },
  checklist:{
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0)',
    // borderWidth: 1,
    // borderColor: 'green',
  },
  checklistItem:{
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    // backgroundColor: 'rgba(0,0,0,0)',
  },



  alertsContainer:{
    flex: .5,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 0,
    // marginHorizontal: 4,
    marginHorizontal: 1,
    marginTop: -3,
    // minHeight: 22,
    marginBottom: 4,
  },
  alertText:{
    fontSize: 13,
  },

})