import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Note } from "./domain/note.interface";
import { NotasCard } from "./NotasCard";
import { NotasModal } from "./NotasModal";


export function NotasView(){
  const [notes, setNotes] = useState <Note[]>([
    {
      id: 'asaaa',
      title:'ejemplo',
      description:' Este ejemplo es un ejemplo de nota',
      date: new Date(),
    }
  ]);
  //Estado para que la nota se va a editar o crear
  //lo vamos a usar para abrir o cerrar el modal
  const [selected, setSelected] = useState <Note | null>(null);
  
  const addNote = () => {
    //inicializar una nueva nota
    setSelected({
      id:'',
      title:'',
      description:'',
      date: new Date(),
    });
  }
  //recibir nota()
  const onNoteChanged = (notes : Note) => {
    //agregar nota la nota de coleccion
  }
  const onCancelModal = () => {
    setSelected(null);
  }
  return(
<View>
    {/*Mostras las fotos con flatlist*/}
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <NotasCard
              note = {item}
              />
            )}
          />

    <TouchableOpacity
      onPress={addNote}>
      <Text style={styles.button}>Agregar</Text>
    </TouchableOpacity>
    <NotasModal
    note = {selected}
    onSave={onNoteChanged}
    onCancel={onCancelModal}/>
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