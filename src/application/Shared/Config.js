application.config(function( $routeProvider ) {
    $routeProvider
    .when('/add', {
        templateUrl: './application/Contact/Add/_add-contact.html',
        controller: 'AddContactController',
    })
    .when('/insights', {
        templateUrl: './application/Insights/_insights.html',
        controller: 'InsightsController',
    })
    .when('/info/:contact_id', {
        templateUrl: './application/Contact/_contact.html',
        controller: 'ContactInfoController',
    })
    .when('/all', {
        templateUrl: './application/Shared/_home.html',
    })
    .when('/alphabet/:letter', {
        templateUrl: './application/Shared/_home.html',
    })
    .otherwise({
        redirectTo: '/all'
    })
})