application.controller('AddContactController', ['$scope', '$location', 'ContactFactory', ( $scope, $location, ContactFactory ) => {
    $scope.proccessing = false
    $scope.path = $location.path()

    $scope.addContact = () => {
        let contactDetails = $scope.currentContact
        $scope.proccessing = true

        ContactFactory.create( contactDetails ).then( contact => {
            $scope.proccessing = false
            let letter = $scope.currentContact.firstname.substring(0,1)

            let contact_id = $scope.currentContact.id = contact.contact_id
            $scope.contacts.push( $scope.currentContact )
            $scope.currentContact = {}

            $scope.setFilter(['mode', 'letter'], ['alphabet', letter])
            $location.path(`info/${contact_id}`)
        })
    }

    $scope.submitForm = function( event, isValid ) {
        event.preventDefault()
        if ( isValid )
            $scope.addContact()

        return false
    }
}])