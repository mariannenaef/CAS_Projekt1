import {Note} from "../model/note.js";
import {httpService} from "./http-service.js";

export class NoteService{
    constructor() {
        this.notes = [];
    }

    async addNote(note){
        const importance = document.getElementById('importance').querySelectorAll('.important').length;
        let countNotes = 0;
        if(this.notes){
            countNotes = this.notes.length;
        }
        const newNote = new Note(countNotes, note.title.value, note.description.value, importance, note.dueTo.value);
        return await httpService.ajax("POST", "/notes/", JSON.stringify(newNote));
    }

    updateNote(id, note){
        this.notes[id].title = note.title.value;
        this.notes[id].description = note.description.value;
        this.notes[id].importance = document.getElementById('importance').querySelectorAll('.important').length;
    }

    async getNotesWithDateText(){
        this.notes = this.getNotes();
        for(let i=0; this.notes.length>i; i++){
            this.notes[i].dueToText = getRelativeDateText(this.notes[i].dueTo);
        }
        return this.notes;
    }

    async getNotes() {
        let noteList = await httpService.ajax("GET", "/notes/getNotes", undefined);
        this.notes = noteList;
        return this.notes;
    }

    getNoteById(id){
        return this.notes[id];
    }

}