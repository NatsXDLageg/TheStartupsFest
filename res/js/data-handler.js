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

function registerRating(userToken, startUpName, type, rating) {
    let ratingRef = database.ref('ratings/' + startUpName + '/' + type);
    ratingRef.on('value', function(el) {
        console.log(ratingRef);
        console.log(el.val());
    });
    // ref.push({
    //     username: name,
    //     email: email,
    //     profile_picture : imageUrl
    // });
}

function loadPreviousRatings(userToken, startUpIndex) {
    // let startUpName = startUp.name;
    let startUpName = startupsList.allStartups[startUpIndex].name;

    //For each rating type
    // for (var property in RatingType) {
    //     if (RatingType.hasOwnProperty(property)) {
    //         let ratingRef = database.ref('ratings/' + startUpName + '/' + userToken);
    //         ratingRef.on('value', function(el) {
    //             console.log(ratingRef);
    //             console.log(el.val());
    //         });
    //     }
    // }

    let ratingRef = database.ref('ratings/' + startUpName + '/' + userToken);
    ratingRef.on('value', function(el) {
        let ratings;
        if(el.val() !== null) {
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
        //TODO: Attempt to create array in Vue root
        console.log(ratings);
        // startUp['ratings'] = ratings;
        // Vue.set(startUp, 'ratings', )
        Vue.set(startupsList.allStartups[startUpIndex], 'ratings', ratings);
        // console.log(startUp);


        // startupsList.selected = startUp;
        return ratings;
    });
}