
    'use strict';
    var _templateBase = './sections';
    angular.module('app', [
        'ngRoute',
        'ngMaterial',
        'ngAnimate',
        'ngMaterialDatePicker'
    ])
    .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/dashboard', {
                templateUrl: _templateBase + '/protocol.html' ,
                controller: 'protocolController',
                controllerAs: '_ctrl'
            });
            $routeProvider.when('/settings', {
                templateUrl: _templateBase + '/account.html' ,
                controller: 'unlockController',
                controllerAs: '_ctrl'
            });
            $routeProvider.when('/', {
                templateUrl: _templateBase + '/unlock.html' ,
                controller: 'unlockController',
                controllerAs: '_ctrl'

            });
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    ]);
