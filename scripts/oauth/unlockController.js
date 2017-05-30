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
        self.year = new Date().getFullYear();
        self.changePassword = password;
        function login() {
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
        function password() {
          // Get default ser in system and check password
          unlockService.getUserById(self.password).then(function (user) {
               if (user.length > 0) {
                 self.user = user[0];
                 if (self.user !== null && self.user.password === self.password) {
                    unlockService.changePassword(self.firstname, self.newpassword, self.user).then(function (affectedRows) {
                        demo.showSwal('success-message');

                    });
                    //  logout the user
                     $location.path('/dashboard');
                 } else {
                  demo.showSwal('wrong-password');
                 }
               }else{
                 demo.showSwal('wrong-password');
               }
          });
        };
    }
})();
