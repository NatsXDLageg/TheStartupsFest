const apolloClient = new Apollo.lib.ApolloClient({
    networkInterface: Apollo.lib.createNetworkInterface({
        uri: 'https://startups-project-mytvsxrgeb.now.sh',
        transportBatching: true
    }),
    connectToDevTools: true,
})

const apolloProvider = new VueApollo.ApolloProvider({
    defaultClient: apolloClient,
})

var startUpsList = new Vue({
    el: '#startups-list',
    data: {
        allStartups: [],
        loading: 0,
        selected: null
    },
    apolloProvider,
    apollo: {
        allStartups: {
            query: Apollo.gql`{
                        allStartups {
                            name
                            teamCount
                            description
                            imageUrl
                            annualReceipt
                            Segment {
                                name
                                code
                            }
                        }
                    }`,
            loadingKey: 'loading',
        },
    },
    // I don't know if these lines are needed, as I think the classifications will be loaded after the user clicks on a StartUp

    // watch: {
    //     //When loading turns 0, it means the page finished loading from api
    //     'loading': function(val, oldVal){
    //         if(!val) {
    //
    //         }
    //     }
    // },
    // watch: {
    //     'selected': function(val, oldVal){
    //         //Whenever a StartUp is chosen, loads previous ratings for this StartUp
    //         loadPreviousRatings(userGuid, val);
    //     }
    // },
    methods: {
        onItemClick: function(index) {
            loadPreviousRatings(userGuid, index);
        },
        hideItemDetails: function() {
            this.selected = null;
        },
        onDetailsScreenClick: function() {
            event.stopPropagation();
        },
        onRatingChange: function(index, type, value) {
            this.allStartups[index].ratings[type] = value;
            registerRating(userGuid, index);
        }
    }
});