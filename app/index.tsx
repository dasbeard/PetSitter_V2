import { StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { View, Text } from '@/components/Themed'
import { Link, router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import Button from '@/components/Buttons/Button';
import Spacer from '@/components/Spacer';
import { useAuth } from '@/context/AuthContext';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const colorScheme = useColorScheme(); 

	const [email, setEmail] = useState('client1@test.com');
	const [password, setPassword] = useState('123456');
	const [loading, setLoading] = useState(false);

  const { onLogin, onLogout, role } = useAuth();

  const login = async () => {
		setLoading(true);
    const result = await onLogin!(email, password);
        
    if (result && result.error) {
      alert(result.error)
      console.log('app/index - Result error:', result.error);
    }
       
    setLoading(false)
  }

  const handleLogout = () => {
   onLogout!();
  }

  const handleCreateAccount = () => {
    router.navigate('/register')
  }

  console.log('index - role:', role);
  
  
  

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

      <Button TextValue='Sign In' Function={login}  />

      <Spacer />

      <Button TextValue='Create Account' Function={handleCreateAccount} Background='#fff' TextColor={Colors.light.text} />
      
      <Spacer />

      <Button TextValue='Log Out' Function={handleLogout} Background='#fff' TextColor={Colors.light.text} />

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
	button: {
		marginTop: 20,
		alignItems: 'center',
		backgroundColor: Colors.brand[500],
		padding: 12,
		borderRadius: 4
	},
	outlineButton: {
		marginVertical: 8,
		alignItems: 'center',
		backgroundColor: 'transparent',
		padding: 12,
		borderRadius: 4,
		borderWidth: 1,
		// borderColor: Colors.blue[500]
		borderColor: Colors.brand[500]
	}
});