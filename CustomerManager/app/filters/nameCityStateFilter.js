﻿(function () {
    'use strict';

    angular
        .module('app')
        .filter('nameCityStateFilter', nameCityStateFilter);

    function nameCityStateFilter() {
        /* jshint validthis:true */
        return function (customers, filterValue) {
            if (!filterValue) return customers;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < customers.length; i++) {
                var cust = customers[i];
                if (cust.firstName.toLowerCase().indexOf(filterValue) > -1 ||
                    cust.lastName.toLowerCase().indexOf(filterValue) > -1 ||
                    cust.city.toLowerCase().indexOf(filterValue) > -1 ||
                    cust.state.name.toLowerCase().indexOf(filterValue) > -1) {

                    matches.push(cust);
                }
            }
            return matches;
        };
    }
})();
