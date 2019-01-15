application.controller('PaginationController', ['$scope', '_', 'ContactFactory', ( $scope, _, ContactFactory ) => {
    // Get the results object from the factory
    $scope.results = ContactFactory.results()
    $scope.pages = []

    /**
     * Using this function in order to enable the ng-repeat (inside 'PaginationController') to iterate
     * through the pages
     * @param pages
     * @returns {Array}
     */
    $scope.getPages = pages => {
        return new Array( pages )
    }

    $scope.page = ( page ) => $scope.filter.page = page
}])