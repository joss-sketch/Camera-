import React, { useState } from 'react'
import { Alert, AppState, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
//import { Button, Input } from '@rneui/themed'
import { supabase } from '@/lib/supabase'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={styles.text3}> Email</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          style={styles.inputText}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.text3}> Password </Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          style={styles.inputText}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>

        <TouchableOpacity  disabled={loading} 
        style={styles.button}
        onPress={() => signInWithEmail()} 
        >   
        <Text style={styles.text5} >Sing in</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.verticallySpaced}>
        <TouchableOpacity  disabled={loading} 
        style={styles.button}
        onPress={() => signUpWithEmail()} >
            <Text style={styles.text5}>Sing up</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d2929ff',
    padding: 10,
    marginTop: 15,
    borderRadius: 12,
  }, 
  inputText:{
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
  },
  text3:{
    fontSize: 16,
    fontWeight: 'bold',
    },
  SingText:{
    fontWeight:'bold',
    marginLeft:5,
    color:'#080808ff',
    alignContent:'center'
    },
  text5:{
    fontSize: 24,
    fontWeight:'light',
    color: '#eee8e8ff',
    },
})