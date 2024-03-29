import { StyleSheet } from "react-native"
import Colors from "./Colors"

export const InteractiveStyles = (pressed?: boolean, colorScheme?: string) => StyleSheet.create({
  Shadow:{
    opacity: pressed ? 0.5 : 1,
    elevation: pressed ? 1 : 3,
    // shadowColor: colorScheme === 'light' ? '#111' : '#000',
    shadowColor: colorScheme === 'light' ? '#111' : '#252525',
    shadowOffset: {height: pressed ? .75 : 2, width: pressed ? 0.75 : 2},
    shadowOpacity: pressed ? .75 : 0.25,
    shadowRadius: pressed ? 3 : 5,
    borderColor: colorScheme === 'light' ? Colors.brand[900] : Colors.borderDark,
  },
})


