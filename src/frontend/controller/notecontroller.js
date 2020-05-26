

// // create new note
// const newNotescontainer = document.querySelector('form');
// const btnNewNote = document.querySelector("#btnNewNote");
// const newNoteEventListener = () => {
//
// }
// btnNewNote.addEventListener('click', newNoteEventListener);
//

const container = document.getElementById("container");
const notesTemplateSource = document.getElementById("notes-template").innerHTML;
const createNotesHtmlString = Handlebars.compile(notesTemplateSource);

function renderNotes(){
    container.innerHTML = createNotesHtmlString(getNotes);
}

function init() {
    renderNotes();
}


init();