import Datastore from 'nedb-promise'

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
        this.db.loadDatabase();
    };

    async getAll() {
        let notes =  await this.db.find({}, function(err, notes) {
            if(err){
                console.log(`ERROR finding all notes: ${err}`);
            };
        });
        console.log(`nodeStore, getAll(): ${notes.length} object(s)`);
        return notes;
    };

    async add(note) {
        await this.db.insert(note).then(doc => {
            console.log(`noteStore, inserted: ${doc.title}, with ID: ${doc._id}`);
            return doc;
        });
    };

    update(note){
        return this.db.update(
            {_id: note._id},
            {$set: {title: note.title, description: note.description, importance: note.importance, dueTo: note.dueTo, isDone: note.isDone, doneDate: note.doneDate}},
            {}
        ).then( numReplaced=> {
            console.log(`noteStore, updated: ${numReplaced} object(s)`);
        }).catch( () => {
            console.log(`ERROR: ${err}`);
        });
    }
}

export const noteStore = new NoteStore();