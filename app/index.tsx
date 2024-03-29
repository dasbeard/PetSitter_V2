import { StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { View, Text, TextInput, AlertView, AlertText } from '@/components/Themed'
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import Button from '@/components/Buttons/Button';
import Spacer from '@/components/Spacer';
import useAuthStore from '@/hooks/auth';

export default function Login() {
  const colorScheme = useColorScheme(); 

	const [email, setEmail] = useState('employee1@test.com');
	const [password, setPassword] = useState('123456');
	const [loading, setLoading] = useState(false);
  const [ error, setError ] = useState<string | null>(null)

  const signIn = useAuthStore((state) => state.signIn)
  
  const router = useRouter();



  const handleSignIn = async () => {
    setError(null)
		setLoading(true);
    try {
      const { error }: any = await signIn(email, password);
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

      { error && <AlertView style={{marginBottom: 4}}><AlertText>{error}</AlertText></AlertView>}

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

      <Button TextValue='Sign In' Function={handleSignIn} />

      <Spacer />

      <Button TextValue='Create Account' Function={handleCreateAccount} BackgroundColor='#fff' TextColor={Colors.light.text} />
      
			{loading && (
				<View
					style={[
						StyleSheet.absoluteFill,
						{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1, justifyContent: 'center' }
					]}
				>
					<ActivityIndicator style={{transform:[{scale: 2.5}], paddingBottom: 40}} color={Colors.brand[500]} size="large" />
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
	},
});