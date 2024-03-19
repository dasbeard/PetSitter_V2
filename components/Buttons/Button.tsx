import { Text, View } from '@/components/Themed'
import { Pressable, StyleSheet } from 'react-native'

import { useColorScheme } from '../useColorScheme';
import Colors from "@/constants/Colors";
import { InteractiveStyles } from '@/constants/Styles';

export default function Button ({ 
  Disabled=false, 
  TextValue='Click Me',
  Function,
  Selected=false,
  ButtonWidth,
  TextColor,
  BackgroundColor,
  BorderColor,
  BoldText=false,
} : {
  Disabled?: boolean, 
  TextValue?: string,
  Function?: any,
  Selected?: boolean,
  ButtonWidth?: number,
  TextColor?: string,
  BackgroundColor?: string,
  BorderColor?: string,
  BoldText?: boolean,
}) {
  
  const colorScheme = useColorScheme();

  const defaultFunction = () => {
    console.log('Button Clicked');
  }
  
  return (
    <Pressable 
      style={Disabled ? {opacity: 0.5}: {opacity: 1}}
      disabled={Disabled}
      onPress={Function ? Function : defaultFunction }
    >
        {({ pressed }) => ( 
          <View 
            style={[
              styles(Selected, colorScheme!).innerContainer,
              Selected ? styles(Selected, colorScheme!, pressed).Selected : InteractiveStyles(pressed, colorScheme!).Shadow, 
              BackgroundColor ? ({backgroundColor: BackgroundColor}) : (null),
              BorderColor ? ({borderColor: BorderColor}) : (null),
            ]}
          >
            <Text style={[
              styles(Selected, colorScheme!, pressed).text, 
              ButtonWidth ? ({ width: ButtonWidth }) : (null),
              TextColor ? ({color: TextColor}) : (null),
              BoldText ? {fontWeight: '600'}: {fontWeight:'400'},
            ]}
            
            >
              {TextValue}
            </Text>
          </View>

        )}
    </Pressable>
  )
}

const styles = (Selected?: boolean, colorScheme?: string, pressed?: boolean) =>  StyleSheet.create({
  innerContainer:{
    borderRadius: 4,
    padding: 12,
    backgroundColor: Selected ? Colors.brand[800] : Colors.brand[500],
    borderColor: Selected ? Colors.brand[800] : Colors.brand[500],
    borderWidth:1,
    marginVertical: 5,
  },
  text: {
    overflow: 'hidden',
    textAlign: 'center',
    color: Colors.dark.text,
  },

  Selected:{
    opacity: pressed ? 0.5 : 1,
    elevation: pressed ? 0 : 1,
    shadowColor: colorScheme === 'light' ? '#111' : '#222328',
    shadowOffset: {height: pressed ? 2 :.75, width: pressed ? 2 : 0.75},
    shadowOpacity: pressed ? 0.25 : .75,
    shadowRadius: pressed ? 2 : 1,
  },
})
