import { StyleSheet,  } from 'react-native'
import {View, Text, TextInput } from '@/components/Themed'

import Button from '@/components/Buttons/Button'
import { useAuth } from '@/context/AuthContext'
import Avatar from '@/components/Avatar'
import { supabase } from '@/util/supabase'
import { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'


export default function ManagerProfile() {
  const { onLogout, session } = useAuth()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    // console.log(session?.user.id);
    
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('users')
        .select(`username, first_name, last_name, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    firstName,
    lastName,
    avatar_url,
  }: {
    username: string
    firstName: string
    lastName: string
    avatar_url: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        first_name: firstName, 
        last_name: lastName,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('users').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
      <Avatar
          size={210}
          url={avatarUrl}
          onUpload={(url: string) =>{
            setAvatarUrl(url)
            updateProfile({ username, firstName, lastName, avatar_url: url})
          }}
          />
      </View>
     
      <View style={styles.detailsContainer}>
        
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

        <Button TextValue='Update Profile' Disabled={loading} Function={() => updateProfile({username, firstName, lastName, avatar_url: avatarUrl})} />
        
        <Button TextValue='Logout' Function={onLogout} BackgroundColor={Colors.red[500]} RightIcon='log-out-outline' />

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:20, 
    marginVertical: 10, 
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