import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Note } from "./domain/note.interface";
import { getNotas, saveNote } from "./infraestructure/datasource";
import { NotasCard } from "./NotasCard";
import { NotasModal } from "./NotasModal";


export function NotasView() {
  const [notes, setNotes] = useState<Note[]>([]);
  //Estado para que la nota se va a editar o crear
  //lo vamos a usar para abrir o cerrar el modal
  const [selected, setSelected] = useState<Note | null>(null);

  const addNote = () => {
    //inicializar una nueva nota
    setSelected({
      id: '',
      tittle: '',
      description: '',
      date: new Date(),
    });
  }
  //recibir nota()
  const onNoteChanged = (note: Note) => {
    console.log(JSON.stringify(note));
    //agregar nota la nota de coleccion
    //mandar a guardar la nota en la BD
    saveNote(note)
      .then(resultado => {
        if (resultado) {
          //si la nmota es nueva, agregar/actualiz al estado
          if (!note.id) {
            setNotes([
              resultado,//se cambia donde quiero las notas 
              ...notes,
            ]);
          } else {
            setNotes([
              ...notes.map((item) => item.id === resultado.id ? resultado : item)
            ]);
          }
          setSelected(null);
        }
      })
  }

  const onCancelModal = () => {
    setSelected(null);
  }
  //implementar efecto para cargar las notas cuando se ingrese a esta pantalla
  useEffect(() => {
    //mandar a cargar los datos
    getNotas()
      .then(results => {
        //poner el resultado en notas
        setNotes(results);
      })
      .catch(() => {
        Alert.alert("No se pudo cargar las fechas");
      });
  }, []);
  return (
    <View>
      {/*Mostras las fotos con flatlist*/}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotasCard
            note={item}
          />
        )}
      />

      <TouchableOpacity
        onPress={addNote}>
        <Text style={styles.button}>Agregar</Text>
      </TouchableOpacity>
      <NotasModal
        note={selected}
        onSave={onNoteChanged}
        onCancel={onCancelModal} />
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    color: 'darkblue',
    fontWeight: 700,
    fontSize: 22,
  },
});