application.factory('ContactFactory', ['$http', 'FilterHandlerFactory', ($http, FilterHandlerFactory) => {
    const API_URL = 'http://localhost:3000/api/contacts'

    const $RESULTS = {
        limit: 100,
        count: 0,
        pages: 1,
        searchterm: ''
    }

    // Will hold the filters like page, letter, order by, etc..
    let $filters = {}

    /**
     * Used to update the results every time we call a new information from the server
     * @param results
     */
    function flush( results ) {
        $RESULTS.count = results.count
        $RESULTS.pages = Math.ceil( results.count / $RESULTS.limit )
    }

    return {
        results: function() {
            return $RESULTS
        },

        setFilters: function( filters ) {
            $filters = filters
            return this
        },

        fetchContacts: function() {
            // Build the query string for filters
            let queryString = FilterHandlerFactory.toQueryString( $filters )

            // Check if letter or all
            let uri = ''
            switch ( $filters.mode ) {
                case 'alphabet':
                    uri = `${API_URL}/letter/${$filters.letter}/?${queryString}`
                break

                case 'all':
                    uri = `${API_URL}/?${queryString}`
                break

                case 'search':
                    uri = `${API_URL}/search/${$filters.searchterm}/?${queryString}`
                break
            }

            return FilterHandlerFactory.pipeRequest( $http.get(uri), results => flush(results) )
        },

        // One single contact
        fetchOne: function( contact_id ) {
            return $http.get(API_URL + '/' + contact_id)
        },

        // Search results
        search: function( term, page = 1 ) {
            return FilterHandlerFactory.pipeRequest( $http.get(API_URL + '/search/' + term + '?page=' + page), results => {
                flush( results )
            })
        },

        create: function( contact ) {
            return FilterHandlerFactory.pipeRequest( $http({
                method: 'POST',
                url: API_URL + '/',
                data: JSON.stringify( contact ),
                headers: {'Content-Type': 'application/json'}
            }), contact_id => {
                flush({ count: $RESULTS.count + 1 })
            })
        },

        destroy: function( contact_id ) {
            return FilterHandlerFactory.pipeRequest( $http.delete(API_URL + '/' + contact_id), result => {
                flush({ count: $RESULTS.count - 1 })
            })
        },

        insights: function() {
            return $http.get(API_URL + '/insights')
        }
    }
}])