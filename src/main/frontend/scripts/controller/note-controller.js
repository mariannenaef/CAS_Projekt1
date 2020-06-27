export class NoteController {
    constructor(noteService, ) {
        this.noteService = noteService;

        this.noteTemplateCompiled = Handlebars.compile(document.getElementById("notes-template").innerHTML);
        this.editNotesTemplateCompiled = Handlebars.compile(document.getElementById("editNotes-template").innerHTML);

        this.noteContainer = document.getElementById('notes');
        this.editNotesForm = document.getElementById('editNotesForm');
        this.mainPage = document.getElementById('mainpage');
        this.cssSelector = document.getElementById('cssSelector');
        this.cssStylesheet = document.getElementById('cssStylesheet');

        // buttons
        this.btnNewNote = document.getElementById('btnNewNote');
        this.btnsSort = document.querySelectorAll('button[data-btnsort]');
        this.btnFilter = document.querySelector('button[data-btnfilter]');

        this.sortingRule = 'importance';
        this.showDoneNotes = 'false';

    }

    showNotes(){
        this.filterDoneNotes(this.showDoneNotes);
        this.sortNotes(this.sortingRule);
        this.noteContainer.innerHTML = this.noteTemplateCompiled({notes: this.noteService.getFilteredNotes()});
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

    async getDBNotes(){
        return await this.noteService.getNotesToShow();
    }

    showEditNotes(note){
        this.editNotesForm.innerHTML = this.editNotesTemplateCompiled({editNote: note});
        document.getElementById('dueTo').setAttribute("min",new Date().toISOString().split("T")[0]);
        if(note && note.importance>0){
            const childrenImportance = document.getElementById('importance').children;
            changeClassToAllPreviousSiblings(childrenImportance.item(note.importance-1), 'important');
        }
    }

    async saveNote(note){
        await this.noteService.addNote(note);
    }

    updateNote(_id, note){
        this.noteService.updateNote(_id, note);
    }

    sortNotes(sortingRule){
        this.noteService.sortNotes(sortingRule);
    }

    filterDoneNotes(){
        return this.noteService.filterNotes(this.showDoneNotes);
    }


    initEventHandlers() {

        this.btnNewNote.addEventListener('click', (event) => {
            this.mainPage.style.display = 'none';
            this.editNotesForm.style.display = null;
            this.showEditNotes();
        });

        this.cssSelector.addEventListener('click',  (event) =>{
            if(event.target.value === 'dark'){
                this.cssStylesheet.href = 'css/stylesheet_dark.css';
            }else{
                this.cssStylesheet.href = 'css/stylesheet.css';
            }
        });

        this.btnsSort.forEach(item => {
            item.addEventListener('click', (event) => {
                this.sortingRule = event.target.dataset.btnsort;
                this.showNotes();
                event.preventDefault();
            });
        });

        this.btnFilter.addEventListener('click', (event) =>{
            if(this.showDoneNotes === 'true'){
                this.showDoneNotes = 'false';
                this.btnFilter.innerText = 'Erledigte';
            }
            else {
                this.showDoneNotes = 'true';
                this.btnFilter.innerText = 'Offene';
            }
            this.showNotes();
        })

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

        this.editNotesForm.addEventListener( 'submit', async event =>{
            const createAction = document.activeElement.dataset.action;
            const noteId = document.activeElement.dataset.noteid;

           if(createAction === 'save' && noteId){
              await this.updateNote(noteId, this.editNotesForm.elements);
           }else if(createAction === 'save'){
              await this.saveNote(this.editNotesForm.elements);
           }

            this.editNotesForm.style.display = 'none';
            this.mainPage.style.display = null;

            this.getDBNotes().then( () => {
                this.showNotes();
            });

            event.preventDefault();
        });

        this.noteContainer.addEventListener( 'click', (event) =>{

            this.formId = event.target.dataset.noteid;
            let note = this.noteService.getNoteById(this.formId)

            const nodeName = event.target.nodeName;
            if(nodeName === 'BUTTON'){
                this.mainPage.style.display = 'none';
                this.editNotesForm.style.display = null;
                this.showEditNotes(note);
            }else if(nodeName === 'INPUT'){
                if(note.isDone === 'true'){
                    note.isDone = 'false';
                    note.doneDate = '';
                }else{
                    note.doneDate = new Date().toLocaleDateString('de-CH');
                    note.isDone = 'true';
                }
                this.updateNote(this.formId, note);
                this.getDBNotes().then( () => {
                    this.showNotes();
                });
            }else{
                return;
            }

            event.preventDefault();
        });

    }

    init(){
        this.initEventHandlers();
        this.getDBNotes().then( () => {
            this.showNotes();
        });
    }


}

