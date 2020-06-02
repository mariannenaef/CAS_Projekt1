export class NoteController {
    constructor(noteService, editNoteService) {
        this.noteService = noteService;
        this.editNoteService = editNoteService;

        this.noteTemplateCompiled = Handlebars.compile(document.getElementById("notes-template").innerHTML);
        this.editNotesTemplateCompiled = Handlebars.compile(document.getElementById("editNotes-template").innerHTML);

        this.noteContainer = document.getElementById('notes');
        this.editNotesForm = document.getElementById('editNotesForm');
        this.editBtn = document.getElementById('btnNewNote');
        this.mainPage = document.getElementById('mainpage');

        this.editNotesDiv = document.getElementById('editNotes');


    }

    showNotes(){
        this.noteContainer.innerHTML =this.noteTemplateCompiled({notes: this.noteService.notes});
    }

    showEditNotes(note){
        this.editNotesDiv.innerHTML = this.editNotesTemplateCompiled({editNotes: this.editNoteService.note});
    }

    saveNote(note){
        this.noteService.addNote(note);
    }

    updateNote(note){
        this.noteService.updateNote(note);
    }

    initEventHandlers() {

        this.editBtn.addEventListener('click', (event) => {
            this.mainPage.style.display = 'none';
            this.editNotesDiv.style.display = null;
            this.showEditNotes();
        });

        this.editNotesForm.addEventListener( 'submit', (event) =>{
            const createAction = document.activeElement.dataset.action;

           if(createAction === 'save' && this.editNotesForm.elements.id){
               this.updateNote(this.editNotesDiv.elements);
           }else if(createAction === 'save'){
               this.saveNote(this.editNotesForm.elements);
           }

            this.editNotesDiv.style.display = 'none';
            this.mainPage.style.display = null;

            this.showNotes();

            event.preventDefault();
        });

        this.noteContainer.addEventListener( 'submit', (event) =>{

            this.mainPage.style.display = 'none';
            this.editNotesDiv.style.display = null;
            this.showEditNotes(this.editNotesDiv.elements);
        });

    }

    init(){
        this.initEventHandlers();
        this.showNotes();
    }


}

