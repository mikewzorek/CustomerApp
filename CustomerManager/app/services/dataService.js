(function () {
    'use strict';

    angular
        .module('app')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$q', 'appSettings'];

    function dataService($http, $q, appSettings) {
        var self = this;

        self.modelIsValid = true;
        self.modelErrors = [];
        self.isLoading = false;

        var service = {
            apiGet: apiGet,
            apiGetNew: apiGetNew,
            apiPost: apiPost,
            apiPut: apiPut,
            checkUniqueValue: checkUniqueValue
        };


        return service;

        function apiGetNew() {
            return $q.when({ id: 0 });
        }

        function apiGet(uri, data, success, failure, always) {
            self.isLoading = true;
            self.modelIsValid = true;
            $http.get(appSettings.apiServiceBaseUri + uri, data)
                .then(function(result) {
                    success(result);
                    if (always != null)
                        always();
                    self.isLoading = false;
                }, function(result) {
                    if (failure == null) {
                        if (result.status != 400)
                            self.modelErrors = [result.status + ':' + result.statusText + ' - ' + result.data.Message];
                        else
                            self.modelErrors = [result.data.Message];
                        self.modelIsValid = false;
                    } else
                        failure(result);
                    if (always != null)
                        always();
                    self.isLoading = false;
                });
        };

        function apiPost(uri, data, success, failure, always) {
            self.isLoading = true;
            self.modelIsValid = true;
            $http.post(appSettings.apiServiceBaseUri + uri, data)
                .then(function (result) {
                    success(result);
                    if (always != null)
                        always();
                    self.isLoading = false;
                }, function (result) {
                    if (failure == null) {
                        if (result.status != 400)
                            self.modelErrors = [result.status + ':' + result.statusText + ' - ' + result.data.Message];
                        else
                            self.modelErrors = [result.data.Message];
                        self.modelIsValid = false;
                    }
                    else
                        failure(result);
                    if (always != null)
                        always();
                    self.isLoading = false;
                });
        };

        function apiPut(uri, data, success, failure, always) {
            self.isLoading = true;
            self.modelIsValid = true;
            $http.put(appSettings.apiServiceBaseUri + uri, data)
                .then(function (result) {
                    success(result);
                    if (always != null)
                        always();
                    self.isLoading = false;
                }, function (result) {
                    if (failure == null) {
                        if (result.status != 400)
                            self.modelErrors = [result.status + ':' + result.statusText + ' - ' + result.data.Message];
                        else
                            self.modelErrors = [result.data.Message];
                        self.modelIsValid = false;
                    }
                    else
                        failure(result);
                    if (always != null)
                        always();
                    self.isLoading = false;
                });
        };

        function getPagedResource(baseResource, pageIndex, pageSize) {
            var resource = baseResource;
            resource += (arguments.length == 3) ? buildPagingUri(pageIndex, pageSize) : '';
            return $http.get(appSettings.apiServiceBaseUri + resource).then(function (response) {
                var custs = response.data;
                extendCustomers(custs);
                return {
                    totalRecords: parseInt(response.headers('X-InlineCount')),
                    results: custs
                };
            });
        }

        function checkUniqueValue(id, property, value) {
            if (!id) id = 0;
            return $http.get(appSettings.apiServiceBaseUri + 'api/dataservice/checkUnique/' + id + '?property=' + property + '&value=' + escape(value)).then(
                function (results) {
                    return results.data.status;
                });
        };

        function buildPagingUri(pageIndex, pageSize) {
            var uri = '?$top=' + pageSize + '&$skip=' + (pageIndex * pageSize);
            return uri;
        }

        function extendCustomers(customers) {
            var custsLen = customers.length;
            //Iterate through customers
            for (var i = 0; i < custsLen; i++) {
                var cust = customers[i];
                if (!cust.orders) continue;

                var ordersLen = cust.orders.length;
                for (var j = 0; j < ordersLen; j++) {
                    var order = cust.orders[j];
                    order.orderTotal = order.quantity * order.price;
                }
                cust.ordersTotal = ordersTotal(cust);
            }
        }
    }
})();