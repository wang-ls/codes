(function () {
    'use strict';
    angular.module('app')
        .controller('unlockController', ['unlockService', '$q', '$timeout','$location', UnlockController]);

//  This controller is use to manage tasks related to users and authentification
    function UnlockController(unlockService, $q, $timeout, $location) {
        var self = this;
        self.selectedIndex = 0;
        self.user = null;
        self.login = login;
        self.users  = [];
        self.year = new Date().getFullYear();
        self.changePassword = password;
        function login() {
            // createusers();
            unlockService.getUserById(self.password).then(function (user) {
                 if (user.length > 0) {

                   self.user = user[0];
                   if (self.user !== null && self.user.password === self.password) {
                       $location.path('/dashboard');
                   } else {
                    //  User entered wrong password
                    demo.showSwal('wrong-password');

                   }
                 }else{
                     //  User entered wrong password or empty password
                   demo.showSwal('wrong-password');
                 }
            });



        };

        function successFunction() {
            demo.showSwal('success-message');
        }
        function errorFunction() {
            demo.showSwal('wrong-password');
        }
        function createusers () {
            unlockService.insertUser().then(function (users ) {
                self.users  = [].concat(users );
            });
        }
        function password() {
          // Get default ser in system and check password
          unlockService.getUserById(self.password).then(function (user) {
               if (user.length > 0) {
                 self.user = user[0];
                 if (self.user !== null && self.user.password === self.password) {
                    unlockService.changePassword(self.firstname, self.newpassword, self.user).then(function (affectedRows) {

                    });
                    //  successFunction();
                     demo.showNotification('top','left','You changed your password !');
                     $location.path('/dashboard');
                 } else {
                  errorFunction();
                 }
               }else{
                 errorFunction();
               }
          });
        };
    }
})();
