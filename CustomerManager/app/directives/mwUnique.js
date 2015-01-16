(function() {
    'use strict';

    angular
        .module('app')
        .directive('mwUnique', mwUnique);

    mwUnique.$inject = ['$q', '$parse', 'dataService'];
    
    function mwUnique ($q, $parse, dataService) {
        // Usage:
        //     <mwUnique></mwUnique>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
    };
        return directive;

        function link(scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.unique = function (modelValue, viewValue) {
                var deferred = $q.defer(),
                    currentValue = modelValue || viewValue,
                    key = attrs.mwUniqueKey,
                    property = attrs.mwUniqueProperty;


                //First time the asyncValidators function is loaded the
                //key won't be set  so ensure that we have 
                //key and propertyName before checking with the server 
                if (key && property) {
                    dataService.checkUniqueValue(key, property, currentValue)
                    .then(function (unique) {
                        if (unique) {
                            deferred.resolve(); //It's unique
                        }
                        else {
                            deferred.reject(); //Add unique to $errors
                        }
                    });
                }
                else {
                    deferred.resolve();
                }

                return deferred.promise;
            };
        }
    }

})();   