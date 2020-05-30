

const container = document.getElementById("mainpage");
const notesEditTemplateSource = document.getElementById("editNotes-template").innerHTML;
const createNotesEditHtmlString = Handlebars.compile(notesEditTemplateSource);

function renderNotes(){
    container.innerHTML = createNotesEditHtmlString('');
}

function init() {
    renderNotes();
}