import {Note} from "./note.js";

export class NoteService{
    constructor() {
        this.notes = [];
    }

    addNote(note){
        const importance = document.getElementById('importance').querySelectorAll('.important').length;
        const newNote = new Note(this.notes.length, note.title.value, note.description.value, importance);
        this.notes.push(newNote);
    }

    updateNote(id, note){
        this.notes[id].title = note.title.value;
        this.notes[id].description = note.description.value;
        this.notes[id].importance = document.getElementById('importance').querySelectorAll('.important').length;
    }

}