(function () {
    'use strict';

    var core = angular.module('app.core');

    //core.config(toastrConfig);


        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';


    var config = {
        //appErrorPrefix: '[CC Error] ', //Configure the exceptionHandler decorator
        //docTitle: 'CC: ',
        //events: events,
        //imageSettings: imageSettings,
        //keyCodes: keyCodes,
        //remoteServiceName: remoteServiceName,
        //version: '2.0.0'
    };

    core.value('config', config);

    core.constant('appSettings', {
        apiServiceBaseUri: 'http://localhost:52095/',
        clientId: 'ngAuthApp'
    });

    core.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });

    core.run([
        'authService', function (authService) {
            authService.fillAuthData();
        }
    ]);
})();