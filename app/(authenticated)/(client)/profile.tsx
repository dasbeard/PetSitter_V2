import { StyleSheet } from 'react-native'
import {View, Text} from '@/components/Themed'
// import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react';


export default function Profile() {
  // const { getProfile, UserInfo, session } = useAuth();

  // useEffect(() => {
  //   const test = getProfile!(session!)
  //   console.log('Profile ----');
  //   console.log({test});
  //   // console.log({error});
  //   // console.log({data});
  //   console.log('---- Profile');
    
  //   // console.log(UserInfo);
  // },[])


  // console.log(UserInfo);
  

  return (
    <View style={styles.container}>
      <Text>Client Profile</Text>
      {/* <Text>Username: {UserInfo?.username}</Text> */}
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10, 

  }
})