import { StyleSheet } from "react-native"

export const InteractiveStyles = (pressed?: boolean, colorScheme?: string) => StyleSheet.create({
  Shadow:{
    opacity: pressed ? 0.5 : 1,
    elevation: pressed ? 1 : 3,
    shadowColor: colorScheme === 'light' ? '#111' : '#222328',
    shadowOffset: {height: pressed ? .75 : 2, width: pressed ? 0.75 : 2},
    shadowOpacity: pressed ? .75 : 0.25,
    shadowRadius: pressed ? 3 : 5,

  },
  // Border: {
  //   borderColor: colorScheme === 'light' ? 'rgba(0, 5, 17, 0.25)' : 'rgba(21, 16, 19, 0.92)',
  // },
})


