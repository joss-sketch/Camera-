//link que lleve a la cuenta del usuario 

import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

//validar el suario 
export function HomeView (){
    return(
        <View style ={styles.container}>
            <TouchableOpacity 
            onPress={() => router.push('/account')}
            style={styles.butt}>
                <Text style={styles.text}>Cuenta de Usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => router.push('/gallery')}
              style={styles.butt}>
                <Text style={styles.text}>Galeria</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
container:{
    padding:60,
    justifyContent:'center',
    alignItems:'center',
    gap:20
}, 
text:{
   fontWeight:'bold',
    fontSize:20,
    color:'#FFFFFF'
},
butt:{
    paddingVertical:12,
    borderWidth:1,
    borderRadius:30,
    width:'90%',
    alignItems:'center',
    backgroundColor:'#ba1313ff'
},

});