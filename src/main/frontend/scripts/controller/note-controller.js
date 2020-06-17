export class NoteController {
    constructor(noteService, ) {
        this.noteService = noteService;

        this.noteTemplateCompiled = Handlebars.compile(document.getElementById("notes-template").innerHTML);
        this.editNotesTemplateCompiled = Handlebars.compile(document.getElementById("editNotes-template").innerHTML);

        this.noteContainer = document.getElementById('notes');
        this.editNotesForm = document.getElementById('editNotesForm');
        this.btnNewNote = document.getElementById('btnNewNote');
        this.mainPage = document.getElementById('mainpage');

    }

    showNotes(){
        this.noteContainer.innerHTML =this.noteTemplateCompiled({notes: this.noteService.getNotesWithDateText()});
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
        document.getElementById('dueTo').setAttribute("min",new Date().toISOString().split("T")[0]);
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

        this.noteContainer.addEventListener( 'click', (event) =>{

            const isButton = (event.target.nodeName === 'BUTTON');
            if(!isButton){
                return;
            }
            this.formId = event.target.dataset.noteid;

            this.mainPage.style.display = 'none';
            this.editNotesForm.style.display = null;
            this.showEditNotes(this.noteService.getNoteById(this.formId));
            event.preventDefault();
        });

    }

    init(){
        this.initEventHandlers();
        this.showNotes();
    }


}

