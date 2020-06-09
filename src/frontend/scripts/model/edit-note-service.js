import {Note} from "./note.js";

export class EditNoteService{
    constructor(){
        this.note = '';
    }

    fillNote(noteObject){
        this.note = new Note(noteObject.id, noteObject.title, noteObject.description, noteObject.importance);
        return this.note;
    }

    getNote(){
        return this.note;
    }
}