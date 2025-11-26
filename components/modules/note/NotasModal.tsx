import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Note } from "./domain/note.interface";

type Props = {
  note: Note | null;
  onCancel: () => void;
  onSave: (note: Note) => void;
  
}
export function NotasModal (
    {
  note,
  onSave,
  onCancel,
  } : Props){
 if (!note){
    return null;
 }

 return(
<Modal
    visible= {!!note}
    transparent
    animationType="slide"
>
<View style={styles.modalContainer}>
    
    <View style={styles.modalContent}>
        <Text style={styles.addNota}>{note.id ? 'Editar nota' : 'Agregar Nota'}</Text>
        <TextInput
        style={styles.input}
        placeholder="Título"/>
        
        <TextInput
        style={[styles.input,{ minHeight:100}]}
        placeholder="Descripción"
        multiline
        numberOfLines={5}/>
        <View style={styles.containButt}>
            <TouchableOpacity
             style={styles.butt}>
                <Text style={styles.textButt}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.butt}
            onPress={onCancel}>
                <Text style={styles.textButt}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    </View>
</View>
</Modal>
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
    //shadowColor: "#000",
    //shadowOpacity: 0.2,
    //shadowRadius: 8,
    //elevation: 10,
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  butt: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#33cc5a",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
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
    padding: 0,
  },
});
