application.controller('ContactInfoController', ['$scope', '$routeParams', 'ContactFactory', '$location', ( $scope, $routeParams, ContactFactory, $location ) => {
    let contact_id = $routeParams.contact_id

    ContactFactory.fetchOne( contact_id ).then( contact => {
        $scope.currentContact = contact.data
    })

    // Remove contact from list
    $scope.removeContact = contact => {
        ContactFactory.destroy( contact.id ).then( contact_id => {
            let index = $scope.contacts.indexOf( contact )
            let letter = contact.firstname.substring(0,1)
            $scope.contacts.splice(index, 1)
            $scope.currentContact = {}
            $scope.setFilter(['searchterm'], [''])
            $location.path(`/alphabet/${$scope.filter.letter}`)
        })
    }
}])