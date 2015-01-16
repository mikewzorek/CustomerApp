(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['$location', 'authService'];

    function loginController($location, authService) {
        /* jshint validthis:true */

        var vm = this,
            path = '/home';

        vm.loginData = {
            userName: "",
            password: ""
        };

        vm.message = "";

        vm.login = function (isValid) {

            if (isValid) {
                authService.login(vm.loginData).then(function(response) {

                        $location.path(path);

                    },
                    function(err) {
                        vm.message = err.error_description;
                    });
            }
        };
    }
})();
