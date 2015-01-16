(function () {
    'use strict';

    angular
        .module('app')
        .factory('tokensManagerService', tokensManagerService);

    tokensManagerService.$inject = ['$http', 'appSettings'];

    function tokensManagerService($http, appSettings) {
        var serviceBase = appSettings.apiServiceBaseUri;

        var tokenManagerServiceFactory = {};

        var _getRefreshTokens = function() {

            return $http.get(serviceBase + 'api/refreshtokens').then(function(results) {
                return results;
            });
        };

        var _deleteRefreshTokens = function(tokenid) {

            return $http.delete(serviceBase + 'api/refreshtokens/?tokenid=' + tokenid).then(function(results) {
                return results;
            });
        };

        tokenManagerServiceFactory.deleteRefreshTokens = _deleteRefreshTokens;
        tokenManagerServiceFactory.getRefreshTokens = _getRefreshTokens;

        return tokenManagerServiceFactory;
    }
})();