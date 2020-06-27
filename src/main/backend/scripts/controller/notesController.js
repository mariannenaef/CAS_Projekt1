import {noteStore} from '../services/noteStore.js'

export class NotesController {

    async getNotes(req, res){
        res.json((await noteStore.getAll()))
    };

    async addNote(req, res){
        try {
            res.json((await noteStore.add(req.body)));
        }
        catch{
            res.status(500);
        }
        res.end();
    };

    async updateNote(req, res){
        try{
            await noteStore.update(req.body);
           res.status(200);
        }
        catch{
            res.status(500);
        }
        res.end();
    };
}

export const notesController = new NotesController();