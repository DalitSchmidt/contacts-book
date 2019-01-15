application.directive('googleplace', () => {
    return {
        require: 'ngModel',
        link: (scope, element, attrs, model) => {
            let options = {
                types: [],
                componentRestrictions: {
                    country: "US"
                }
            }

            scope.gPlace = new google.maps.places.Autocomplete(element[0], options)

            google.maps.event.addListener(scope.gPlace, 'place_changed', (place) => {
                scope.$apply(() => {
                    model.$setViewValue( element.val() )
                })
            })
        }
    }
})