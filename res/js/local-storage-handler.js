const userGuidCookieName = 'userGuid';
var userGuid;

function onDocumentReadyLocalStorageInit() {
    if (typeof(Storage) !== "undefined") {
        userGuid = window.localStorage.getItem(userGuidCookieName);
        if(userGuid === null) {
            userGuid = newGuid();
            window.localStorage.setItem(userGuidCookieName, userGuid);
        }
    } else {
        // No Web Storage support
    }
    console.log(userGuid);
}