import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { Platform } from 'react-native';

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
  const { session, initialized, role } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {    
    console.log('-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
    
    if (!initialized) return;
    console.log({segments}); 
    // console.log({session}); 
    // console.log({role}); 

    const inAuthGroup = segments[0] === '(authenticated)';
    
    if(session && !inAuthGroup){
      console.log('Has Session');
      console.log({role});
      
      if (role === 'client'){
        router.replace('/(authenticated)/(client)/dashboard')
      } else if ( role === 'employee' ) {
        router.replace('/(authenticated)/(employee)/dashboard')
      } else if ( role === 'manager' ) {
        router.replace('/(authenticated)/(manager)/dashboard')
      } else {
        router.navigate('/register')
        
      }
    } else if (!session && inAuthGroup){
      console.log('No session');
      console.log({role});
      router.replace('/')
    }

  },[session, initialized, role])

  // if (!loaded || !initialized) {
  if (!loaded ) {
    return null;
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
    </ThemeProvider>
    
  );
}

export default function RootLayout() {

  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  )
}
