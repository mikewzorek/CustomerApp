(function () {
    'use strict';

    angular.module('app', [
        'app.core',
        //'app.data',
        //'app.components',

        /*Feature area*/
        'app.user',
        //'app.customers',
        //'app.orders',
        //'app.wip'
    ]);

    angular.module('app').run(['$state', '$stateParams',
        function ($state, $stateParams) {
            //this solves page refresh and getting back to state
        }]);
})();