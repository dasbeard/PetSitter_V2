import { View, StyleSheet, Platform, Pressable, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
// import { Text } from '@/components/Themed'

import { useColorScheme } from '@/components/useColorScheme';

export default function EmployeeHeader() {
  const colorScheme = useColorScheme(); 

  return (
    <SafeAreaView style={{backgroundColor: colorScheme=='light' ? Colors.light.headerColor : Colors.dark.headerColor }}>
      <View style={styles.mainContianer}>
        <View style={styles.left}>

        <Link href={'/(employee)/'} asChild>
          { colorScheme === 'dark' ? (
            <Pressable>
              {({ pressed }) => (
                <Image 
                source={require( '../../assets/icons/TempLogo_Alt.png')} 
                style={[styles.image, {opacity: pressed ? 0.5 : 1}]}
                />
              )}
            </Pressable>
          ):(
            <Pressable>
              {({ pressed }) => (
                <Image 
                source={require( '../../assets/icons/TempLogo.png')} 
                style={[styles.image, {opacity: pressed ? 0.5 : 1}]}
                />
              )}
            </Pressable>
          )}
          </Link>
        </View>
        
        <View style={styles.right}>
          <View style={styles.linkContainer}>
            <Link href={'/(employee)/Calendar'} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome 
                  name='calendar' 
                  color={Colors[colorScheme ?? 'light'].text}
                  size={24}
                  style={{ opacity: pressed ? 0.5 : 1}}
                  />
                  )}
              </Pressable>
            </Link>
          </View>

          <View style={styles.linkContainer}>
            <Link href={'/(employee)/Profile'} style={styles.linkContainer} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='user-circle'
                    size={24}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ opacity: pressed ? 0.5 : 1}}
                  />
                )}
              </Pressable>
            </Link>
          </View>
        </View>


      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContianer: {
    // borderWidth:1,
    // borderColor: 'red',
    height: Platform.OS === 'web' ? 65 : Platform.OS === 'android' ? 50 : 50,
    marginTop: Platform.OS === 'android' ? 45 : 0,
    marginBottom: 4,
    flexDirection: 'row',
    alignContent: 'space-between',
    marginHorizontal: 6,

  },
  left:{
    marginHorizontal: Platform.OS === 'web' ? 20 : 10,
    marginVertical: Platform.OS === 'web' ? 15 : 10,
    justifyContent: 'center',
    flex: 1,
  },
  image:{
    height: Platform.OS === 'web' ? 50 : 40,
    width: Platform.OS === 'web' ? 50 : 40,
    // borderWidth:1,
    // borderColor: 'green',
  },
  right:{
    // borderWidth:1,
    // borderColor: 'blue',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  linkContainer: {
    marginHorizontal: Platform.OS === 'web' ? 10 : 8,
  }
})


