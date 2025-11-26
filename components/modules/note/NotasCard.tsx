import { StyleSheet, Text, View } from "react-native";
import { Note } from "./domain/note.interface";

type Props = {
    note: Note,
}
export function NotasCard({note}: Props)
{
    return(
        <View style={styles.infoContainer}>
        <Text >{note.title}</Text>
        <Text >{note.description}</Text>
        <Text >{note.date.toLocaleDateString()}</Text>
      </View>

    );
}
const styles = StyleSheet.create({
 infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
});