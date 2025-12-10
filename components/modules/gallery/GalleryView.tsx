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
    console.log("Imagenes de supabase", rutas);
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
  const parts = publicUrl.split("/avatars/");
  return parts[1] ? `avatars/${parts[1]}` : null;
}

  //Eliminar imagen 
 async function deleteImage(url: string) {
  Alert.alert(
    "Eliminar imagen",
    "¿Deseas eliminar esta imagen?",
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {

            // Obtener ruta exacta
            const path = extractPath(url);
            if (!path) throw new Error("No se pudo obtener la ruta del archivo");

            //Eliminar del storage
            const { error: storageError } = await supabase.storage
              .from("avatars")
              .remove([path]);

            if (storageError) throw storageError;

            //Eliminar de la tabla imagenes
            const { error: tableError } = await supabase
              .from("imagenes")
              .delete()
              .eq("ruta", url);

            if (tableError) throw tableError;

            //Quitar de la app
            setImages(images.filter((img) => img !== url));
            setSelectedImage(null);

            Alert.alert("Imagen Eliminada");
          } catch (error: any) {
            Alert.alert("Error al eliminar", error.message);
          }
        },
      },
    ]
  );
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

  return (
    <ImageBackground
      source={require("@/assets/images/baby.jpeg")}
      style={styles.fondo}
    >
      <View style={styles.container}>
        {/* Selecctor de imagen */}
        <ImagePicker onImageSelected={onAdded} />
        {/* Galería en la app */}
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.gallery}
          renderItem={renderItem}
        />
        {/* Modal de imagen */}
        <Modal visible={!!selectedImage} transparent={true}>
          <View style={styles.modalContainer}>
            <Image
              source={{ uri: selectedImage || "" }}
              style={styles.tamImage}
            />
            <Pressable
              style={styles.buttCerrar}
              onPress={() => setSelectedImage(null)}
            >
              <Text style={styles.closeText}>Cerrar</Text>
            </Pressable>
            <Pressable style={[styles.buttCerrar, { backgroundColor: "#a20f0fff" }]}
              onPress={() => selectedImage && deleteImage (selectedImage)}
            >
               <Text style={[styles.closeText, { color: "#f7f4f4ff" }]}>Eliminar</Text>
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
  tamImage: {
    width: "90%",
    height: "70%",
    borderRadius: 10,
  },
  buttCerrar: {
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
