(function () {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize', 'ngMessages',

        /*
         * reusable cross app code modules
         */
        //'blocks.exception', 'blocks.logger', 'blocks.router',

        // 3rd Party Modules
        'ui.router',            // ui-router for sub nav, state driven routing
        'ui.bootstrap',         // ui-bootstrap (ex: carousel, pagination, dialog)
        'breeze.angular',       // tells breeze to use $q instead of Q.js
        'LocalStorageModule'    // angular wrapper for local storage
    ]);

})();