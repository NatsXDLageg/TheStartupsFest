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
    let startUp = startUpsList.allStartups[startUpIndex];
    let startUpName = startUp.name;
    let path = encodePath('ratings/' + startUpName + '/' + userToken);

    let ratingRef = database.ref(path);

    let rawRatings = startUp.ratings;
    let newRatings = {};
    if(rawRatings[RatingType.DEVELOPMENT] === null) {
        newRatings[RatingType.DEVELOPMENT] = null;
    }
    else {
        newRatings[RatingType.DEVELOPMENT] = parseInt(rawRatings[RatingType.DEVELOPMENT]);
    }
    if(rawRatings[RatingType.PITCH] === null) {
        newRatings[RatingType.PITCH] = null;
    }
    else {
        newRatings[RatingType.PITCH] = parseInt(rawRatings[RatingType.PITCH]);
    }
    if(rawRatings[RatingType.PROPOSAL] === null) {
        newRatings[RatingType.PROPOSAL] = null;
    }
    else {
        newRatings[RatingType.PROPOSAL] = parseInt(rawRatings[RatingType.PROPOSAL]);
    }
    startUpsList.loading = 1;
    ratingRef.set(newRatings)
        .then(function() {
            startUpsList.loading = 0;
            console.log('Synchronization succeeded');
        })
        .catch(function(error) {
            startUpsList.loading = 0;
            console.log('Synchronization failed');
        });
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
            }
            for (let property in RatingType) {
                if (RatingType.hasOwnProperty(property)) {
                    let propertyValue = RatingType[property];
                    if(typeof ratings[propertyValue] === 'undefined') {
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

function loadRatingPodium() {
    results.loading = 1;
    let ratingRef = database.ref('ratings');
    ratingRef.on('value', function (el) {
        if (el.val() !== null) {
            let registeredRatingsInfo = el.val();
            console.log('registeredRatingsInfo');
            console.log(registeredRatingsInfo);

            let startUpsInfo = results.allStartups;
            console.log('startUpsInfo');
            console.log(startUpsInfo);

            let startUpsWithoutRatings = [];

            //Have to iterate over 3 sets of objects: rating types, rating data from Firebase and data returned by Apollo
            for(let startUpInfo of startUpsInfo) {
                let startUp = {
                    imageUrl: startUpInfo.imageUrl,
                    name: startUpInfo.name,
                    segment: startUpInfo.Segment.name
                };
                startUpsWithoutRatings.push(startUp);
            }

            // For:
            //  Proposal
            //  Pitch
            //  Development
            for(let ratingTypeKey in RatingType) {
                if (RatingType.hasOwnProperty(ratingTypeKey)) {
                    let ratingTypeValue = RatingType[ratingTypeKey];
                    console.log(ratingTypeValue);

                    // For each startUp that have registered ratings
                    for(let registeredRatingKey in registeredRatingsInfo) {
                        let registeredRatingValue = registeredRatingsInfo[registeredRatingKey]
                        let startUp = startUpsWithoutRatings.find(x => encodePath(x.name) === registeredRatingKey);

                        if(startUp != null) {
                            startUp.rating = 0;
                            console.log('startUp');
                            console.log(startUp);
                            // For each user rating (for all startUps)
                            for(let registeredUserRatingKey in registeredRatingValue) {
                                let registeredUserRatingValue = registeredRatingValue[registeredUserRatingKey];
                                console.log('registeredUserRatingValue');
                                console.log(registeredUserRatingValue);
                                startUp.rating = startUp.rating + registeredUserRatingValue[ratingTypeValue];
                                console.log('startUp.rating');
                                console.log(startUp.rating);
                            }
                        }
                    }

                    // let newElement = {
                    //      imageUrl: 'https://www.eaalim.com/download/wp-content/uploads/2014/01/hellfire.jpg',
                    //      name: 'Nome da Startup',
                    //      segment: 'Ctgr',
                    //      rating: 5,
                    // };
                    // podiumStartups.push(newElement);

                    console.log(startUpsWithoutRatings);
                    // results.ratingTypes[property].podium = startUpsWithRatings;
                }
            }
        }

        results.loading = 0;
    });
}

function encodePath(path) {
    return encodeURI(path.replace(".", "_"));
}