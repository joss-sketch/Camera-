//selector de imagen
/*
 * mostrar apciones de origen:
 *  -desde la galeria
 *  -desde la camara
 * si el origen es camara, lanzar el componente de cam 
 * si el origen es galeria, seleccionar imagen
 * 
 *si se tiene imagen seleccionada / capturada
  --abrir el visualizador de imagen

  cuando se acepte (guardar), retornar la imagen al GalleryView
 */

import { Ionicons } from "@expo/vector-icons";
import * as ExpoImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraComponent } from "./CameraComponent";
import { ImagePreview } from "./ImagePreview";

//debe lanzar un modal
//tener boton para lanzar modal
type Props = {
    onImageSelected: (uri: string)=> void;
}

export function ImagePicker(
    {onImageSelected}:Props
) {
    const [open, setOpen] = useState(false);
    //estado para la camara
    const [cameraOpen, setCameraOpen] = useState(false);
    //ruta de la imagen, estaod para la imagen seleccionada
    const [image, setImage] = useState<string | null>(null);
    //lanzar galeria
    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const onNewImage = () =>{
    setImage(null);
    //abrir la camara
    setCameraOpen(true);//agg
  }

  const onSave = (uri: string)=>{
    onImageSelected(uri);
    //todo;guarda foto
    //cerrar el modal
    Alert.alert('Foto guardada');
    setOpen(false);
    setImage(null);

  }
    const onTakedPicture = (uri: string) =>{
        //cerrar la camera
        setCameraOpen(false);

        //Visualizar la imagen tomada
        setImage(uri);
    }
//menu de opciones
    const renderMenu = (
        <View
            style={styles.modalContainer}
        >
            <View 
                style={styles.modalContent}
            >
                <Text
                    style={styles.title}
                >Origen de la imagen</Text>

                {/*contenedor de botones */}
                <View
                    style={styles.buttonContainer}    
                >
                    <TouchableOpacity
                    onPress={() => setCameraOpen (true)}
                    >
                        <Text style={styles.button}>Camara</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={pickImage}
                    >
                        <Text style={styles.button}>Galeria</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setOpen(false)}
                        >
                        <Text style={styles.cancelButton}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

    return (
        <>
        <TouchableOpacity
            onPress={()=> setOpen(true)}
        >
            <Ionicons
                name= "camera-outline"
                size={32}
                color="green"
                />
        </TouchableOpacity>
        <Modal
            visible= {open}
            transparent
            animationType="slide"
        >
            {/* si no hay imagen, y camara abierta, mostrar menu */}
            {!image && !cameraOpen ? renderMenu : null }
            {/*si la camara esta abierta mostrar CameraComponete */}
            {cameraOpen ? (
                <CameraComponent 
                onCancel={() => 
                setCameraOpen(false)}
                onTakedPicture ={onTakedPicture}
                />
            ) : null}
            {/*si hay una imagen seleccionada, mostrar el preview */}
            {!!image ? (
                <ImagePreview 
                uri={image}
                onCancel={()=>setImage(null)}
                onSave={onSave}
                onNewImage={onNewImage}>
                </ImagePreview>
            ): null}
        </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    modalContainer:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0, 0.15)',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#f0f0f0',
        width: '80%',
        padding: 20,
        display: 'flex',
        borderRadius: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    title:{
        fontSize: 20,
        fontWeight: 700,
    }, 
    buttonContainer:{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    button: {
        color: 'darkblue',
        fontWeight: 700,
        fontSize: 22,
    },
    cancelButton: {
        color: 'red',
        fontWeight: 700,
        fontSize:20,
    },
     
}) 