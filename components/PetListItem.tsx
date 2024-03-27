import { StyleSheet, Image } from 'react-native'
import { View, Text } from './Themed'


export default function PetListItem ( {pet, _idx}:{pet:any, _idx:number}) {
  const petBgColors =[
    '#dd8dda',
    '#4dc0ab',
    '#aac8cc',
    '#e87d56',
    '#81d981',
    '#56fcf1',
  ]

  if (pet.type === 'Cat'){
    return(
      <View style={styles.pet}>
        <Image 
          style={[styles.petImage, {backgroundColor: petBgColors[_idx]}]} 
          source={require('@/assets/icons/Cat_Icon.png')} 
        /> 
        <Text>{pet.name}</Text>
    </View>
    )
  } else if (pet.type === 'Dog'){
    return (
      <View style={styles.pet}>
        <Image 
          style={[styles.petImage, {backgroundColor: petBgColors[_idx]}]} 
          source={require('@/assets/icons/Dog_Icon.png')} 
        /> 
        <Text>{pet.name}</Text>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  pet:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 2
  },
  petImage:{
    height: 25,
    width: 25,
    borderRadius:25,
    resizeMode: 'contain',
  },
})