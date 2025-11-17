//galeria
//botón para añadir la imagen
import React, { useState } from "react";
import { FlatList, Image, ImageBackground, StyleSheet, View } from "react-native";
import { ImagePicker } from "./components/ImagePicker";

export function GalleryView() {
    //Estado parfa la coleccion de imagenes 
  const [images, setImages] = useState<string[]>([]);
    //recibir una nueva imagen 
  const onAdded = (uri: string) => {
    //console.log('URI de la imagen:', uri);
    //agregar la nueva imagen a la coleccion
    setImages([uri, ...images]);
  };

  const renderItem = ({ item }: { item: string }) => (  // Tipo explícito para item
    <Image
      source={{ uri: item }}
      style={styles.image}
    />
  );

  return (
    <ImageBackground source={require("@/assets/images/baby.jpeg")}  style={styles.fondo}>
    <View style={styles.container}
    > 
    {/*selector de imagen */}
      <ImagePicker onImageSelected={onAdded} 
      />
 {/*Mostras las fotos con flatlist*/}
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.gallery}
        renderItem={renderItem}
      />
    </View>
    </ImageBackground>
  ); 
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  gallery: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
  fondo:{
    flex:1,
    justifyContent: 'center',
  }
});