export class Note{
    constructor(id, title, description, importance) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueTo = '';
        this.doneDate;
    }


    done(){
        return !(typeof (this.doneDate) === 'undefined' || this.doneDate === null);
    }

    toString(){
        return `Titel: ${this.title}, Beschreibung: ${this.description}, Wichtigkeit: ${this.importance}, Erledigen bis ${this.dueTo}, ist erledigt: ${this.done()};`;
    }
}

