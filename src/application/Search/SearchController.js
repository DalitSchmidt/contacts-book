application.controller('SearchController', ['$scope', '$location', ( $scope, $location ) => {
    $scope.$watch('filter.searchterm', ( newVal, oldVal ) => {
        if ( oldVal == null && newVal == null )
            return

        if ( newVal.length < 2 ) {
            // When user deleted ALL the input, reset search
            if ( newVal.length === 0 )
                $scope.setFilter(['mode', 'page'], ['all', 1])

            return
        }

        $scope.filter.mode = 'search'
    })

    $scope.reset = function() {
        console.log('reset')
        $scope.setFilter(['mode', 'page'], ['all', 1])
    }
}])