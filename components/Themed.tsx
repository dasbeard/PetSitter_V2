/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView, TextInput as DefaultTextInput } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type InputProps = ThemeProps & DefaultTextInput['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'view');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function BGView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  // const backgroundColor = useThemeColor({ light: 'grey', dark: 'green' }, 'background');

  return <DefaultView style={[{ backgroundColor } , style]} {...otherProps} />;
}

export function TextInput(props: InputProps) {
  const { style, ...otherProps } = props;

  return (<DefaultTextInput 
    style={[
      { 
        color: Colors.brand[900],
        backgroundColor: Colors.brand[50], 
        borderColor: Colors.brand[700], 
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        minHeight: 50,
      },
      style]}
     {...otherProps} 
    />
  );
}

export function AlertView(props: ViewProps) {
  const { style, ...otherProps } = props;

  return (
    <DefaultView 
      style={[
        {     
          borderWidth: 1,
          borderRadius: 4,
          padding: 6,
          minHeight: 30,
          borderColor: Colors.red[500],
          backgroundColor: Colors.red[100], 
        }, 
        style]}
        {...otherProps} />
  );
}


export function AlertText(props: TextProps) {
  const { style, ...otherProps } = props;

  return <DefaultText style={[{ color: Colors.red[900]  }, style]} {...otherProps} />;
}