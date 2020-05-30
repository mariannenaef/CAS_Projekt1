export class Note{
    constructor(title, description, importance, dueTo) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueTo = dueTo;
        this.doneDate;
    }


    done(){
        return !(typeof (this.doneDate) === 'undefined' || this.doneDate === null);
    }

    toString(){
        return `Titel: ${this.title}, Beschreibung: ${this.description}, Wichtigkeit: ${this.importance}, Erledigen bis ${this.dueTo}, ist erledigt: ${this.done()};`;
    }
}

