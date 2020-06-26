import {Note} from "../model/note.js";
import {httpService} from "./http-service.js";

export class NoteService{
    constructor() {
        this.notes = [];
    }

    async addNote(note){
        const importance = document.getElementById('importance').querySelectorAll('.important').length;
        const newNote = new Note(note.title.value, note.description.value, importance, note.dueTo.value);
        return await httpService.ajax("POST", "/notes/", newNote);
    }

    async updateNote(_id, note){
        let noteToUpdate = this.getNoteById(_id);
        noteToUpdate.title = note.title.value;
        noteToUpdate.description = note.description.value;
        noteToUpdate.importance = document.getElementById('importance').querySelectorAll('.important').length;
        noteToUpdate.dueTo = note.dueTo.value;
        await httpService.ajax("PUT", `/notes/${_id}`, noteToUpdate);
    }

     async getNotesWithDateText(){
        this.notes = await this.getNotes();
        for(let i=0; this.notes.length>i; i++){
            this.notes[i].dueToText = getRelativeDateText(this.notes[i].dueTo);
        };
        return this.notes;
    }

    async getNotes() {
        this.notes = await httpService.ajax("GET", "/notes/getNotes", undefined);
        return this.notes;
    }

    getNoteById(_id){
        return this.notes.find(o => o._id === _id);
    }

}
