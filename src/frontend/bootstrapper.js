import {NoteService} from "./model/note-service.js";
import {NoteController} from "./controller/note-controller.js";
import {EditNoteService} from "./model/edit-note-service.js";

class Bootstrapper{
    static start() {
        const noteService = new NoteService();
        const editNoteService = new EditNoteService();
        new NoteController(noteService, editNoteService).init();
    }
}

document.addEventListener('DOMContentLoaded', Bootstrapper.start);