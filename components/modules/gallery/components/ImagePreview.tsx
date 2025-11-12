//visualizar la imagen selccionada

import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

/*debe de recibir:
  -uri de la imagen
  -funcion para guardar
  -funcion para cancelar
  -funcion para tomar o elegir otra imagen
*/
type Props = {
  uri: string,
  onCancel: () => void,
  onSave: (uri: string) => void,
  onNewImage: () => void, //void es un metodo de que no retorna nada 
}

export function ImagePreview({
  uri,
  onSave,
  onNewImage,
  onCancel
} : Props) {

  return (
    <View style={styles.container}>
      <Image
        source={{ uri }}
        style={styles.image}
      />
      {/*Selecciones de botones */}
      <View style={styles.button}>
        <TouchableOpacity onPress={onCancel}>
          <Ionicons
            name="close"
            size={32}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSave(uri)}>
          <Ionicons
            name="save-outline"
            size={32}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNewImage}>
          <Ionicons
            name="camera-outline"
            size={32}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  button: {
    position: 'absolute',
    bottom: 68,
    left: 0,
    right: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',    
  },
  image:{
    height: '100%',
    objectFit: 'contain', //como se comporta la imagen dependiendo en la imagen que esta para que no se deforme
  }
})