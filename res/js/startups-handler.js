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