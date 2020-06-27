import {Note} from "../model/note.js";
import {httpService} from "./http-service.js";

export class NoteService{
    constructor() {
        this.notes = [];
        this.filternotes = [];
    };

    async addNote(note){
        const importance = document.getElementById('importance').querySelectorAll('.important').length;
        const newNote = new Note(note.title.value, note.description.value, importance, note.dueTo.value, '', 'false');
        return await httpService.ajax("POST", "/notes/", newNote);
    };

    async updateNote(_id, note){

        let noteToUpdate = createNoteToUpdate(note, this.getNoteById(_id));
        await httpService.ajax("PUT", `/notes/${_id}`, noteToUpdate);
    };

     async getNotesToShow(){
        this.notes = await this.reloadeNotes();
        for(let i=0; this.notes.length>i; i++){
            this.notes[i].dueToText = getRelativeDateText(this.notes[i].dueTo, this.notes[i].isDone);
            this.notes[i].checked = isChecked(this.notes[i].isDone);
            this.notes[i].doneDateWrapped = doneDateWrapper(this.notes[i].doneDate);
        };
    };

    async reloadeNotes() {
        this.notes = await httpService.ajax("GET", "/notes/getNotes", undefined);
        return this.notes;
    };

    getFilteredNotes() {
        return this.filternotes;
    }


    getNoteById(_id){
        return this.notes.find(o => o._id === _id);
    };

    sortNotes(sortingRule){
        if(sortingRule === 'dueto'){
            this.filternotes.sort((a, b) => (a.dueTo > b.dueTo) ? 1 : (a.dueTo === b.dueTo) ? ((a.size > b.size) ? 1 : -1) : -1 )
        }else if(sortingRule === 'created'){
            this.filternotes.sort((a, b) => (a.createDate > b.createDate) ? 1 : (a.createDate === b.createDate) ? ((a.size > b.size) ? 1 : -1) : -1 )
        }else{
            this.filternotes.sort((a, b) => (a.importance < b.importance) ? 1 : (a.importance === b.importance) ? ((a.size < b.size) ? 1 : -1) : -1 )
        }
    };

    filterNotes(showDoneNotes){
        if(showDoneNotes === 'true'){
            this.filternotes = this.notes.filter(obj => obj.isDone === 'true');
            return this.filternotes;
        }else{
            this.filternotes = this.notes.filter(obj => obj.isDone === 'false');
            return this.filternotes;
        }
    };

}
