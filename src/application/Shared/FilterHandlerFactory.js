application.factory('FilterHandlerFactory', ['$q', '_', ( $q, _ ) => {
    return {
        pipeRequest: function( request, fn ) {
            let deferred = $q.defer()

            request.then( response => {
                if ( response.status === 204 ) {
                    fn( null )
                    deferred.resolve( null )
                } else {
                    fn( response.data )
                    deferred.resolve( response.data )
                }
            })

            return deferred.promise
        },

        toQueryString: function( obj ) {
            return _.map(obj, (v, k) => {
                return encodeURIComponent(k) + '=' + encodeURIComponent(v)
            }).join('&')
        }
    }
}])