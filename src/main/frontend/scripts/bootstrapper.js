import {NoteService} from "./services/note-service.js";
import {NoteController} from "./controller/note-controller.js";

class Bootstrapper{
    static start() {
        const noteService = new NoteService();
        new NoteController(noteService).init();
    }
}

document.addEventListener('DOMContentLoaded', Bootstrapper.start);