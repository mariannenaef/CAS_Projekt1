import Datastore from 'nedb-promise'

export class Note {
    constructor(id, title, description, importance, dueto, doneDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueTo = dueto;
        this.doneDate = doneDate;
    }
}

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
        this.db.loadDatabase();
    };

    async getAll() {
        let notes = await this.db.find({}, function(err, docs) {
            console.log(docs);
        });
        console.log('nodeStore, getAll: ' + notes.toString());
        return notes;
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    };

    async add(note) {
        let newNote = new Note(note.id, note.title, note.description, note.importance, note.dueTo);
        console.log('nodeStore, add following note: ' + newNote.toString());
        return await this.db.insert(note).then(doc => {
            console.log('Inserted', doc.name, 'with ID', doc._id);
            return doc;
        });
        // return await this.db.insert(note, function(err, doc) {
        //     console.log('Inserted', doc.name, 'with ID', doc._id)
        // });
    };

    async update(note){
        return await this.db.update(note);
    }


    async delete(id) {
        await this.db.delete({_id: id});
    };
}

export const noteStore = new NoteStore();