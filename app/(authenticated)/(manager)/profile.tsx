import { StyleSheet,  } from 'react-native'
import {View, TextInput, AlertView, AlertText, BGView } from '@/components/Themed'
import Button from '@/components/Buttons/Button'
import Avatar from '@/components/Avatar'
import { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import useAuthStore from '@/hooks/auth'


export default function ManagerProfile() {
  const userData = useAuthStore((state) => state.userData)
  const session = useAuthStore((state) => state.session)
  const logout = useAuthStore((state) => state.logout)
  const updateProfile = useAuthStore((state) => state.updateProfile)
  
  const [loading, setLoading] = useState(false)
  const [ error, setError ] = useState<string | null>(null)
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect( () => {
    setValues()
  }, [userData])
    
  const setValues = () => {
    setUsername(userData?.username!)
    setFirstName(userData?.first_name!)
    setLastName(userData?.last_name!)
    setAvatarUrl(userData?.avatar_url!)
  }

  const handleUpdate = async (newAvatar: string) => {
    setError(null);
    setLoading(true);
    const id = session?.user.id!;
    const { error } = await updateProfile(id, username, firstName, lastName, newAvatar)

    if(error){
      setError(error)
      console.log('Error updating profile', error);
      // alert(error)
    }

    setLoading(false)
  }

  return (
    <BGView style={styles.container}>
      <BGView style={styles.avatarContainer}>
      <Avatar
          size={210}
          url={avatarUrl}
          onUpload={(url: string) =>{
            setAvatarUrl(url)
            handleUpdate(url)
          }}
          />
      </BGView>
     
      <BGView style={styles.detailsContainer}>

      { error && <AlertView style={{marginBottom: 4}}><AlertText>Error updating profile</AlertText></AlertView>}

        <TextInput 
          style={styles.inputField}
          value={username}
          onChangeText={setUsername}
          placeholder='username'
        />
        <TextInput 
          style={styles.inputField}
          value={firstName}
          onChangeText={setFirstName}
          placeholder='First Name'
        />
        <TextInput 
          style={styles.inputField}
          value={lastName}
          onChangeText={setLastName}
          placeholder='Last Name'
        />

        <Button 
          TextValue='Update Profile' 
          Disabled={loading} 
          // Function={() => updateProfile({username, firstName, lastName, avatar_url: avatarUrl})} 
          Function={handleUpdate} 
        />
        
        <Button 
          TextValue='Logout' 
          Function={() => logout()} 
          BackgroundColor={Colors.red[500]} 
          RightIcon='log-out-outline' 
        />

      </BGView>

    </BGView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10,
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '90%',
    alignSelf: 'center'
  },

  detailsContainer: {
    flex: 1,

  },
  inputField: {
		marginVertical: 4,
	},

})