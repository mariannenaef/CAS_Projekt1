export class EditNoteService{
    constructor(note){
        this.note = note;
    }

    getNote(){
        return this.note;
    }
}