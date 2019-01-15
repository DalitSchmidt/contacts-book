application.controller('MainController', ['$scope', '$location', '$route', '$routeParams', 'ContactFactory', ( $scope, $location, $route, $routeParams, ContactFactory ) => {
    $scope.letterArray = []
    $scope.contacts = []
    $scope.ready = false

    // Will hold the page number and current letter
    $scope.filter = {
        page: 1,
        letter: 'A',
        order: 'asc',
        mode: 'all',
        by: 'firstname',
        searchterm: null
    }

    // Have to fill in the array with the english alphabet
    for ( let i = 0; i < 26; i++ )
        $scope.letterArray.push( String.fromCharCode(65 + i) )

    // Insert it to the filter of the results
    $scope.setContactsList = function() {
        ContactFactory.setFilters( $scope.filter ).fetchContacts().then( contacts => $scope.contacts = contacts.contacts )
    }

    // Setting new filters
    $scope.setFilter = function( names, values ) {
        angular.forEach(names, (name, index) => $scope.filter[ name ] = values[ index ])
    }

    /**
     * Watch Collection function for the filter properties
     * Each time the filters is being updated we are firing new request
     */
    $scope.$watchCollection('filter', ( newValue, oldValue ) => {
        $scope.setContactsList()
    })

    // When route changes, fire the functions we need
    $scope.$on('$routeChangeStart', ( next, current ) => {
        // No other routes other than /<LETTER>/PAGE
        let path = $location.path()
        let isAlphabet = /^\/alphabet\/[A-Z]/.test( path )

        if ( isAlphabet === true || /^\/all/.test( path ) === true ) {
            /**
             * If the user came from outside the application (http://localhost:3000/#/alphabet/C/4) for example
             * change the mode to be 'alphabet' cause the default is 'all'
             */
            if ( isAlphabet )
                $scope.setFilter(['mode', 'letter', 'page'], ['alphabet', current.pathParams.letter || 'A', current.pathParams.page || 1])
            else
                $scope.setFilter(['mode'], ['all'])
        }
    })

    // Wait till document is ready to remove loader
    angular.element(document).ready(() => $scope.ready = true)
    $scope.$watch('ready', ( newValue, oldValue ) => angular.element( document.getElementById('main') ).removeClass('loading'))
}])