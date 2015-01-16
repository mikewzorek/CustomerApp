(function() {
    'use strict';

    angular
        .module('app')
        .directive('showErrors', showErrors);

    showErrors.$inject = ['$window'];
    
    function showErrors ($window) {
        // Usage:
        //     <showErrors></showErrors>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EA',
            require: '^form'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();