(function () {
    'use strict';

    angular
        .module('app')
        .controller('customersController', customersController);

    customersController.$inject = ['$filter', '$location', 'dataService'];

    function customersController($filter, $location, dataService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'customersController';
        vm.customers = [];
        vm.filteredCustomers = [];
        vm.filteredCount = 0;
        vm.orderBy = 'lastname';
        vm.reverse = false;
        vm.searchText = null;

        //paging
        vm.totalRecords = 0;
        vm.pageSize = 10;
        vm.currentPage = 1;

        activate();

        vm.DisplayModeEnum = {
            Card: 0,
            List: 1
        };

        vm.changeDisplayMode = function (displayMode) {
            switch (displayMode) {
                case vm.DisplayModeEnum.Card:
                    vm.listDisplayModeEnabled = false;
                    break;
                case vm.DisplayModeEnum.List:
                    vm.listDisplayModeEnabled = true;
                    break;
            }
        };

        vm.pageChanged = function (page) {
            vm.currentPage = page;
            getCustomersSummary();
        };

        vm.searchTextChanged = function () {
            filterCustomers(vm.searchText);
        };

        function activate() {
            getCustomersSummary();
        }

        function getCustomersSummary() {
            dataService.apiGet('api/dataservice/CustomersSummary', null,
            function (result) {
                vm.totalRecords = result.data.length;
                vm.customers = result.data;
                filterCustomers(''); //Trigger initial filter

            });
        }

        function filterCustomers(filterText) {
            vm.filteredCustomers = $filter("nameCityStateFilter")(vm.customers, filterText);
            vm.filteredCount = vm.filteredCustomers.length;
        }


    }
})();
