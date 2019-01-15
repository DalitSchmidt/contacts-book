application.directive('contact', [() => {
    return {
        restrict: 'E',
        replace: true,
        template: '<a ng-href="#/info/{{ contact.id }}"><span class="glyphicon"></span> <span ng-bind="contact.firstname"></span> <span ng-bind="contact.lastname"></span></a>',
    }
}])