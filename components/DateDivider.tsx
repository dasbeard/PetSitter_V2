import { StyleSheet } from 'react-native'
import { Text, BGView } from './Themed'
import Colors from '@/constants/Colors'
import { InteractiveStyles } from '@/constants/Styles'
import { useColorScheme } from './useColorScheme'


export default function DateDivider({ date } : any) {
  const colorScheme = useColorScheme();

  return (
    <BGView 
      lightColor={Colors.brand[100]}
      darkColor={Colors.brandAlt[600]}
      // style={[styles.container, InteractiveStyles(undefined, colorScheme!).Shadow]}
      style={[styles.container, {shadowColor: colorScheme === 'light' ? Colors.dark.background : Colors.light.background}]}
    >
      <Text style={styles.date} darkColor={Colors.light.text}>{date}</Text>
    </BGView>  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 8,
    // backgroundColor: Colors.brand[100],
    borderBottomWidth: 1,
    borderBottomColor: Colors.brandAlt[900],
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    
    elevation: 1,
    shadowOffset: {height: -2, width: 1},
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },

  date: {
    fontSize: 19,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 1,
  },
})
