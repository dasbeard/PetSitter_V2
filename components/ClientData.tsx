import { StyleSheet} from 'react-native'
import { View, Text } from './Themed'


export default function ClientData({ clientData }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.clientName}>{clientData.client.firstName} {clientData.client.lastName}</Text>

      <View style={styles.visitContainer}>
        <Text numberOfLines={1} style={styles.visitText}>Last Visit:</Text>  
        <Text style={styles.visitText}>12/12/2024</Text>  
      </View>
      <View style={styles.visitContainer}>
        <Text style={styles.visitText}>Next Visit:</Text>  
        <Text style={styles.visitText}>12/12/2024</Text>  
      </View>

      <View style={styles.addressContainer}>
        <Text numberOfLines={1} style={styles.clientAddress}>{clientData.client.location.address},</Text>
        <Text numberOfLines={1} style={styles.clientAddress}>{clientData.client.location.city}</Text>
      </View>
    </View>  

  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    overflow: 'hidden',
  },
  clientName:{
    flex: 1.15,
    paddingTop: 2,
    fontSize: 15,
    fontWeight: '600'
  }, 
  visitContainer:{
    flex: .85,
    flexDirection: 'row',
    gap: 10,
  },

  visitText:{
    fontSize: 13,
    minWidth: 65,
  }, 
  addressContainer:{
    flex:1.15,
  },
  clientAddress:{
    fontSize: 13
  },
})