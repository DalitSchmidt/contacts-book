let underscore = angular.module('Underscore', []).factory('_', () => {
    return window._;
});

/**
 * 'jQueryScrollbar' and 'googlechart' are ready-made modules which I added to the application
 * 'Underscore' is the module name for the real underscore ('_') library, I loaded it as a module which I can then inject
 * it like any other dependency
 * @type {angular.Module}
 */
let application = angular.module('ContactBook', ['ngRoute', 'jQueryScrollbar', 'Underscore', 'googlechart'])