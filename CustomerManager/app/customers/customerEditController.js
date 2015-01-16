(function () {
    'use strict';

    angular
        .module('app')
        .controller('customerEditController', customerEditController);

    customerEditController.$inject = ['$location', '$stateParams', '$timeout', 'dataService'];

    function customerEditController($location, $stateParams, $timeout, dataService) {
        /* jshint validthis:true */
        var vm = this,
            customerId = ($stateParams.customerId) ? parseInt($stateParams.customerId) : 0,
            timer,
            onRouteChangeoff;
        vm.customer = {};
        vm.states = [];
        vm.title = customerId > 0 ? 'Edit' : 'Add';
        vm.buttonText = customerId > 0 ? 'Update' : 'Add';
        vm.errorMessage = '';

        activate();

        vm.saveCustomer = function (isValid) {
            if (isValid) {
                if (!vm.customer.id) {
                    dataService.apiPost('api/dataservice/PostCustomer', vm.customer, processSuccess, processError);
                } else {
                    dataService.apiPut('api/dataservice/PutCustomer', vm.customer, processSuccess, processError);
                }
            }
        };

        vm.deleteCustomer = function () {
            var custName = vm.customer.firstName + ' ' + vm.customer.lastName;
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Customer',
                headerText: 'Delete ' + custName + '?',
                bodyText: 'Are you sure you want to delete this customer?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                if (result === 'ok') {
                    dataService.deleteCustomer(vm.customer.id).then(function () {
                        onRouteChangeOff(); //Stop listening for location changes
                        $location.path('/customers');
                    }, processError);
                }
            });
        };

        function activate() {
            getStates(function () {
                if (customerId > 0) {
                    dataService.apiGet('api/dataservice/CustomerById/' + customerId, null,
                        function (result) {
                            vm.customer = result.data;
                            console.log(vm.customer);
                        });
                } else {
                    dataService.apiGetNew().then(function (data) {
                        vm.customer = data;
                    });
                }
            });
        }

        function getStates(callback) {
            return dataService.apiGet('api/dataservice/states', null, function (result) {
                vm.states = result.data;
                callback();
            });
        };

        function processSuccess() {
            vm.updateStatus = true;
            vm.title = 'Edit';
            vm.buttonText = 'Update';
            startTimer();
        }

        function processError(error) {
            vm.errorMessage = error.message;
            startTimer();
        }

        function startTimer() {
            timer = $timeout(function () {
                $timeout.cancel(timer);
                vm.errorMessage = '';
                vm.updateStatus = false;
            }, 3000);
        }
    };
    
})();
