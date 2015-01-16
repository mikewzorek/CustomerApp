(function () {
    'use strict';

    var core = angular.module('app.core');

    core.constant('routes', getRoutes());

    core.config(['$stateProvider', '$urlRouterProvider', 'routes',
        routeConfiguration]);

    function routeConfiguration($stateProvider, $urlRouterProvider, routes) {
        routes.forEach(function (r) {
            $stateProvider.state(r.state, r);
        });

        $urlRouterProvider.otherwise('/');
    }

    function getRoutes() {
        return [
            {
                url: '/register',
                templateUrl: 'app/user/register.html',
                state: 'register',
                controller: 'registerController as vm'
            },
            {
                url: '/login',
                templateUrl: 'app/user/login.html',
                state: 'login',
                controller: 'loginController as vm'
            },
            {
                url: '/customers',
                templateUrl: 'app/customers/customers.html',
                state: 'customers',
                controller: 'customersController as vm',
            },
            {
                url: '/customers/:customerId',
                templateUrl: 'app/customers/customerEdit.html',
                state: 'customerEdit',
                controller: 'customerEditController as vm'
            },
            {
                url: '/orders',
                templateUrl: 'app/orders/orders.html',
                state: 'orders'
                //controller: 'loginController as vm'
            },
            {
                url: '/home',
                templateUrl: 'app/user/userHome.html',
                state: 'userHome',
                controller: 'userHomeController as vm'
            }

        ];
    }


})();