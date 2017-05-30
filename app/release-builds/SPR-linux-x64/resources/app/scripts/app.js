
    'use strict';
    var _templateBase = './scripts';
    angular.module('app', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate',
        'ngMaterialDatePicker'
    ])
    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/dashboard', {
                templateUrl: _templateBase + '/protocol/protocol.html' ,
                controller: 'protocolController',
                controllerAs: '_ctrl'
            });
            $routeProvider.when('/settings', {
                templateUrl: _templateBase + '/oauth/account.html' ,
                controller: 'unlockController',
                controllerAs: '_ctrl'
            });
            $routeProvider.when('/', {
                templateUrl: _templateBase + '/oauth/unlock.html' ,
                controller: 'unlockController',
                controllerAs: '_ctrl'

            });
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    ]);
