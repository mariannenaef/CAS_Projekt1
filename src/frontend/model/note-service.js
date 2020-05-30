import {Note} from "./note.js";

export class NoteService{
    constructor() {
        this.notes = [];
    }

    addNote(title, description, importance, dueTo){
        const note = new Note(title, description, importance, dueTo);
        this.notes.push(note);
        return this.notes;
    }

    getNotes(){
        return this.notes;
    }


}