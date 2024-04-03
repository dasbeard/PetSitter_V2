import { StyleSheet } from 'react-native'
import { View, Text, BGView } from './Themed'
import Colors from '@/constants/Colors'
import { InteractiveStyles } from '@/constants/Styles'
import { useColorScheme } from './useColorScheme'


export default function DateDivider({ date } : any) {
  const colorScheme = useColorScheme();

  return (
    <BGView style={[styles.container, InteractiveStyles(undefined, colorScheme!).Shadow]}>
      <Text style={styles.date} darkColor={Colors.light.text}>{date}</Text>
    </BGView>  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: Colors.brand[100],
    borderBottomWidth: 1,
    borderBottomColor: Colors.brandAlt[900]
  },
  date: {
    fontSize: 19,
    textAlign: 'center',
    fontWeight: '500',
  },
})
