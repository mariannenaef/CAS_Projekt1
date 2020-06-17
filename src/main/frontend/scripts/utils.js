//iterat over all silblings and get a classname
function changeClassToAllPreviousSiblings(child, classname) {
    while (child) {
        child.className = classname;
        child = child.previousElementSibling;
    }
}

function getRelativeDateText(date) {
    let today = setZeroTimeToDate(new Date());
    let dateFormatted = setZeroTimeToDate(new Date(date));
    const dayInMilSec = 1000*60*60*24;
    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    let relativeDateText = '';
    if(today > dateFormatted){
        relativeDateText = 'zu spät!';
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
    }else {
        relativeDateText= days[new Date(date).getDay()] + ' in einer Woche';
    }
    return relativeDateText;
}

function setZeroTimeToDate(date){
    return date.setHours(0,0,0,0);

}