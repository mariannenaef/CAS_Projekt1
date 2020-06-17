import {noteStore} from '../services/nodeStore.js'

export class NotesController {

    async getNotes(req, res){
        console.log('notesController, getNotes');
        res.json((await noteStore.getAll() || []))
    };

    async getById(req, res){
        console.log('notesController, getById');
        res.json((await noteStore.get(req.param.id)));
    }

    async addNote(req, res){
        console.log('notesController, addNote: ' + req.body);
        res.json((await noteStore.add(req.body)));
    }

    async updateNote(req, res){
        console.log('notesController, updateNote');
        res.json((await noteStore.update(req.params)));
    }

    async deleteNote(req, res){
        console.log('notesController, deleteNote');
        res.json(await noteStore.delete(req.params.id));
    };

}

export const notesController = new NotesController();