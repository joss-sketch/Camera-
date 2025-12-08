import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Note } from "./domain/note.interface";

type Props = {
    note: Note,
    onDelete: (note: Note) => void;
    onEdit: (note: Note) => void;
}
export function NotasCard({note, onEdit, onDelete}: Props)
{
    return(
    <View style={styles.card}>
       <View style={styles.infoContainer}>
        <Text style={styles.title}>{note.tittle}</Text>
        <Text style={styles.descrip}>{note.description}</Text>
        <Text style={styles.date}>{note.date.toString()}</Text>
        <View style={styles.buttEd}>
          <TouchableOpacity style={styles.butt} onPress={() => onEdit(note)}
          >
           <Text style={styles.textButt}>Editar</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.butt} onPress={() => onDelete(note)}>
            <Text style={styles.textButt}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View> 
    </View>
    );
}
const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    marginVertical: 15,
  },
  infoContainer: {
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0d0d0d",
    marginBottom: 4,
  },
  descrip: {
    fontSize: 16,
    fontWeight: "400",
    color: "#444",
    lineHeight: 22,
    marginBottom: 10,
  },
  date: {
    fontSize: 13,
    color: "#888",
    marginTop: 5,
    fontStyle: "italic",
    alignSelf: "flex-end",  // Esto la manda a la derecha
  },
  buttEd:{
    flexDirection:'row',
    marginTop:10,
    justifyContent:"space-between"
  },
  butt:{
    backgroundColor:"#53d44aff",
    padding:8,
    borderRadius:8,
    width:"45%"
  },
  textButt:{
    color:'#f9f7f7ff',
    textAlign:"center",
    fontWeight:'bold'
  }
})