const notes = [];

class note{
    constructor(title) {
        this.title = title;
        this.description;
        this.importance;
        this.dueTo;
        this.doneDate;
    }

    getTitle(){
        return this.title;
    };

    getDescritpion() {
        return this.description;
    }

    getImportance(){
        return this.importance();
    }

    getDueTo(){
        return this.dueTo;
    }

    done(){
        return !(typeof (this.doneDate) === 'undefined' || this.doneDate === null);
    }

    toString(){
        return `Titel: ${this.title}, Beschreibung: ${this.description}, Wichtigkeit: ${this.importance}, Erledigen bis ${this.dueTo}, ist erledigt: ${this.done()};`;
    }
}

const firstNote = new note('Einkaufen');
firstNote.description = 'Eier, Tee und Milch';
firstNote.importance = 'wichtig';
firstNote.dueTo = new Date('23.05.2020');
notes.push(firstNote);

console.log(notes[0].toString());

function getNotes(){
    return notes;
}