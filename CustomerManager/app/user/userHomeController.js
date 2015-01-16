(function () {
    'use strict';

    angular
        .module('app')
        .controller('userHomeController', userHomeController);

    userHomeController.$inject = ['$location', 'authService'];

    function userHomeController($location, authService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'userHomeController';

        vm.authentication = authService.authentication;

        activate();

        function activate() { }
    }
})();
