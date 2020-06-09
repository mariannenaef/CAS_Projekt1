//iterat over all silblings and get a classname
function changeClassToAllPreviousSiblings(child, classname) {
    while (child) {
        child.className = classname;
        child = child.previousElementSibling;
    }
}