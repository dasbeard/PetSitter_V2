import { Image, StyleSheet } from 'react-native'
import { View, Text, AlertText, AlertView } from '@/components/Themed'
import { FlashList } from '@shopify/flash-list'

import dummyData from '@/dummydata.js'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const UserComponent = ({data}: any) => {

  return(
    <View style={styles1.outerContainer}>
      <View style={styles1.clientImageContainer}>
        <Image style={styles1.clientImage} source={{uri: data.client.picture.avatar_url}} />
        <Text style={styles1.clientName}>{data.client.firstName} {data.client.lastName}</Text>
      </View>

      <View style={styles1.contentContainer}>
        <AlertView style={styles1.alertsContainer}>          
          <Ionicons name='alert' color={Colors.red[500]} size={16} />
          <AlertText style={styles1.alertText}>Warning goes here</AlertText>                
        </AlertView>

        <View style={styles1.clientContent}>
          <View style={styles1.clientDetails}>
            <Text style={styles1.visits}>Last Visit: 12/12/24 - Next Visit: 12/12/24</Text>  

            <Text style={styles1.clientAddress}>{data.client.location.address}, {data.client.location.city}</Text>
          </View>


          <View style={styles1.petsContainer}>

          </View>
        
        </View>
      </View>


    </View>
  )

}

const styles1 = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 10,
    paddingRight: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 4,
  },
  clientImageContainer:{
    flex: 1,
    alignItems: 'center',
  },
  clientImage:{
    height: 85,
    width: 85,
    borderRadius: 85 / 2,
    objectFit: 'contain',
    overflow: 'hidden',
  },
  clientName:{
    flex: 1,
    marginTop: 4,
    fontSize: 12,
  }, 
  contentContainer:{
    flex: 2.5,
  },

  alertsContainer:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    minHeight: 15,
  },
  alertText:{
    fontSize: 12,
    padding: 0,

  },
  clientContent:{
    flex: 3,
    flexDirection: 'row',
  },
  visits:{},
  clientDetails:{
    flex: 2.25,    
  },
  clientAddress:{
    // flex: 1,
    fontSize: 12
  },
  petsContainer:{
    // borderWidth: 1,
    // borderColor: 'blue',
    flex: 1,
  },
});


export default function ManageUsers() {
  return (
    <View style={styles.container}>
      <FlashList
        data={dummyData}
        // renderItem={({ item }) => <Text>{item.client.firstName}</Text>}
        renderItem={({ item }) => <UserComponent data={item} /> }
        estimatedItemSize={50}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal:10, 
    marginVertical: 10, 
  },
})