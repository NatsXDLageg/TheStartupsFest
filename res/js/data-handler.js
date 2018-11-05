// Initialize Firebase
var config = {
    apiKey: "AIzaSyCmfqNMnReWrZ8NapP3YF8S2Q4FtI9wWFc",
    authDomain: "thestartupfest-ca1d6.firebaseapp.com",
    databaseURL: "https://thestartupfest-ca1d6.firebaseio.com",
    projectId: "thestartupfest-ca1d6",
    storageBucket: "thestartupfest-ca1d6.appspot.com",
    messagingSenderId: "724710167822"
};
firebase.initializeApp(config);
var database = firebase.database();

var RatingType = {
    PROPOSAL: 'proposal',
    PITCH: 'pitch',
    DEVELOPMENT: 'development'
}
Object.freeze(RatingType);

function newGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function registerRating(userToken, startUpIndex) {
    let startUpName = startUpsList.allStartups[startUpIndex].name;

    let ratingRef = database.ref(encodePath('ratings/' + startUpName + '/' + userToken));
    console.log(ratingRef);

    let newValue = startUpsList[startUpIndex].ratings;
    console.log(newValue);
    // ratingRef.on('value', function(el) {
    //     console.log(ratingRef);
    //     console.log(el.val());
    // });
    // ref.push({
    //     username: name,
    //     email: email,
    //     profile_picture : imageUrl
    // });
}

function loadPreviousRatings(userToken, startUpIndex) {
    //If it is needed to retrieve previous ratings for the chosen StartUp
    if((typeof startUpsList.allStartups[startUpIndex].ratings) === 'undefined') {
        let startUpName = startUpsList.allStartups[startUpIndex].name;

        startUpsList.loading = 1;

        let ratingRef = database.ref(encodePath('ratings/' + startUpName + '/' + userToken));
        ratingRef.on('value', function (el) {
            let ratings;
            if (el.val() !== null) {
                ratings = el.val();
            }
            else {
                ratings = {};
                for (var property in RatingType) {
                    if (RatingType.hasOwnProperty(property)) {
                        let propertyValue = RatingType[property];
                        ratings[propertyValue] = null;
                    }
                }
            }
            let startUpsListCopy = startUpsList.allStartups.slice().map((row, i) => {
                if (i === startUpIndex) {
                    return {
                        ...row,
                        ratings: ratings
                    };
                }
                else {
                    return {
                        ...row
                    }
                }
            });
            startUpsList.allStartups = startUpsListCopy;
            startUpsList.selected = startUpIndex;
            startUpsList.loading = 0;
        });
    }
    //If the ratings were previously loaded
    else {
        startUpsList.selected = startUpIndex;
    }
}

function encodePath(path) {
    return encodeURI(path.replace(".", "_"));
}