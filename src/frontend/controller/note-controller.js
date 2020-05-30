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

        this.formContainer = document.getElementsByName('form');


    }

    showNotes(){
        this.noteContainer.innerHTML =this.noteTemplateCompiled({notes: this.noteService.notes});
    }

    showEditNotes(){
        this.editNotesContainer.innerHTML = this.editNotesTemplateCompiled({editNotes: this.editNoteService.note});
    }

    initEventHandlers() {

        this.editBtn.addEventListener('click', (event) => {
            this.mainPage.style.display = 'none';
            this.showEditNotes();
        });

        this.formContainer.addEventListener( 'click', (event) =>{
           this.mainPage.style.display = 'block';
           this.formContainer.style.display = 'none';
        });

    }

    init(){
        this.initEventHandlers();
        this.showNotes();
    }


}

