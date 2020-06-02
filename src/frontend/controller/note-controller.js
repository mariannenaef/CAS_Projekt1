export class NoteController {
    constructor(noteService, editNoteService) {
        this.noteService = noteService;
        this.editNoteService = editNoteService;

        this.noteTemplateCompiled = Handlebars.compile(document.getElementById("notes-template").innerHTML);
        this.editNotesTemplateCompiled = Handlebars.compile(document.getElementById("editNotes-template").innerHTML);

        this.noteContainer = document.getElementById('notes');
        this.editNotesContainer = document.getElementById('editNotes');
        this.editBtn = document.getElementById('btnNewNote');
        this.mainPage = document.getElementById('mainpage');

        this.formContainer = document.getElementById('editNotes');


    }

    showNotes(){
        this.noteContainer.innerHTML =this.noteTemplateCompiled({notes: this.noteService.notes});
    }

    showEditNotes(){
        this.editNotesContainer.innerHTML = this.editNotesTemplateCompiled({editNotes: this.editNoteService.note});
    }

    saveNote(note){
        this.noteService.addNote(note);
    }

    initEventHandlers() {

        this.editBtn.addEventListener('click', (event) => {
            this.mainPage.style.display = 'none';
            this.formContainer.style.display = null;
            this.showEditNotes();
        });

        this.formContainer.addEventListener( 'submit', (event) =>{
            const createAction = document.activeElement.dataset.action;

           if(createAction === 'save'){
                this.saveNote(this.editNotesContainer.elements);
           }

            this.formContainer.style.display = 'none';
            this.mainPage.style.display = null;

            this.showNotes();

            event.preventDefault();
        });

    }

    init(){
        this.initEventHandlers();
        this.showNotes();
    }


}

