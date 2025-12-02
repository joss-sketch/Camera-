import { StyleSheet, Text, View } from "react-native";
import { Note } from "./domain/note.interface";

type Props = {
    note: Note,
}
export function NotasCard({note}: Props)
{
    return(
    <View style={styles.card}>
       <View style={styles.infoContainer}>
        <Text style={styles.title}>{note.tittle}</Text>
        <Text style={styles.descrip}>{note.description}</Text>
        <Text style={styles.date}>{note.date.toString()}</Text>
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
      alignSelf: "flex-end",  // ← Esto la manda a la derecha

  },
});