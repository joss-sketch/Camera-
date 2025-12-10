import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, ImageBackground, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { ImagePicker } from "./components/ImagePicker";

export function GalleryView() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Cargar imágenes desde la tabla
  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    const { data, error } = await supabase
      .from("imagenes")
      .select("ruta")
      .order("date", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
    const rutas = data.map((img) => img.ruta);
    console.log("Imagenes de supabase", rutas);  // ← AQUI
    setImages(rutas);
      
    }
  }

  // Subir imagen al storage
  const onAdded = async (uri: string) => {
    try {
      setLoading(true);

      const arraybuffer = await fetch(uri).then((res) => res.arrayBuffer());
      const ext = uri.split(".").pop()?.toLowerCase() || "jpeg";
      const filePath = `${Date.now()}.${ext}`;

      // Subir al bucket "Imagen"
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, arraybuffer, {
          contentType: `image/${ext}`,
        });

      if (uploadError) throw uploadError;

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Guardar en la tabla
      const { error: insertError } = await supabase
        .from("imagenes")
        .insert([{ ruta: publicUrl }]);

      if (insertError) throw insertError;

      setImages([publicUrl, ...images]);
      Alert.alert("Imagen subida con éxito");

    } catch (error: any) {
      Alert.alert("Error al guardar imagen", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para transformar URL pública a ruta del storage
  function extractPath(publicUrl: string) {
    return publicUrl.split("/public/")[1];  
  }
  // Eliminar imagen del storage
  async function deleteImage(url: string) {
    try {
      const path = extractPath(url);

      const { error } = await supabase.storage
        .from("avatars")
        .remove([path]);

      if (error) throw error;

      setImages(images.filter((img) => img !== url));

      Alert.alert("Imagen Eliminada del storage");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  // Render de cada imagen
  const renderItem = ({ item }: { item: string }) => (
    <Pressable
      onPress={() => setSelectedImage(item)}         // abrir modal
      onLongPress={() => deleteImage(item)}          // eliminar
    >
      <Image source={{ uri: item }} style={styles.image} />
    </Pressable>
  );
  //estaod de eliminacion
  const [deleting, setDeleting] = useState(false);


  return (
    <ImageBackground
      source={require("@/assets/images/baby.jpeg")}
      style={styles.fondo}
    >
      <View style={styles.container}>

        {/* Botón para seleccionar imagen */}
        <ImagePicker onImageSelected={onAdded} />

        {/* Galería */}
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.gallery}
          renderItem={renderItem}
        />

        {/* Modal de imagen completa */}
        <Modal visible={!!selectedImage} transparent={true}>
          <View style={styles.modalContainer}>
            <Image
              source={{ uri: selectedImage || "" }}
              style={styles.fullImage}
            />

            <Pressable
              style={styles.closeButton}
              onPress={() => setSelectedImage(null)}
            >
              <Text style={styles.closeText}>Cerrar</Text>
            </Pressable>
            <Pressable style={[styles.closeButton, { backgroundColor: "red" }]}
              onPress={() => selectedImage && deleteImage (selectedImage)}
            >
               <Text style={[styles.closeText, { color: "#fff" }]}>Eliminar</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
  flex: 1,
  width: "100%",
  height: "100%",
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
  fondo: {
    flex: 1,
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "70%",
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  closeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
