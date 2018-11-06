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

var results = new Vue({
    el: '#results',
    data: {
        allStartups: [],
        loading: 0,
        ratingTypes: {
            PROPOSAL: {
                name: 'Proposta',
                podium: [
                    // {
                    //      imageUrl: '',
                    //      name: '',
                    //      segment: '',
                    //      rating: '',
                    // }
                ]
            },
            PITCH: {
                name: 'Apresentação',
                podium: []
            },
            DEVELOPMENT: {
                name: 'Desenvolvimento',
                podium: []
            }
        }
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
    watch: {
        'allStartups': function(val, oldVal){
            if(val) {
                loadRatingPodium();
            }
        }
    }
})