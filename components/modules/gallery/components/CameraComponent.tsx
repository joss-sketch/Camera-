/*Props
    -onCancel
    -onTakedPicture (uri: string) */

import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
   onCancel: () => void,
   onTakedPicture: (uri: string) => void, 
} 
export function CameraComponent({
  onCancel,
  onTakedPicture,
}: Props) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  //referencia para acceso a la camera 
  const ref = useRef <CameraView> (null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Se requiere acceso a la camara</Text>
        <Button onPress={requestPermission} title="Otorgar permiso" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  const takedPicture = async () =>{
    const photo = await ref.current?.takePictureAsync();

    // enivar al componete padre la url del archivo
    if (photo){
        onTakedPicture(photo.uri); 
    }
    
  };

  return (
    <View style={styles.container}>
      <CameraView 
      ref={ref}
      style={styles.camera} 
      facing={facing} 
      />
      <View style={styles.buttonContainer}>
         <TouchableOpacity >
          <Ionicons
            name="close"
            size={32}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={takedPicture}>
          <Ionicons
            name="camera"
            size={32}
            color="white"
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Ionicons
            name="camera-reverse-outline"
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
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
    justifyContent:'space-between'
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
