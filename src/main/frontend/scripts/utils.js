//iterat over all silblings and get a classname
function changeClassToAllPreviousSiblings(child, classname) {
    while (child) {
        child.className = classname;
        child = child.previousElementSibling;
    }
}

function getRelativeDateText(date, isDone) {
    let today = setZeroTimeToDate(new Date());
    let dateFormatted = setZeroTimeToDate(new Date(date));
    const dayInMilSec = 1000*60*60*24;
    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    let relativeDateText = 'kein Datum definiert';
    if(isDone === 'true'){
        return new Date(date).toLocaleDateString('de-CH');
    };
    if(today > dateFormatted){
        relativeDateText = `zu spät! (${new Date(date).toLocaleDateString('de-CH')})`;
    }
    else if(today === dateFormatted){
        relativeDateText = 'heute';
    }
    else if(dateFormatted-today > 14 * dayInMilSec){
        relativeDateText = 'irgendwann';
    }
    else if(dateFormatted-today === dayInMilSec){
        relativeDateText = 'morgen';
    }
    else if(dateFormatted-today === 7 * dayInMilSec){
        relativeDateText = 'heute in einer Woche';
    }
    else if(dateFormatted-today === 2 * dayInMilSec){
        relativeDateText = 'übermorgen';
    }
    else if (dateFormatted-today < 7* dayInMilSec) {
        relativeDateText = 'nächsten ' + days[new Date(date).getDay()];
    }else if (dateFormatted-today < 14 * dayInMilSec) {
        relativeDateText= days[new Date(date).getDay()] + ' in einer Woche';
    };
    return relativeDateText;
}

function setZeroTimeToDate(date){
    return date.setHours(0,0,0,0);
}

function isChecked(isChecked) {
    if(isChecked === 'true'){
        return 'checked';
    }else{
        return 'unchecked';
    }
}

function doneDateWrapper(doneDate) {
    if(doneDate && doneDate != ''){
        return `[${doneDate}]`;
    }
}

function getDateYearMonthDay(date) {
    const year = date.getFullYear();
    let month = date.getMonth()+1;
    const day = date.getDate();
    return (`${year}-${month}-${day}`);
}

function createNoteToUpdate(newNote, oldNote) {
    let noteToUpdate = oldNote;
    if(typeof newNote.title === 'object'){
        noteToUpdate.title = newNote.title.value;
        noteToUpdate.description = newNote.description.value;
        noteToUpdate.importance = document.getElementById('importance').querySelectorAll('.important').length;
        noteToUpdate.dueTo = newNote.dueTo.value;
        noteToUpdate.isDone = oldNote.isDone;
        noteToUpdate.doneDate = oldNote.doneDate;
    }else{
        noteToUpdate.title = oldNote.title;
        noteToUpdate.description = oldNote.description;
        noteToUpdate.importance = oldNote.importance;
        noteToUpdate.dueTo = oldNote.dueTo;
        noteToUpdate.isDone = newNote.isDone;
        noteToUpdate.doneDate = newNote.doneDate;
    }
    return noteToUpdate;
}