import { StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { View, Text, TextInput, AlertView, AlertText } from '@/components/Themed'
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import Button from '@/components/Buttons/Button';
import Spacer from '@/components/Spacer';
import useAuthStore from '@/hooks/auth';

export default function Register() {
  const colorScheme = useColorScheme(); 

  const register = useAuthStore((state) => state.register)

	const [email, setEmail] = useState('client1@test.com');
	const [password, setPassword] = useState('123456');
	const [passwordConf, setPasswordConf] = useState('123456');
	const [loading, setLoading] = useState(false);
  const [error, setError ] = useState<string | null>(null)
  const [disabled, setDisabled] = useState<boolean>(false)
  
  const handleRegister = async () => {
    setError(null)
		setLoading(true);

    try {
      if (!email) {
        setError('Email must be provided')
        return
      }
      if (!password) {
        setError('No Password provided')
        return
      }
      if(password !== passwordConf) {
        setError('Passwords Must Match')
        return
      }
      const { error }: any = await register!(email, password);
      if (error) throw error
    } catch (error:any) {
      console.log(error);
      
      const errorString = error.error.toString();
      const newError = errorString.substring(errorString.indexOf(' ') + 1);
      setError(newError)
    } finally {
      setLoading(false)
    }
  }

  const handleGoBack = () => {
    router.replace('/')
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
  
        { error && <AlertView><AlertText>Error: {error}</AlertText></AlertView>}
          
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
        <TextInput
          placeholder="confirm password"
          value={passwordConf}
          onChangeText={setPasswordConf}
          secureTextEntry
          style={styles.inputField}
          placeholderTextColor={Colors.altText}
        />
  
        <Spacer Size={4} />
  
        <Button TextValue='Sign Up' Disabled={disabled} Function={handleRegister} />
  
        <Spacer />
  
        <Button TextValue='Back To Login' Function={handleGoBack} BackgroundColor='#fff' TextColor={Colors.light.text} />
  
        {loading && (
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1, justifyContent: 'center', alignItems: 'center' }
            ]}
          >
            <ActivityIndicator style={{transform:[{scale: 2.5}], paddingBottom: 40}} color={Colors.brand[500]} size="large" />
          </View>
        )}
      </View>
    );
  
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 40,
		paddingHorizontal: 20,
		justifyContent: 'center',
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