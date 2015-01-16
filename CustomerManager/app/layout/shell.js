(function () {
    'use strict';

    angular
        .module('app')
        .controller('shell', shell);

    shell.$inject = ['$location', 'authService']; 

    function shell($location, authService) {
        /* jshint validthis:true */
        var vm = this;
        vm.authentication = authService.authentication;
        vm.title = 'shell';

        vm.logOut = function () {
            authService.logOut();
            $location.path('/login');
        }
        

        activate();

        function activate() { }
    }
})();
