import { useEffect, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Note } from "./domain/note.interface";

type Props = {
  note: Note | null;
  onCancel: () => void;
  onSave: (note: Note) => void;
}
export function NotasModal(
  {
    note,
    onSave,
    onCancel,
  }: Props) {
  //implementar estado para los campos
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const saveNote = () => {
    //si no hay nota no continuar
    if (!note) return;
    //llamar a la propiedad onSave
    onSave({
      ...note,//tomar la info original de la nota
      tittle: title,//pasar el nuevo titulo
      description,
    })
  }
  //monitorear la propiedad note
  //para pasar sus datos al estdo de los campos
  useEffect(() => {
    //si hay una nota , leer el tituolo o tomarlo si no, poner una cadena vacía
    setTitle(note?.tittle || "");
    //funcion para mandar a guardar la nota
    setDescription(note?.description || "");
    //monitorea o esta observando la propiedad note
  }, [note]);
  if (!note) {
    return null;
  }
  return (
    <>
    <Modal
      visible={!!note}
      transparent
      animationType="slide"
    >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
            <Text style={styles.addNota}>{note.id ? 'Editar nota' : 'Agregar Nota'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={title}
              onChangeText={setTitle} />

            <TextInput
              style={[styles.input, { minHeight: 100 }]}
              placeholder="Descripción"
              multiline
              numberOfLines={5}
              value={description}
              onChangeText={setDescription} />

            <View style={styles.containButt}>
              <TouchableOpacity
                style={styles.butt}
                onPress={saveNote}>
                <Text style={styles.textButt}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.butt}
                onPress={onCancel}>
                <Text style={styles.textButt}>Cancelar</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      </>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    padding: 10,
  },

  modalContent: {
    backgroundColor: "#ffffff",
    width: "85%",
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: "center",
    gap: 20,
   
  },

  addNota: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#222",
    marginBottom: 10,
  },

  input: {
    width: "100%",
    height: 45,
    borderColor: "#cccccc",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
    color: "#333",
    fontSize: 16,
   marginBottom:15,

  },

  butt: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#33cc5a",
  },

  textButt: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
  },

  containButt: {
    width: "100%",
    //justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 20,

  },
});
