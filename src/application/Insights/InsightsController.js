/**
 * In this Controller is making use of 'googlechart' module and template (_insights.html) making use
 * of the directives in the module 'google-chart', and 'chart' attributes
 * You can see the module here: https://angular-google-chart.github.io/angular-google-chart
 *
 * I've created a route especially for the insights (see 'routes/contact.js') to collect interesting data:
 *  - The main domains for the emails
 *  - The main states of the contacts
 */
application.controller('InsightsController', ['$scope', '$routeParams', 'ContactFactory', ( $scope, $routeParams, ContactFactory ) => {
    $scope.insights = {
        domains: [],
        states: []
    }

    $scope.charts = {
        states: {
            type: "GeoChart",
            data: [['State', 'Contacts'] ],
            options: {
                region: 'US',
                displayMode: 'regions',
                resolution: 'provinces',
                width: 500,
                height: 375
            },

            formatters: {
                number : [{
                    columnNum: 1
                }]
            }
        },

        domains: {
            type: "PieChart",
            data: [['Domain', 'Contacts'] ],
            options: {
                width: 500,
                height: 375
            }
        }
    }

    ContactFactory.insights().then(insights => {
        let domains = $scope.insights.domains = insights.data.domains
        let states = $scope.insights.states = insights.data.states

        states.forEach(val => {
            $scope.charts.states.data.push([val.state, val.count])
        })

        domains.forEach(val => {
            $scope.charts.domains.data.push([val.domain, val.count])
        })
    })
}])