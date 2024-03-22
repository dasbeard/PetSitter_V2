import { View, StyleSheet, Platform, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { Text } from '@/components/Themed'
import { useColorScheme } from '@/components/useColorScheme';

export default function BackHeader({ headerText}:{headerText?: string}) {
  const colorScheme = useColorScheme(); 

  return (
      <View style={styles.container}>
        <Pressable style={{flex:1}} onPress={() => router.back()}>
          {({ pressed }) => (
            <View style={[styles.left, { opacity: pressed ? 0.5 : 1}]}>
              <FontAwesome6 name="arrow-left-long" size={20} color={colorScheme=== 'light' ? Colors.light.text : Colors.dark.text}  />
              <Text style={styles.backText}>Back</Text>
            </View>
            )}
        </Pressable>
        
        <View style={styles.center}>
            <Text style={styles.headerText}>{headerText}</Text>
        </View>

        <View style={styles.right}>
        </View>

      </View>
  )
}

const styles = StyleSheet.create({
  container:{
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flex: 1,
    flexDirection: 'row',
    maxHeight: 40,
    
  },
  left:{
    flex: 1,  
    flexDirection: 'row',
    paddingLeft: Platform.OS === 'web'? 20 : 9,
    alignItems: 'center',
  },
  backText:{
    marginHorizontal: Platform.OS === 'web' ? 12 : 8,
    fontSize: 14,
    fontWeight: '300',
  },
  center:{
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText:{
    fontSize: 18,
    fontWeight: '600',
  },
  right:{
    // borderWidth: 1,
    // borderColor: 'blue',
    flex: 1,
    flexDirection: 'row',
  },

})
