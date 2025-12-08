import { supabase } from "@/lib/supabase";
import { Note } from "../domain/note.interface";

//implementar la fuente de dtaos para notas, devuleve los regsitro de notas
export async function getNotas(): Promise<Note[]> { //se pone una promesa 
    //leer todos los regsitros desde la tabla de notas
    let { data, error } = await supabase
        .from('notes')
        .select('*');
    //si no hay datos retorna un arreglo vacío
    return data || [];
    //

}
export async function saveNote(note: Note): Promise<Note | null> {
    if (!note.id) {
        //crear nota sin ID, quita los objetos y los demas se quedan a noteData
        const { id, ...noteData } = note;

        const { data, error } = await supabase
            .from('notes')
            .insert([
                noteData,
                //{ some_column: 'someValue', other_column: 'otherValue' },
            ])
            .select();
        console.log(JSON.stringify(error));//para enviar a la consola a imprimir el error

        //si data no es un null, tomar el primer registro
        //o tomar null
        return data !== null ? data[0] : null;
    }
    else {
        //actualizar la nota 
        //update notes set title = 'aaa', description = 'aaa' where
        //id = 'aaaaa'
        const { data, error } = await supabase
            .from('notes')
            .update({
                tittle: note.tittle,
                description: note.description,
            })
            .eq('id', note.id)
            .select()
        //si data no es null, tomaqr el primer registro
        //o retornar null
        return data !== null ? data[0] : null;
    }
}
export async function deleteNote(note: Note): Promise<Note | null> {
//export function deleteNote (note: Note): Promise <Note | null>{
    const {data, error} = await supabase
    .from ('notes')
    .delete()
    .eq('id', note.id)
    .select();
    if (error){
        return null;
    }
    return data !== null? data [0]: null;
}