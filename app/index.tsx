import { StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { View, Text } from '@/components/Themed'
import { router, useRouter, useSegments } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import Button from '@/components/Buttons/Button';
import Spacer from '@/components/Spacer';
import { useAuth } from '@/context/AuthContext';
import ErrorMessage from '@/components/ErrorMessage';

export default function Login() {
  const colorScheme = useColorScheme(); 

	const [email, setEmail] = useState('test@test.com');
	const [password, setPassword] = useState('123456');
	const [loading, setLoading] = useState(false);
  const [ error, setError ] = useState<string | null>(null)

  const { onLogin, role, session } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    setTimeout(() => {      
      const inAuthGroup = segments[0] === '(authenticated)';
    
      if(session && !inAuthGroup && role){
        if (role === 'client'){
          router.replace('/(authenticated)/(client)/dashboard')
        } else if ( role === 'employee' ) {
          router.replace('/(authenticated)/(employee)/dashboard')
        } else if ( role === 'manager' ) {
          router.replace('/(authenticated)/(manager)/dashboard')
        }
      } else if (!session && inAuthGroup){
        router.replace('/')
      }
    }, 25);
    

  }, [])


  const login = async () => {
    setError(null)
		setLoading(true);
    try {
      const { error }: any = await onLogin!(email, password);
      if (error) throw error
    } catch (error:any) {
      const errorString = error.toString();
      const newError = errorString.substring(errorString.indexOf(' ') + 1);
      // console.log(error.toString().substring(error.indexOf(' ') + 1));
      // alert(error)
      setError(newError)
    } finally {
      setLoading(false)

    }
  }

  const handleCreateAccount = () => {
    router.navigate('/register')
  } 

  return (
		<View style={styles.container}>

      {colorScheme === 'light' ? (
        <Image
          source={require( '../assets/icons/TempLogo.png' )}
          style={styles.image}
        />
      ):(
        <Image
				source={require( '../assets/icons/TempLogo_Alt.png' )}
				style={styles.image}
        />
      )}

			<Text style={styles.subheader}>The app to be.</Text>

      { error && <ErrorMessage message={error} /> }

			<TextInput
				autoCapitalize="none"
				placeholder="john@doe.com"
				value={email}
				onChangeText={setEmail}
				style={styles.inputField}
				placeholderTextColor={Colors.altText}
        />
			<TextInput
				placeholder="password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				style={styles.inputField}
				placeholderTextColor={Colors.altText}
			/>

      <Spacer Size={4} />

      <Button TextValue='Sign In' Function={login} />

      <Spacer />

      <Button TextValue='Create Account' Function={handleCreateAccount} BackgroundColor='#fff' TextColor={Colors.light.text} />
      
			{loading && (
				<View
					style={[
						StyleSheet.absoluteFill,
						{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1, justifyContent: 'center' }
					]}
				>
					<ActivityIndicator color="#fff" size="large" />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center'
	},
	image: {
		width: '100%',
		height: 100,
		resizeMode: 'contain'
	},
	subheader: {
		fontSize: 18,
		textAlign: 'center',
		marginTop: 20,
		marginBottom: 40,
	},
	inputField: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderColor: Colors.brand[700],
		borderRadius: 4,
		padding: 10,
		color: Colors.brand[800],
		backgroundColor: Colors.blue[100]
	},
});