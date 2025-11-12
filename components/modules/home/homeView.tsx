//link que lleve a la cuenta del usuario 

import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

//validar el suario 
export function HomeView (){
    return(
        <View style ={styles.container}>
            <TouchableOpacity 
            onPress={() => router.push('/account')}>
                <Text>Cuenta de Usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => router.push('/gallery')}>
                <Text>Galeria</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
container:{
    padding:60,

}
});