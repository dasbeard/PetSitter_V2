import { StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { View, Text } from '@/components/Themed'
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import Button from '@/components/Buttons/Button';
import Spacer from '@/components/Spacer';
import { useAuth } from '@/context/AuthContext';


const ErrorComponent = ({error}: any) => {
  return (
    <View style={errorStyles.container}>
      <Text style={errorStyles.text}>Error: {error}</Text>
    </View>
  )
}

const errorStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.red[500],
    padding: 6,
    backgroundColor: Colors.red[100],
    marginBottom: 3,
  },
  text:{
    color: Colors.red[900],
    fontWeight: '600',
  }
})

export default function Register() {
  const colorScheme = useColorScheme(); 

	const [email, setEmail] = useState('client1@test.com');
	const [password, setPassword] = useState('123456');
	const [passwordConf, setPasswordConf] = useState('123456');
	const [loading, setLoading] = useState(false);
  const [error, setError ] = useState<string | null>(null)
  const [disabled, setDisabled] = useState<boolean>(false)

  const { onRegister, onLogout } = useAuth();
  
  const handleRegister = () => {
   
  }

  const handleGoBack = () => {
    router.replace('/')
  }


  // const handleDisabled = () => {
  //   if (email.length < 1) return
  //   if (password.length < 5) return
  //   if (password !== passwordConf) return
  //   console.log('here');
    

  //   setDisabled(false)

  // }

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
  
        { error && <ErrorComponent error={error} /> }
        {/* <Text>Error: {error}</Text> */}
        
        
  
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
        
        {/* <Spacer /> */}
  
        {/* <Button TextValue='Log Out' Function={handleLogout} BackgroundColor='#fff' TextColor={Colors.light.text} /> */}
  
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
  
}

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