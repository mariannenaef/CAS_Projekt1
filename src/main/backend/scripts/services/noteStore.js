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
        let notes =  await this.db.find({}, function(err, notes) {
            if(err){
                console.log(`ERROR finding all notes: ${err}`);
            };
        });
        console.log(`nodeStore, getAll(): ${notes.length} object(s)`);
        return notes;
    }

    async get(id) {
        return await this.db.find({_id: id}, function(err, docs) {
            if(err){
                console.log(`ERROR finding all notes: ${err}`);
            }
            else {
                console.log(`nodeStore, getById: ${docs.length()}`);
            }
        });
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
            {$set: {title: note.title, description: note.description, importance: note.importance, dueTo: note.dueTo}},
            {},
            function (err, numReplaced) {
                if(err){
                    console.log(`ERROR: ${err}`);
                }else{
                    console.log(`noteStore, updated: ${numReplaced} object(s)`);
                    return 200;
                };
            }
        );
    }


    async delete(id) {
        console.log(`nodeStore, delete following note: ${id}`);
        await this.db.remove(
            {_id: id},
            {},
            function (err, numDeleted) {
                if(err){
                    console.log(`ERROR: ${err}`);
                }
                else{
                    console.log(`deleted: ${numDeleted}`)
                }
            });
    };
}

export const noteStore = new NoteStore();