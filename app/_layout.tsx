import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { ActivityIndicator, ImageBackground, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import useAuthStore from '@/hooks/auth';
import { supabase } from '@/util/supabase';
import { View } from '@/components/Themed';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const colorScheme = useColorScheme();
  const role = useAuthStore((state) => state.role)
  const session = useAuthStore((state) => state.session)
  const setSessionAndRole = useAuthStore((state) => state.setSessionAndRole)

  const router = useRouter();
  const segments = useSegments();

  const [ initialized, setInitialized ] = useState<boolean>(false)

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && initialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded, initialized]);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessionAndRole(session)
    })    
    supabase.auth.onAuthStateChange((_event, session) => {
      setSessionAndRole(session)
    })
    setTimeout(() => {
      setInitialized(true)
    }, 20);
  },[])


  useEffect(() => {    
    console.log('-*-*-*-*-*-*-*- app/Layout UseEffect -*-*-*-*-*-*-*-*');
    // console.log('Has Session');
    // console.log({role});
    // console.log({segments});
    // console.log({session});
    
    if (!initialized) return;
    if( session && !role) return

      // get the path segments to determine where the user currently is
    const inAuthGroup = segments[0] === '(authenticated)';

    if(role && !inAuthGroup){
      if (role === 'client'){
        router.replace('/(authenticated)/(client)/dashboard')
      } else if ( role === 'employee' ) {
        router.replace('/(authenticated)/(employee)/dashboard')
      } else if ( role === 'manager' ) {
        router.replace('/(authenticated)/(manager)/dashboard')
      } else {
        //  safety fallback - should never reach here
        router.navigate('/')
      }
    } else if (!role && inAuthGroup){
      console.log('No Role');
      router.replace('/')
    }

  },[session, role, initialized])

  // if (!loaded ) {
  if (!loaded || !initialized) {
    // return null;
    return ( 
      <View style={{flex: 1, backgroundColor: Colors.brand[500], alignItems: 'center', justifyContent: 'center'}}>
        <ImageBackground 
          source={require('@/assets/images/splash.png')} 
          resizeMode='center'
          style={{flex: 1}}
        />

        <ActivityIndicator size={'large'} />
      </View>
    )
  }




  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.brand[500]
          },
          headerTintColor: Colors.dark.text
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
        
        <Stack.Screen 
          name='register' 
          options={{ 
            title: 'Create Account',
            headerBackTitle: 'Login',
            headerShown: Platform.OS === 'web' ? false : true
            }} 
        />
               
        <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style='dark' />
    </ThemeProvider>
    
  );
}

export default function RootLayout() {

  return  <InitialLayout /> 
}
