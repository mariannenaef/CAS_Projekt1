
export class NoteController {
    constructor(noteService, editNoteService) {
        this.noteService = noteService;
        this.editNoteService = editNoteService;

        this.noteTemplateCompiled = Handlebars.compile(document.getElementById("notes-template").innerHTML);
        this.editNotesTemplateCompiled = Handlebars.compile(document.getElementById("editNotes-template").innerHTML);


        this.noteContainer = document.getElementById('notes');
        this.editNotesForm = document.getElementById('editNotesForm');
        this.btnNewNote = document.getElementById('btnNewNote');
        this.mainPage = document.getElementById('mainpage');

    }

    showNotes(){
        this.noteContainer.innerHTML =this.noteTemplateCompiled({notes: this.noteService.notes});

        if(this.noteService.notes.length > 0){
            this.divImportance = document.querySelectorAll('div[data-showImportance]');
            for (let div of this.divImportance){
                const importance = div.attributes['data-showimportance'].value;
                for(let i=0; importance > i; i++){
                    const para = document.createElement("p");
                    para.className = 'important';
                    const symbol = document.createTextNode('♧');
                    para.appendChild(symbol);
                    div.appendChild(para);
                }
            }
        }

    }

    showEditNotes(note){
        this.editNotesForm.innerHTML = this.editNotesTemplateCompiled({editNote: note});
        if(note && note.importance>0){
            const childrenImportance = document.getElementById('importance').children;
            changeClassToAllPreviousSiblings(childrenImportance.item(note.importance-1), 'important');
        }
    }

    saveNote(note){
        this.noteService.addNote(note);
    }

    updateNote(id, note){
        this.noteService.updateNote(id, note);
    }

    getNoteInformation(id){
        this.noteObject = {
            id: id,
            title: document.getElementById('title'+id).innerHTML,
            description: document.getElementById('description'+id).innerHTML,
            importance: document.getElementById('importance'+id).getAttribute('data-showimportance'),
        }
        return this.editNoteService.fillNote(this.noteObject);
    }

    initEventHandlers() {

        this.btnNewNote.addEventListener('click', (event) => {
            this.mainPage.style.display = 'none';
            this.editNotesForm.style.display = null;
            this.showEditNotes();
        });

        this.editNotesForm.addEventListener('click', (event) => {
            let activeElement = event.target;
            if(activeElement.innerText != "♧"){
                return;
            }
            let lastChild = activeElement.parentNode.lastChild;
            changeClassToAllPreviousSiblings(lastChild, 'notImportant');
            changeClassToAllPreviousSiblings(activeElement, 'important');
            event.preventDefault();
        });

        this.editNotesForm.addEventListener( 'submit', (event) =>{
            const createAction = document.activeElement.dataset.action;
            const noteId = document.activeElement.dataset.noteid;

           if(createAction === 'save' && noteId){
               this.updateNote(noteId, this.editNotesForm.elements);
           }else if(createAction === 'save'){
               this.saveNote(this.editNotesForm.elements);
           }

            this.editNotesForm.style.display = 'none';
            this.mainPage.style.display = null;

            this.showNotes();

            event.preventDefault();
        });

        this.noteContainer.addEventListener( 'submit', (event) =>{

            this.formId = event.target.dataset.noteid;

            this.mainPage.style.display = 'none';
            this.editNotesForm.style.display = null;
            this.note = this.getNoteInformation(this.formId);
            this.showEditNotes(this.note);
            event.preventDefault();
        });

    }

    init(){
        this.initEventHandlers();
        this.showNotes();
    }


}

