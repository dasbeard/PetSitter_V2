import { StyleSheet, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, AlertText, AlertView } from "@/components/Themed";

import ClientData from '@/components/ClientData'
import PetListItem from '@/components/PetListItem'
import Colors from '@/constants/Colors'
import { InteractiveStyles } from '@/constants/Styles';
import { useColorScheme } from './useColorScheme';


export default function EventComponent_Manager({ data }: any) {
  const colorScheme = useColorScheme();

  return(
    <Pressable>
      {({ pressed }) =>(

      <View style={[styles.outerContainer, InteractiveStyles(pressed, colorScheme!).Shadow]}>
        <View style={styles.clientImageContainer}>
          <Image style={styles.clientImage} source={{uri: data.client.picture.avatar_url}} />
        </View>

        <View style={styles.contentContainer}>
          { 
            (data.id % 2 == 0) &&
              <AlertView style={styles.alertsContainer}>          
              <Ionicons name='alert' color={Colors.red[500]} size={16} />
              <AlertText style={styles.alertText}>Warning goes here</AlertText>                
              </AlertView>
          } 
          <View style={styles.client}>
            <View style={{flex:2}}>
              <ClientData clientData={data} />
            </View>

            <View style={styles.pets}>
              {data.pets.map((pet: any, _idx: number, array: []) => {
                if (array.length <= 3){
                  return <PetListItem key={_idx} pet={pet} _idx={_idx} />
                } else {
                  if ( _idx < 3){
                    return <PetListItem key={_idx} pet={pet} _idx={_idx} />
                  } if (_idx === 3){
                    return <Text style={{marginVertical: 3, marginLeft: 2}} key={4}>+ {array.length - 3} more</Text>
                  }
                }

              })}
            </View>

          </View>
        </View>
      </View>
      )}
    </Pressable>
  )

}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 8,
    // marginHorizontal: 2,
    paddingRight: 4,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 4,
    height: 145,
  },

  clientImageContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginRight: 2,
  },
  clientImage:{
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    objectFit: 'contain',
    overflow: 'hidden',
  },
  contentContainer:{
    flex: 2.5,
  },
  alertsContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    marginTop: -2,
    minHeight: 22,
    marginBottom: 2,
  },
  alertText:{
    fontSize: 13,
    
  },
  client:{
    flex: 3,
    flexDirection: 'row',
  },
  pets:{
    flex: 1,
  },
})