export class Note{
    constructor(title, description, importance, dueto, doneDate, isDone) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueTo = dueto;
        this.doneDate = doneDate;
        this.isDone = isDone;
        this.createDate = getDateYearMonthDay(new Date());
    }

    toString(){
        return `Titel: ${this.title}, Beschreibung: ${this.description}, Wichtigkeit: ${this.importance}, Erledigen bis ${this.dueTo}, erledigt am: ${this.doneDate}, erstellt am: ${this.createDate}`;
    }
}

