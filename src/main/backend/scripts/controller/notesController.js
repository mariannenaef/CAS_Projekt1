import {noteStore} from '../services/noteStore.js'

export class NotesController {

    async getNotes(req, res){
        console.log('notesController, getNotes');
        res.json((await noteStore.getAll()))
    };

    async getById(req, res){
        console.log(`notesController, getById`);
        res.json((await noteStore.get(req.param.id)));
    }

    async addNote(req, res){
        console.log(`notesController, addNote: title: ${req.body.title}`);
        res.json((await noteStore.add(req.body)));
    }

    async updateNote(req, res){
        console.log(`notesController, updateNote: title: ${req.body.title}, id: ${req.body._id}`);
        if(await noteStore.update(req.body) == 200){
            console.log(`noteController, update was successful`);
            res.json('update was succussful');
        }else{
            console.log(`noteController, update was NOT successful`);
            res.json('update was NOT successful');
        }

    }

    async deleteNote(req, res){
        console.log(`notesController, deleteNote: title: ${req.body.title}, id: ${req.body._id}`);
        res.json(await noteStore.delete(req.params));
    };

}

export const notesController = new NotesController();