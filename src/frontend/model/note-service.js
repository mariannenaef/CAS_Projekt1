import {Note} from "./note.js";

export class NoteService{
    constructor() {
        this.notes = [];
    }

    addNote(note){
        const newNote = new Note(this.notes.length, note.title.value, note.description.value, note.importance.value);
        this.notes.push(newNote);
    }

    updateNote(note){
        this.notes[note.id.value].title = note.title.value;
        this.notes[note.id.value].description = note.description.value;
        this.notes[note.id.value].importance = note.importance.value;
    }

}