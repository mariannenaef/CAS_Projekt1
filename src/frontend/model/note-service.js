import {Note} from "./note.js";

export class NoteService{
    constructor() {
        this.notes = [];
    }

    addNote(note){
        const newNote = new Note(note.title.value, note.description.value, note.importance.value);
        this.notes.push(newNote);
    }

    getNotes(){
        return this.notes;
    }


}